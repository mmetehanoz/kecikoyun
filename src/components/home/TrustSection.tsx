import { motion } from 'framer-motion';
import { ShieldCheck, Video, Package, CreditCard, Star, Users } from 'lucide-react';

const features = [
  {
    Icon: ShieldCheck,
    title: 'Vekaletle Kesim',
    description: 'Dini kurallara uygun, uzman kasaplar tarafından gerçekleştirilen vekalet kesimi.',
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    Icon: Video,
    title: 'Kesim Videosu',
    description: 'Kesim anı video kaydedilir ve WhatsApp ile iletilir. Şeffaf süreç garantisi.',
    color: 'bg-brand-gold/10 text-brand-gold-dark',
  },
  {
    Icon: Package,
    title: 'Sipariş Takibi',
    description: 'Siparişinizi anlık takip edin. Her aşamadan SMS ve bildirim alın.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    Icon: CreditCard,
    title: 'Güvenli Ödeme',
    description: 'SSL sertifikalı, 3D Secure destekli ödeme altyapısı. Kart bilginiz saklanmaz.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    Icon: Star,
    title: 'Profesyonel Organizasyon',
    description: 'Deneyimli ekibimiz tüm organizasyonu baştan sona yönetir.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    Icon: Users,
    title: 'İhtiyaç Sahiplerine Ulaştırma',
    description: 'Etlerin ihtiyaç sahibi ailelere ulaştırıldığının belgesi tarafınıza iletilir.',
    color: 'bg-rose-50 text-rose-600',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-brand-cream/50">
      <div className="container-site">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-green text-sm mb-3">Neden Keçikoyun?</span>
            <h2 className="section-title mt-3">Profesyonel Hizmet Güvencesi</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Kurbanınızın her aşamasını şeffaf ve güvenilir şekilde yönetiyoruz.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${feat.color}`}>
                <feat.Icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
