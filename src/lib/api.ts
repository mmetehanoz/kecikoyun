import type { Product, Site, OrderFormData, CartItem } from '@/types';

/**
 * KeçiKoyun backend API istemcisi.
 *
 * VITE_API_URL backend kök adresidir (ör. http://localhost:8004).
 * Tüm istekler oturum çerezi (credentials: include) ve kalıcı bir
 * X-Session-Key başlığı ile gönderilir; böylece guest sepet/sipariş akışı
 * aynı oturum üzerinden çalışır.
 */

// Boş değer = aynı origin (göreli istekler). Prod'da frontend ve API aynı
// alan adında (nginx proxy) servis edildiği için bu beklenen durumdur.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const SESSION_KEY_STORAGE = 'kecikoyun_session_key';

function getSessionKey(): string {
  try {
    let key = localStorage.getItem(SESSION_KEY_STORAGE);
    if (!key) {
      key = `kc_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem(SESSION_KEY_STORAGE, key);
    }
    return key;
  } catch {
    return '';
  }
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return '';
  const query = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null && params[k] !== '')
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(params[k]))}`)
    .join('&');
  return query ? `?${query}` : '';
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_BASE) throw new ApiError('API adresi yapılandırılmamış (VITE_API_URL).', 0, null);

  const { method = 'GET', body, params, headers = {} } = options;
  const url = `${API_BASE}${path}${buildQuery(params)}`;
  // eslint-disable-next-line no-console
  console.info('[api]', method, url);

  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Session-Key': getSessionKey(),
    ...headers,
  };
  const token = localStorage.getItem('access_token');
  if (token) baseHeaders['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    credentials: 'include',
    cache: 'no-store',
    headers: baseHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const message =
      data?.error || data?.detail || data?.message || `İstek başarısız (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export const api = {
  storefront: {
    catalog: () => request<{ products: Product[] }>('/kecikoyun/storefront/catalog/'),
    site: () => request<{ site: Site }>('/kecikoyun/storefront/site/'),
  },

  contact: {
    send: (data: { name: string; email: string; phone: string; subject: string; message: string }) =>
      request<{ success: boolean; message?: string }>('/icerik/iletisim/', {
        method: 'POST',
        body: data,
      }),
  },

  orders: {
    /** Bağış başvurusu oluşturur (sepete eklenebilir taslak). */
    createSubmission: (data: {
      donation: string;
      amount: number;
      currency?: number;
      form_data?: Record<string, unknown>;
      donor_name?: string;
      donor_email?: string;
      donor_phone?: string;
      selected_country?: string;
      donation_intent?: string;
      notes?: string;
    }) => request<{ id: string }>('/bagislar/basvurular/', { method: 'POST', body: data }),

    /** Bağış başvurusunu günceller (ör. sipariş referansı eklemek için). */
    updateSubmission: (
      submissionId: string,
      data: { payment_id?: string; payment_source?: string; form_data?: Record<string, unknown> },
    ) =>
      request<{ message: string }>(`/bagislar/basvurular/${submissionId}/guncelle/`, {
        method: 'PATCH',
        body: data,
      }),

    /** Oluşturulan başvuruyu (guest) sepete ekler. */
    addToCart: (donationSubmissionId: string) =>
      request<{ id: string }>('/sepet/ekle/', {
        method: 'POST',
        body: { donation_submission_id: donationSubmissionId },
      }),

    /** Sepet öğesi miktarını günceller. */
    updateQuantity: (itemId: string, quantity: number) =>
      request<unknown>('/sepet/miktar-guncelle/', {
        method: 'POST',
        body: { item_id: itemId, quantity },
      }),

    /** Havale/EFT siparişi oluşturur. */
    createBankTransferOrder: (data: { contactInfo: OrderFormData; items?: CartItem[] }) =>
      request<{ id: string; order_number: string }>('/sepet/odeme/havale/', {
        method: 'POST',
        body: {
          contact_info: {
            first_name: data.contactInfo.firstName,
            last_name: data.contactInfo.lastName,
            email: data.contactInfo.email,
            phone: data.contactInfo.phone,
            address: data.contactInfo.address,
            city: data.contactInfo.city,
            postal_code: data.contactInfo.taxNumber || '00000',
            notes: data.contactInfo.billingAddress || '',
            membership_agreement_consent: true,
          },
          payment_method: 'bank_transfer',
          payment_source: 'web_site',
        },
      }),

    track: (orderNumber: string) =>
      request<any>(`/sepet/siparisler/takip/${encodeURIComponent(orderNumber)}/`),
  },

  clearServerCart: () => request<unknown>('/sepet/temizle/', { method: 'POST' }),
};
