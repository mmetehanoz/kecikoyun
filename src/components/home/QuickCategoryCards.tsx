import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    emoji: '🐑',
    title: 'Küçükbaş Kurban',
    description: 'Koyun / keçi kurbanı. Tek kişilik.',
    href: '/kucukbas',
    color: 'from-brand-green/10 to-brand-green/5',
    border: 'border-brand-green/20 hover:border-brand-green/50',
  },
  {
    emoji: '🐂',
    title: 'Büyükbaş Hisse',
    description: '1/7 hisse. 7 kişiye kadar ortak.',
    href: '/buyukbas-hisse',
    color: 'from-brand-gold/10 to-brand-gold/5',
    border: 'border-brand-gold/20 hover:border-brand-gold/50',
  },
  {
    emoji: '🤲',
    title: 'Adak Kurbanı',
    description: 'Adak niyetiyle vekalet kesimi.',
    href: '/adak',
    color: 'from-amber-50 to-orange-50/50',
    border: 'border-amber-200/50 hover:border-amber-400/50',
  },
  {
    emoji: '👶',
    title: 'Akika Kurbanı',
    description: 'Yeni doğan için şükür ve bereket.',
    href: '/akika',
    color: 'from-blue-50 to-cyan-50/50',
    border: 'border-blue-200/50 hover:border-blue-400/50',
  },
  {
    emoji: '🙏',
    title: 'Şükür Kurbanı',
    description: 'Nimetlere şükür için kurban.',
    href: '/sukur',
    color: 'from-purple-50 to-violet-50/50',
    border: 'border-purple-200/50 hover:border-purple-400/50',
  },
  {
    emoji: '❤️',
    title: 'Sadaka Kurbanı',
    description: 'Tamamen ihtiyaç sahiplerine.',
    href: '/sadaka',
    color: 'from-rose-50 to-pink-50/50',
    border: 'border-rose-200/50 hover:border-rose-400/50',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QuickCategoryCards() {
  return (
    <section className="py-16 bg-[#FAFAF9]">
      <div className="container-site">
        <div className="text-center mb-10">
          <h2 className="section-title">Kurban Türleri</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            İhtiyacınıza göre kurban türünü seçin, vekalet bilgilerinizi girin.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.href} variants={item}>
              <Link
                to={cat.href}
                className={`group flex flex-col gap-3 p-5 rounded-3xl bg-gradient-to-br ${cat.color} border-2 ${cat.border} transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{cat.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{cat.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">
                  İncele <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
