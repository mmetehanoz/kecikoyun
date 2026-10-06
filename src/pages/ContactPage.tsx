import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Check } from 'lucide-react';
import { api } from '@/lib/api';
import { useSite } from '@/hooks/useStorefront';

const inputClass =
  'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition placeholder-gray-400';

export default function ContactPage() {
  const { site } = useSite();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.contact.send({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject || 'Genel Bilgi',
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAF9]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container-site">
          <h1 className="section-title">İletişim</h1>
          <p className="section-subtitle max-w-lg">
            Sorularınız için bize ulaşın. En kısa sürede dönüş yaparız.
          </p>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bize Ulaşın</h2>
            <div className="space-y-5">
              {[
                { Icon: Phone, label: 'Telefon', value: site.phone, href: phoneHref, detail: 'Pzt–Cmt, 09:00–18:00' },
                { Icon: MessageSquare, label: 'WhatsApp', value: site.phone, href: `https://wa.me/${site.phone.replace(/[^\d]/g, '')}`, detail: '7/24 mesaj atabilirsiniz' },
                { Icon: Mail, label: 'E-posta', value: site.email, href: `mailto:${site.email}`, detail: '24 saat içinde yanıt' },
                { Icon: MapPin, label: 'Adres', value: site.address, href: undefined, detail: 'Randevu ile ziyaret' },
                { Icon: Clock, label: 'Çalışma Saatleri', value: 'Pzt–Cmt: 09:00–18:00', href: undefined, detail: 'Pazar: Kapalı' },
              ].map(({ Icon, label, value, href, detail }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-11 h-11 bg-brand-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-gray-900 hover:text-brand-green transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-gray-900">{value}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-10 shadow-card text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                  <Check size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Mesajınız İletildi!</h2>
                <p className="text-gray-500 text-sm">
                  En kısa sürede size dönüş yapacağız.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-7 shadow-card space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Mesaj Gönderin</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad</label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
                    <input
                      type="tel"
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta</label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Konu</label>
                  <select
                    className={inputClass}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="">Konu seçin</option>
                    <option>Sipariş Hakkında</option>
                    <option>Fiyat Bilgisi</option>
                    <option>Teknik Destek</option>
                    <option>Kurumsal Sipariş</option>
                    <option>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mesajınız</label>
                  <textarea
                    required
                    rows={5}
                    className={inputClass + ' resize-none'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Gönderiliyor...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={15} />
                      Gönder
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
