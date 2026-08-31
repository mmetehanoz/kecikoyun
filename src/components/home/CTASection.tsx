import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-brand-green to-brand-green-dark rounded-4xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Kurbanını Hemen Seç
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Güvenilir, şeffaf ve profesyonel kurban hizmeti için hemen başlayın.
              Siparişinizi dakikalar içinde tamamlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/kurbanlıklar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-green font-bold rounded-2xl hover:bg-brand-cream transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Kurbanlıklara Git
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+905340178867"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/30"
              >
                <Phone size={16} />
                Bizi Arayın
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
