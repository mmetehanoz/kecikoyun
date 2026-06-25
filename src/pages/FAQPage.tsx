import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/products';

const categories = [
  { value: 'all', label: 'Tümü' },
  { value: 'dini', label: 'Dini Konular' },
  { value: 'hizmet', label: 'Hizmet' },
  { value: 'hayvan', label: 'Kurbanlık' },
  { value: 'lokasyon', label: 'Lokasyon' },
  { value: 'odeme', label: 'Ödeme' },
  { value: 'iptal', label: 'İptal & İade' },
];

export default function FAQPage() {
  const [active, setActive] = useState<string | null>(null);
  const [cat, setCat] = useState('all');

  const filtered = cat === 'all' ? faqs : faqs.filter((f) => f.category === cat);

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container-site text-center">
          <h1 className="section-title">Sıkça Sorulan Sorular</h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Hizmetimiz hakkında merak ettiğiniz her şey burada
          </p>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                cat === c.value
                  ? 'bg-brand-green text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
            >
              <button
                onClick={() => setActive(active === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: active === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-brand-green" />
                </motion.div>
              </button>
              <AnimatePresence>
                {active === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 bg-brand-cream rounded-3xl p-6 text-center">
          <p className="font-semibold text-gray-900">Aradığınız cevabı bulamadınız mı?</p>
          <p className="text-sm text-gray-500 mt-1 mb-4">Müşteri hizmetlerimize ulaşabilirsiniz</p>
          <a href="tel:+902121234567" className="btn-primary inline-flex">
            Bizi Arayın
          </a>
        </div>
      </div>
    </div>
  );
}
