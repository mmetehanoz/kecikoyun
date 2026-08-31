import { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Building2, ArrowLeft, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, generateOrderId, getCountryPrice } from '@/lib/utils';
import type { OrderFormData } from '@/types';
import TurnstileWidget from '../components/security/TurnstileWidget';

const inputClass =
  'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition placeholder-gray-400';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const [form, setForm] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    billingName: '',
    paymentMethod: 'credit-card',
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
    if (!form.acceptTerms || !form.acceptKvkk) return;

    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError('Lütfen güvenlik doğrulamasını tamamlayın.');
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = generateOrderId();
    clearCart();
    navigate(`/siparis-takibi?kod=${orderId}&success=1`);
  };

  if (items.length === 0) {
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
                  <label className={labelClass}>Adres</label>
                  <textarea
                    className={inputClass + ' resize-none'}
                    rows={2}
                    value={form.address}
                    onChange={(e) => set('address', e.target.value)}
                    placeholder="Açık adresiniz (teslim için gerekebilir)"
                  />
                </div>
                <div className="mt-4">
                  <label className={labelClass}>Şehir</label>
                  <input
                    type="text"
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
                    { value: 'credit-card', label: 'Kredi Kartı', Icon: CreditCard },
                    { value: 'bank-transfer', label: 'Banka Havalesi', Icon: Building2 },
                    { value: 'eft', label: 'EFT', Icon: Building2 },
                  ].map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => set('paymentMethod', value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 font-medium text-sm transition-all ${
                        form.paymentMethod === value
                          ? 'border-brand-green bg-brand-green/5 text-brand-green'
                          : 'border-gray-200 text-gray-600 hover:border-brand-green/50'
                      }`}
                    >
                      <Icon size={20} />
                      {label}
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
                  <div className="bg-brand-cream rounded-2xl p-4 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900 mb-2">Banka Bilgileri</p>
                    <p>Banka: <strong>Ziraat Bankası</strong></p>
                    <p>IBAN: <strong>TR00 0000 0000 0000 0000 0000 00</strong></p>
                    <p>Hesap Adı: <strong>Keçikoyun Ticaret Ltd. Şti.</strong></p>
                    <p className="mt-2 text-gray-500 text-xs">
                      Havale açıklamasına sipariş kodunuzu yazmayı unutmayın.
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
