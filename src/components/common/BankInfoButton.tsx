import { useState, type ReactNode } from 'react';
import { Building2 } from 'lucide-react';
import BankInfoModal from './BankInfoModal';

interface BankInfoButtonProps {
  className?: string;
  label?: string;
  icon?: ReactNode;
}

export default function BankInfoButton({
  className = '',
  label = 'Banka Bilgileri',
  icon,
}: BankInfoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {icon ?? <Building2 size={16} />}
        {label}
      </button>
      <BankInfoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
