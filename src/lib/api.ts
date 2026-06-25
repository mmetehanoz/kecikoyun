import type { Order, OrderFormData, CartItem } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  orders: {
    create: (data: { form: OrderFormData; items: CartItem[] }) =>
      request<Order>('/orders/', { method: 'POST', body: JSON.stringify(data) }),

    track: (code: string) =>
      request<Order>(`/orders/${code}/`),
  },

  contact: {
    send: (data: { name: string; email: string; phone: string; message: string }) =>
      request<{ success: boolean }>('/contact/', { method: 'POST', body: JSON.stringify(data) }),
  },
};
