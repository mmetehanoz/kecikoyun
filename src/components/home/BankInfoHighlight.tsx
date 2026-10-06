import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MessageCircle, Eye } from 'lucide-react';
import { useSite } from '@/hooks/useStorefront';
import BankInfoModal from '@/components/common/BankInfoModal';

export default function BankInfoHighlight() {
  const { site } = useSite();
  const [open, setOpen] = useState(false);
  const waNumber = (site.whatsapp || site.phone).replace(/\D/g, '');

  return (
    <section className="py-8 bg-[#FAFAF9]">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-green to-brand-green-dark text-white p-6 sm:p-8 shadow-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Building2 size={28} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">Ödeme: Banka Havalesi / EFT</h2>
              <p className="text-white/85 mt-1 text-sm sm:text-base">
                Bağışınızı havale/EFT ile yapabilirsiniz. Ödeme sonrası verilen sipariş kodunu
                açıklamaya yazın, dekontu WhatsApp'tan bize iletin.
              </p>
              <p className="mt-2 text-sm">
                <span className="text-white/70">IBAN:</span>{' '}
                <span className="font-mono font-semibold">{site.bank.iban}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:flex-shrink-0">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-brand-green font-semibold px-5 py-3 hover:bg-white/90 transition"
              >
                <Eye size={16} />
                Banka Bilgileri
              </button>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 border border-white/30 text-white font-semibold px-5 py-3 hover:bg-white/25 transition"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <BankInfoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
