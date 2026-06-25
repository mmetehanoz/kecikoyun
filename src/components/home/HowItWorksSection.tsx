import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: '🛒',
    title: 'Kurbanını Seç',
    description:
      'Küçükbaş, büyükbaş hisse, adak veya akika türlerinden size uygun olanı seçin. Lokasyon ve fiyat bilgilerini karşılaştırın.',
  },
  {
    number: '02',
    icon: '✍️',
    title: 'Vekalet Bilgilerini Gir',
    description:
      'Kurban sahibinin adını, niyet ve telefon bilgilerini girin. Kendi adınıza veya başkası adına vekalet verebilirsiniz.',
  },
  {
    number: '03',
    icon: '💳',
    title: 'Güvenli Ödeme Yap',
    description:
      'SSL korumalı altyapımız üzerinden kredi kartı, banka kartı veya EFT ile güvenle ödeme yapın.',
  },
  {
    number: '04',
    icon: '📹',
    title: 'Kesim Sürecini Takip Et',
    description:
      'Kesim videosu ve fotoğraflarını WhatsApp ile alın. Sipariş takip sayfanızdan sürecin her aşamasını izleyin.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-site">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Nasıl Çalışır?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              4 adımda kurban siparişinizi tamamlayın. Tüm süreç şeffaf ve güvenli.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-green/20 via-brand-green/40 to-brand-green/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
