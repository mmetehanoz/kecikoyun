import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle2, Clock, Scissors, Truck, PartyPopper } from 'lucide-react';

const mockOrders: Record<string, { status: number; trackingCode: string; product: string; date: string }> = {
  'KK123456': { status: 3, trackingCode: 'KK123456', product: 'Küçükbaş Kurban', date: '06 Haziran 2025' },
  'KK789012': { status: 4, trackingCode: 'KK789012', product: 'Büyükbaş Hisse', date: '06 Haziran 2025' },
};

const statusSteps = [
  { label: 'Sipariş Alındı', Icon: Package, desc: 'Siparişiniz sistemimize kaydedildi.' },
  { label: 'Onaylandı', Icon: CheckCircle2, desc: 'Siparişiniz onaylandı ve hazırlıklar başladı.' },
  { label: 'Kesim Sürecinde', Icon: Scissors, desc: 'Kurbanınız dini ölçülere uygun şekilde kesiliyor.' },
  { label: 'Teslim / Dağıtım', Icon: Truck, desc: 'Etler ihtiyaç sahiplerine ulaştırılıyor veya size hazırlanıyor.' },
  { label: 'Tamamlandı', Icon: PartyPopper, desc: 'Hizmet tamamlandı. Video ve belgeler gönderildi.' },
];

export default function OrderTrackingPage() {
  const [params] = useSearchParams();
  const successParam = params.get('success');
  const codeParam = params.get('kod') ?? '';

  const [code, setCode] = useState(codeParam);
  const [searched, setSearched] = useState(!!codeParam);
  const [order, setOrder] = useState(
    codeParam ? mockOrders[codeParam] ?? null : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setOrder(mockOrders[code.toUpperCase()] ?? null);
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-12">
      <div className="container-site max-w-2xl">
        {successParam && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-green text-white rounded-3xl p-6 mb-8 text-center"
          >
            <PartyPopper size={32} className="mx-auto mb-3" />
            <h2 className="text-xl font-bold">Siparişiniz Alındı!</h2>
            <p className="text-white/80 mt-1 text-sm">
              Sipariş kodunuzu aşağıda takip edebilirsiniz.
            </p>
          </motion.div>
        )}

        <div className="text-center mb-10">
          <h1 className="section-title">Sipariş Takibi</h1>
          <p className="section-subtitle">Sipariş kodunuzu girerek sürecini takip edin</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-white rounded-3xl p-5 shadow-card mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sipariş / Takip Kodu
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="örn. KK123456"
              className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition uppercase font-mono tracking-widest"
            />
            <button type="submit" className="btn-primary px-5 py-3">
              <Search size={16} />
              Sorgula
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Test için: <span className="font-mono font-bold">KK123456</span> veya <span className="font-mono font-bold">KK789012</span>
          </p>
        </form>

        {/* Result */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {order ? (
              <div className="bg-white rounded-3xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{order.trackingCode}</p>
                    <h2 className="font-bold text-gray-900 mt-0.5">{order.product}</h2>
                    <p className="text-sm text-gray-500">Kesim tarihi: {order.date}</p>
                  </div>
                  <span className="badge-green">Aktif</span>
                </div>

                {/* Progress */}
                <div className="space-y-4">
                  {statusSteps.map((step, i) => {
                    const isCompleted = i < order.status;
                    const isCurrent = i === order.status;
                    return (
                      <div key={step.label} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                              isCompleted
                                ? 'bg-brand-green text-white'
                                : isCurrent
                                ? 'bg-brand-green/20 text-brand-green ring-2 ring-brand-green ring-offset-2'
                                : 'bg-gray-100 text-gray-300'
                            }`}
                          >
                            <step.Icon size={18} />
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 my-1 ${
                                isCompleted ? 'bg-brand-green' : 'bg-gray-100'
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-4">
                          <p
                            className={`font-semibold text-sm ${
                              isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                            {isCurrent && (
                              <span className="ml-2 badge-green text-xs">Mevcut Durum</span>
                            )}
                          </p>
                          {(isCompleted || isCurrent) && (
                            <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 shadow-card text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-gray-300" />
                </div>
                <p className="font-semibold text-gray-700">Sipariş Bulunamadı</p>
                <p className="text-sm text-gray-400 mt-1">
                  Lütfen kodu kontrol edip tekrar deneyin
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
