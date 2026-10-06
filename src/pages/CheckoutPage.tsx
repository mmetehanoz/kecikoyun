import { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Building2, ArrowLeft, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { api } from '@/lib/api';
import { useSite } from '@/hooks/useStorefront';
import { formatPrice, getCountryPrice } from '@/lib/utils';
import CopyValue from '@/components/common/CopyValue';
import type { OrderFormData } from '@/types';
import TurnstileWidget from '../components/security/TurnstileWidget';

const inputClass =
  'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition placeholder-gray-400';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { site } = useSite();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [completed, setCompleted] = useState(false);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const [form, setForm] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    billingName: '',
    paymentMethod: 'bank-transfer',
    acceptTerms: false,
    acceptKvkk: false,
  });

  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError('');
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken('');
    setTurnstileError('Güvenlik doğrulamasının süresi doldu. Lütfen tekrar deneyin.');
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('');
    setTurnstileError('Güvenlik doğrulaması tamamlanamadı.');
  }, []);

  const set = (key: keyof OrderFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!form.acceptTerms || !form.acceptKvkk) {
      setSubmitError('Lütfen sözleşmeleri onaylayın.');
      return;
    }

    if (form.paymentMethod === 'credit-card') {
      setSubmitError('Kredi kartı ile ödeme yakında aktif olacak. Lütfen Banka Havalesi/EFT seçin.');
      return;
    }

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      setSubmitError('Lütfen zorunlu (*) alanları doldurun.');
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!phoneDigits.startsWith('0') || phoneDigits.length !== 11) {
      setSubmitError('Telefon numarası 0 (5XX) XXX XX XX formatında olmalıdır.');
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError('Lütfen güvenlik doğrulamasını tamamlayın.');
      return;
    }

    if (items.some((i) => !i.product.donationId)) {
      setSubmitError('Ürün bilgisi güncel değil. Lütfen sayfayı yenileyip tekrar deneyin.');
      return;
    }

    setSubmitting(true);
    try {
      // Önceki denemeden kalan guest sepeti temizle (best-effort).
      try {
        await api.clearServerCart();
      } catch {
        /* oturum yoksa yok say */
      }

      const createdSubmissionIds: string[] = [];

      for (const item of items) {
        const unitPrice = getCountryPrice(item.product, item.country);
        const formData: Record<string, unknown> = {
          proxy_name: item.proxy.name,
          proxy_phone: item.proxy.phone,
          proxy_purpose: item.proxy.purpose,
          delivery: item.delivery,
          wants_video: item.wantsVideo,
          country: item.country,
          niyet: item.niyet,
          donor_name: `${form.firstName} ${form.lastName}`.trim(),
          donor_email: form.email,
          donor_phone: form.phone,
          donor_address: form.address,
          donor_city: form.city,
          donor_zip_code: form.taxNumber || '',
        };

        const submission = await api.orders.createSubmission({
          donation: item.product.donationId as string,
          amount: unitPrice,
          currency: item.product.currencyId,
          selected_country: item.country,
          donation_intent: item.niyet,
          donor_name: `${form.firstName} ${form.lastName}`.trim(),
          donor_email: form.email,
          donor_phone: form.phone,
          form_data: formData,
        });
        createdSubmissionIds.push(submission.id);

        const cartItem = await api.orders.addToCart(submission.id);
        if (item.quantity > 1 && cartItem?.id) {
          await api.orders.updateQuantity(cartItem.id, item.quantity);
        }
      }

      const order = await api.orders.createBankTransferOrder({ contactInfo: form });

      // Sipariş numarasını her bağış başvurusuna referans olarak yaz — admin
      // panelindeki "Eksik Bağışlar"da dekont ile eşleştirilebilsin.
      // Not: form_data burada GÖNDERİLMEZ; aksi halde sunucunun eklediği
      // donation_intent / donor alanları ezilir.
      await Promise.all(
        createdSubmissionIds.map((id) =>
          api.orders
            .updateSubmission(id, {
              payment_id: order.order_number,
              payment_source: 'bank_transfer',
            })
            .catch(() => undefined)
        )
      );

      setCompleted(true);
      clearCart();
      navigate(`/odeme/basarili?kod=${order.order_number}`, { replace: true });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Sipariş oluşturulamadı. Lütfen tekrar deneyin.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Sipariş başarıyla oluşturulduğunda sepet temizlenir; bu durumda başarı
  // sayfasına giden yönlendirmeyi engellememek için guard'ı atla.
  if (items.length === 0 && !completed) {
    return <Navigate to="/sepet" replace />;
  }

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-8">
      <div className="container-site">
        <div className="mb-8">
          <button
            onClick={() => navigate('/sepet')}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Sepete Dön
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Siparişi Tamamla</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: forms */}
            <div className="lg:col-span-2 space-y-5">
              {/* Kişisel bilgiler */}
              <Section title="Kişisel Bilgiler">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Ad <Required /></label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={form.firstName}
                      onChange={(e) => set('firstName', e.target.value)}
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Soyad <Required /></label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={form.lastName}
                      onChange={(e) => set('lastName', e.target.value)}
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelClass}>Telefon <Required /></label>
                    <input
                      type="tel"
                      required
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>E-posta <Required /></label>
                    <input
                      type="email"
                      required
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={labelClass}>Adres <Required /></label>
                  <textarea
                    required
                    className={inputClass + ' resize-none'}
                    rows={2}
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                    placeholder="Açık adresiniz"
                  />
                </div>
                <div className="mt-4">
                  <label className={labelClass}>Şehir <Required /></label>
                  <input
                    type="text"
                    required
                    className={inputClass}
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    placeholder="İstanbul"
                  />
                </div>
              </Section>

              {/* Fatura */}
              <Section title="Fatura Bilgileri">
                <div>
                  <label className={labelClass}>Fatura Ad Soyad / Unvan</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={form.billingName}
                    onChange={(e) => set('billingName', e.target.value)}
                    placeholder="Ad Soyad veya Şirket Unvanı"
                  />
                </div>
                <div className="mt-4">
                  <label className={labelClass}>Vergi No (Kurumsal için)</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={form.taxNumber ?? ''}
                    onChange={(e) => set('taxNumber', e.target.value)}
                    placeholder="Kurumsal fatura için"
                  />
                </div>
              </Section>

              {/* Ödeme */}
              <Section title="Ödeme Yöntemi">
                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { value: 'credit-card', label: 'Kredi Kartı', Icon: CreditCard, disabled: true },
                    { value: 'bank-transfer', label: 'Banka Havalesi', Icon: Building2, disabled: false },
                    { value: 'eft', label: 'EFT', Icon: Building2, disabled: false },
                  ].map(({ value, label, Icon, disabled }) => (
                    <button
                      key={value}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && set('paymentMethod', value)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 font-medium text-sm transition-all ${
                        disabled
                          ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                          : form.paymentMethod === value
                          ? 'border-brand-green bg-brand-green/5 text-brand-green'
                          : 'border-gray-200 text-gray-600 hover:border-brand-green/50'
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                      {disabled && (
                        <span className="absolute top-2 right-2 text-[10px] font-semibold bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                          Yakında
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {form.paymentMethod === 'credit-card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 bg-gray-50 p-4 rounded-2xl"
                  >
                    <div>
                      <label className={labelClass}>Kart Numarası</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Son Kullanma Tarihi</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="AA/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>CVV</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Kart Sahibi</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Ad Soyad"
                      />
                    </div>
                  </motion.div>
                )}

                {form.paymentMethod !== 'credit-card' && (
                  <div className="bg-brand-green/5 border-2 border-brand-green/20 rounded-2xl p-4">
                    <p className="font-bold text-gray-900 mb-2">Banka Bilgileri (Havale / EFT)</p>
                    <div className="rounded-xl bg-white border border-gray-100 px-3">
                      <CopyValue label="Banka" value={site.bank.name} />
                      <CopyValue label="IBAN" value={site.bank.iban} />
                      <CopyValue label="Hesap Adı" value={site.bank.accountHolder} />
                    </div>
                    <p className="mt-2 text-gray-600 text-xs">
                      Siparişi onayladıktan sonra size verilen <strong>sipariş kodunu</strong> havale
                      açıklamasına yazın ve dekontu WhatsApp üzerinden bize iletin.
                    </p>
                  </div>
                )}
              </Section>

              {/* Sözleşmeler */}
              <Section title="Onaylar">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={form.acceptTerms}
                    onChange={(e) => set('acceptTerms', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand-green"
                  />
                  <span className="text-sm text-gray-600">
                    <span className="text-brand-green font-medium cursor-pointer hover:underline">
                      Mesafeli Satış Sözleşmesi
                    </span>
                    'ni okudum ve kabul ediyorum. <Required />
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    required
                    checked={form.acceptKvkk}
                    onChange={(e) => set('acceptKvkk', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand-green"
                  />
                  <span className="text-sm text-gray-600">
                    <span className="text-brand-green font-medium cursor-pointer hover:underline">
                      KVKK Aydınlatma Metni
                    </span>
                    'ni okudum, kişisel verilerimin işlenmesine onay veriyorum. <Required />
                  </span>
                </label>
              </Section>
            </div>

            {/* Right: Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Sipariş Özeti</h2>

                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center text-lg flex-shrink-0">
                        🐑
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.niyet} · {item.country}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                        {formatPrice(getCountryPrice(item.product, item.country) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ara Toplam</span>
                    <span>{formatPrice(totalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Hizmet Bedeli</span>
                    <span className="text-brand-green font-medium">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t border-gray-100">
                    <span>Toplam</span>
                    <span className="text-brand-green">{formatPrice(totalPrice())}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <TurnstileWidget
                    siteKey={turnstileSiteKey}
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                    onError={handleTurnstileError}
                    error={turnstileError}
                  />
                </div>

                {submitError && (
                  <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting || !form.acceptTerms || !form.acceptKvkk}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      İşleniyor...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Siparişi Onayla
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2 mt-4 justify-center text-xs text-gray-400">
                  <ShieldCheck size={13} className="text-brand-green" />
                  SSL ile güvenli ödeme
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-card">
      <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
        <Check size={16} className="text-brand-green" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Required() {
  return <span className="text-red-500">*</span>;
}
