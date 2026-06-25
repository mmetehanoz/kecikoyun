import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Video, Package, CreditCard } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: '🛒',
    title: 'Kurban Türünü Seç',
    description:
      'Küçükbaş, büyükbaş hisse, adak, akika, şükür veya sadaka kurbanı türlerinden biri ile başlayın. Yurt içi veya yurt dışı kesim tercihini belirleyin.',
    detail:
      'Her türün fiyatı, kesim tarihi, stok bilgisi ve video gönderim seçeneği kart üzerinde görünür. Birden fazla kurban türü için ayrı ayrı ekleyebilirsiniz.',
  },
  {
    number: '02',
    icon: '✍️',
    title: 'Vekalet Bilgilerini Gir',
    description:
      'Kurban sahibinin adı, soyadı ve telefon numarasını girin. Kendi adınıza veya başkası adına vekalet verebilirsiniz.',
    detail:
      'Dinen geçerli vekalet işlemi için kurban sahibinin niyet etmesi yeterlidir. Birden fazla kişi adına ayrı ayrı vekalet kaydedilebilir.',
  },
  {
    number: '03',
    icon: '💳',
    title: 'Güvenli Ödeme Yap',
    description:
      'Sipariş özetini onaylayın, mesafeli satış sözleşmesini okuyun ve güvenli ödeme yapın.',
    detail:
      'Kredi kartı, banka kartı veya EFT ile ödeme yapabilirsiniz. SSL sertifikalı 3D Secure altyapı kullanılır. Kart bilgileriniz sunucularımızda saklanmaz.',
  },
  {
    number: '04',
    icon: '📹',
    title: 'Kesim Sürecini Takip Et',
    description:
      'Kesim gerçekleştikten sonra video ve belgeler WhatsApp ile iletilir. Sipariş takip sayfanızdan anlık durum bilgisi alırsınız.',
    detail:
      'İhtiyaç sahiplerine ulaştırma tercih ettiyseniz teslimat fotoğrafları ve konum bilgisi de paylaşılır.',
  },
];

const guarantees = [
  { Icon: ShieldCheck, title: 'Dini Uygunluk Garantisi', desc: 'Tüm kesimler dini kurallara uygun, uzman kasaplar tarafından yapılır.' },
  { Icon: Video, title: 'Kesim Videosu', desc: 'Her kesim kayıt altına alınır ve talep üzerine WhatsApp ile gönderilir.' },
  { Icon: Package, title: 'Belge ve Teslimat', desc: 'Vekalet belgesi, kesim belgesi ve dağıtım belgeleri dijital olarak iletilir.' },
  { Icon: CreditCard, title: 'Güvenli Ödeme', desc: '3D Secure ve SSL korumalı ödeme altyapısı. Kart bilgisi saklanmaz.' },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-[#FAFAF9]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-green-dark to-brand-green py-16">
        <div className="container-site text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nasıl Çalışır?</h1>
          <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
            Keçikoyun üzerinden kurban siparişi vermek 4 adımdan ibarettir. Tüm süreç şeffaf ve belgelidir.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container-site py-16">
        <div className="space-y-8 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-7 shadow-card flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest">
                  Adım {step.number}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-1 mb-2">{step.title}</h2>
                <p className="text-gray-700 leading-relaxed mb-2">{step.description}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="bg-white py-16">
        <div className="container-site">
          <h2 className="section-title text-center mb-10">Hizmet Garantimiz</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-5"
              >
                <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <g.Icon size={22} className="text-brand-green" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{g.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-[#FAFAF9]">
        <div className="container-site text-center">
          <h2 className="section-title mb-4">Hemen Başlayın</h2>
          <p className="section-subtitle mb-8 max-w-md mx-auto">
            Kurban siparişinizi dakikalar içinde tamamlayın.
          </p>
          <Link to="/kurbanlıklar" className="btn-primary inline-flex">
            Kurbanlıkları İncele <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
