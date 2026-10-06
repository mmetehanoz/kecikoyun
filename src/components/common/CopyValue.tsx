import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyValueProps {
  label?: string;
  value: string;
  className?: string;
}

export default function CopyValue({ label, value, className = '' }: CopyValueProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano erişimi yoksa sessizce geç */
    }
  };

  return (
    <div className={`py-2 border-b border-gray-100 last:border-0 ${className}`}>
      {label && <p className="text-xs text-gray-400 mb-0.5">{label}</p>}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono font-semibold text-gray-900 break-all">{value || '—'}</span>
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
    </div>
  );
}
