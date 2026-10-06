import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle2, Clock, Scissors, Truck, PartyPopper, XCircle } from 'lucide-react';
import { api } from '@/lib/api';
import type { ApiOrder } from '@/types';

const statusSteps = [
  { label: 'Sipariş Alındı', Icon: Package, desc: 'Siparişiniz sistemimize kaydedildi.' },
  { label: 'Onaylandı', Icon: CheckCircle2, desc: 'Ödemeniz doğrulandı, hazırlıklar başladı.' },
  { label: 'Kesim Sürecinde', Icon: Scissors, desc: 'Kurbanınız dini ölçülere uygun şekilde kesiliyor.' },
  { label: 'Teslim / Dağıtım', Icon: Truck, desc: 'Etler ihtiyaç sahiplerine ulaştırılıyor veya size hazırlanıyor.' },
  { label: 'Tamamlandı', Icon: PartyPopper, desc: 'Hizmet tamamlandı. Video ve belgeler gönderildi.' },
];

function statusToIndex(order: ApiOrder): number {
  if (order.status === 'cancelled' || order.status === 'failed') return -1;
  if (order.status === 'compeleted') return statusSteps.length;
  if (order.status === 'provessing') return 2;
  // pending
  if (order.payment_status === 'completed' || order.payment_status === 'paid') return 1;
  return 0;
}

function formatDate(value: string): string {
  try {
    return new Date(value).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export default function OrderTrackingPage() {
  const [params] = useSearchParams();
  const successParam = params.get('success');
  const codeParam = params.get('kod') ?? '';

  const [code, setCode] = useState(codeParam);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<ApiOrder | null>(null);

  const runSearch = useCallback(async (value: string) => {
    const trimmed = value.trim();
    setSearched(true);
    setError(null);
    if (!trimmed) {
      setOrder(null);
      return;
    }
    setLoading(true);
    try {
      const data = await api.orders.track(trimmed);
      setOrder(data);
    } catch (err) {
      setOrder(null);
      const message = err instanceof Error ? err.message : 'Sipariş bulunamadı.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (codeParam) runSearch(codeParam);
  }, [codeParam, runSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(code);
  };

  const statusIndex = order ? statusToIndex(order) : -1;
  const productLabel = order?.items?.map((i) => i.donation_title).filter(Boolean).join(', ');

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
            <button type="submit" disabled={loading} className="btn-primary px-5 py-3 disabled:opacity-60">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={16} />
              )}
              Sorgula
            </button>
          </div>
        </form>

        {/* Result */}
        {searched && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {order ? (
              <div className="bg-white rounded-3xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                      {order.order_number}
                    </p>
                    <h2 className="font-bold text-gray-900 mt-0.5">{productLabel || 'Sipariş'}</h2>
                    <p className="text-sm text-gray-500">Sipariş tarihi: {formatDate(order.created_at)}</p>
                  </div>
                  {statusIndex === -1 ? (
                    <span className="badge bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                      İptal / Başarısız
                    </span>
                  ) : (
                    <span className="badge-green">Aktif</span>
                  )}
                </div>

                {statusIndex === -1 ? (
                  <div className="flex items-center gap-3 text-red-600 bg-red-50 rounded-2xl p-4">
                    <XCircle size={20} />
                    <p className="text-sm font-medium">
                      Bu sipariş iptal edilmiş veya başarısız durumda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {statusSteps.map((step, i) => {
                      const isCompleted = i < statusIndex;
                      const isCurrent = i === statusIndex;
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
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 shadow-card text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-gray-300" />
                </div>
                <p className="font-semibold text-gray-700">Sipariş Bulunamadı</p>
                <p className="text-sm text-gray-400 mt-1">
                  {error || 'Lütfen kodu kontrol edip tekrar deneyin'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
