import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { testimonials } from '@/data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-brand-green-dark">
      <div className="container-site">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Müşteri Yorumları
            </h2>
            <p className="text-white/70 max-w-lg mx-auto">
              Binlerce müşterimiz güvenle kurban hizmeti aldı
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-brand-gold-light fill-brand-gold-light" />
                ))}
              </div>
              <span className="text-white font-bold text-lg">4.9</span>
              <span className="text-white/60 text-sm">/ 5 — 1.200+ değerlendirme</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="text-brand-gold-light fill-brand-gold-light" />
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-5">
                "{t.comment}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.city}</p>
                </div>
                {t.verified && (
                  <div className="flex items-center gap-1 text-brand-green-muted text-xs">
                    <CheckCircle size={12} />
                    <span>Doğrulanmış</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
