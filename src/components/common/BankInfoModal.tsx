import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MessageCircle } from 'lucide-react';
import { useSite } from '@/hooks/useStorefront';
import CopyValue from './CopyValue';

interface BankInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BankInfoModal({ open, onClose }: BankInfoModalProps) {
  const { site } = useSite();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const waNumber = (site.whatsapp || site.phone).replace(/\D/g, '');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-brand-green" />
                <h3 className="font-bold text-gray-900">Banka Bilgileri</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-gray-500 mb-2">
                Bağışınızı <strong>havale / EFT</strong> ile aşağıdaki hesaba yapabilirsiniz.
              </p>
              <div className="rounded-2xl border border-gray-100 p-2">
                <CopyValue label="Banka" value={site.bank.name} />
                <CopyValue label="IBAN" value={site.bank.iban} />
                <CopyValue label="Hesap Adı" value={site.bank.accountHolder} />
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs text-amber-900">
                Havale açıklamasına, ödeme sonrası verilen <strong>sipariş kodunu</strong> yazmayı
                unutmayın. Dekontu WhatsApp'tan bize iletebilirsiniz.
              </div>

              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#25D366] text-white font-semibold hover:brightness-95 transition"
              >
                <MessageCircle size={17} />
                WhatsApp ile İletişime Geç
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
