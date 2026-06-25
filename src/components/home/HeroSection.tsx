import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Video, Package } from 'lucide-react';

const badges = [
  { Icon: ShieldCheck, text: 'Güvenli Ödeme' },
  { Icon: Video, text: 'Kesim Videosu' },
  { Icon: Package, text: 'Sipariş Takibi' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-green-light overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-site relative z-10 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/30">
              ✦ Güvenilir Kurban Platformu
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Güvenilir Kurban Satışı ve{' '}
              <span className="text-brand-gold-light">Vekalet Hizmeti</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Kurbanınızı kolayca seçin, vekaletinizi verin, kesim ve teslimat sürecini güvenle takip edin.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                to="/kurbanlıklar"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-brand-green font-bold rounded-2xl hover:bg-brand-cream transition-all shadow-lg hover:shadow-xl active:scale-95 text-base"
              >
                Kurbanını Hemen Seç
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/nasil-calisir"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm text-base"
              >
                Nasıl Çalışır?
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm"
                >
                  <Icon size={15} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,60 C240,0 480,60 720,30 C960,0 1200,60 1440,20 L1440,60 Z" fill="#FAFAF9" />
        </svg>
      </div>
    </section>
  );
}
