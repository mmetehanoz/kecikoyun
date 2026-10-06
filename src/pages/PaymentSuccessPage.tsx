import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Copy,
  Check,
  Building2,
  MessageCircle,
  PackageSearch,
  AlertCircle,
} from 'lucide-react';
import { useSite } from '@/hooks/useStorefront';

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano erişimi yoksa sessizce geç */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-mono font-semibold text-gray-900 break-all">{value || '—'}</p>
      </div>
      {value && (
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 text-xs font-medium text-brand-green hover:underline flex-shrink-0"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Kopyalandı' : 'Kopyala'}
        </button>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const code = params.get('kod') ?? '';
  const { site } = useSite();

  const waNumber = (site.whatsapp || site.phone).replace(/\D/g, '');
  const waMessage = `Merhaba, ${site.name} için banka havalesi bağışımın dekontunu paylaşıyorum. Sipariş kodu: ${code}`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-10">
      <div className="container-site max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-card overflow-hidden"
        >
          {/* Başarı başlığı */}
          <div className="bg-brand-green text-white px-6 py-8 text-center">
            <CheckCircle2 size={44} className="mx-auto mb-3" />
            <h1 className="text-2xl font-bold">Siparişiniz Alındı!</h1>
            <p className="text-white/85 mt-1 text-sm">
              Bağışınız <strong>Beklemede</strong> olarak kaydedildi.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Sipariş kodu */}
            <div className="text-center">
              <p className="text-sm text-gray-500">Havale açıklamasına yazacağınız sipariş kodu</p>
              <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-brand-green mt-2 break-all">
                {code || '—'}
              </p>
            </div>

            {/* Adım adım talimat */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
              <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <ol className="text-sm text-amber-900 space-y-1 list-decimal list-inside">
                <li>Aşağıdaki banka hesabına havale/EFT yapın.</li>
                <li>
                  Açıklama alanına yukarıdaki <strong>sipariş kodunu</strong> yazın.
                </li>
                <li>
                  Dekontu (makbuzu) WhatsApp üzerinden bize gönderin; bağışınız
                  onaylanıp <strong>Tamamlandı</strong> olarak işaretlenecek.
                </li>
              </ol>
            </div>

            {/* Banka bilgileri */}
            <div className="rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={16} className="text-brand-green" />
                <h2 className="font-bold text-gray-900">Banka Bilgileri</h2>
              </div>
              <CopyField label="Banka" value={site.bank.name} />
              <CopyField label="IBAN" value={site.bank.iban} />
              <CopyField label="Hesap Adı" value={site.bank.accountHolder} />
            </div>

            {/* WhatsApp dekont */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-semibold hover:brightness-95 transition"
            >
              <MessageCircle size={18} />
              Dekontu WhatsApp ile Gönder
            </a>

            <Link
              to={`/siparis-takibi?kod=${encodeURIComponent(code)}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-brand-green text-brand-green font-semibold hover:bg-brand-green/5 transition"
            >
              <PackageSearch size={18} />
              Siparişimi Takip Et
            </Link>

            <p className="text-center text-xs text-gray-400">
              Havale açıklamasına sipariş kodunu yazmanız, ödemenizin doğru şekilde
              eşleştirilmesi için önemlidir.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
