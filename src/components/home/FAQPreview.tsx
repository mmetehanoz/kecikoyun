import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { faqs } from '@/data/products';

export default function FAQPreview() {
  const [open, setOpen] = useState<string | null>('f1');
  const preview = faqs.slice(0, 5);

  return (
    <section className="py-20 bg-[#FAFAF9]">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Sıkça Sorulan Sorular</h2>
            <p className="section-subtitle">
              Merak ettiğiniz konulara hızlı yanıtlar
            </p>
          </div>

          <div className="space-y-3">
            {preview.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: open === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={18} className="text-brand-green" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/sss"
              className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all"
            >
              Tüm Soruları Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
