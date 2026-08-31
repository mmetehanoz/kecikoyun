import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Video, Truck, User, Globe, Target } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getCountryPrice } from '@/lib/utils';
import type { Product, CartItemProxyInfo, DeliveryOption } from '@/types';

interface AddToCartModalProps {
  product: Product;
  country: string;
  niyet: string;
  onClose: () => void;
}

export default function AddToCartModal({ product, country, niyet, onClose }: AddToCartModalProps) {
  const { addItem } = useCartStore();
  const [proxy, setProxy] = useState<CartItemProxyInfo>({
    name: '',
    phone: '',
    purpose: niyet,
  });
  const [wantsVideo, setWantsVideo] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryOption>('ihtiyac-sahipleri');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product, proxy, wantsVideo, delivery, country, niyet);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-brand-green font-semibold">
                {formatPrice(getCountryPrice(product, country))}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            {/* Vekalet bilgileri */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User size={15} className="text-brand-green" />
                <span className="font-semibold text-sm text-gray-800">Vekalet Bilgileri</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={proxy.name}
                    onChange={(e) => setProxy({ ...proxy, name: e.target.value })}
                    placeholder="Kurban sahibinin adı soyadı"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={proxy.phone}
                    onChange={(e) => setProxy({ ...proxy, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-cream">
                    <Target size={14} className="text-brand-green flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">Niyet</p>
                      <p className="text-sm font-semibold text-gray-900">{niyet}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-cream">
                    <Globe size={14} className="text-brand-green flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">Ülke</p>
                      <p className="text-sm font-semibold text-gray-900">{country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teslimat tercihi */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Truck size={15} className="text-brand-green" />
                <span className="font-semibold text-sm text-gray-800">Teslimat Tercihi</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'ihtiyac-sahipleri', label: 'İhtiyaç Sahiplerine', icon: '🤲' },
                  { value: 'kendim', label: 'Kendim Alacağım', icon: '📦' },
                ] .map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDelivery(value as DeliveryOption)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                      delivery === value
                        ? 'border-brand-green bg-brand-green/5 text-brand-green'
                        : 'border-gray-200 text-gray-600 hover:border-brand-green/50'
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-xs text-center">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Video isteği */}
            <label className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-gray-200 hover:border-brand-green/50 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={wantsVideo}
                onChange={(e) => setWantsVideo(e.target.checked)}
                className="w-4 h-4 accent-brand-green"
              />
              <div className="flex items-center gap-2 flex-1">
                <Video size={14} className="text-brand-gold" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Kesim videosu istiyorum</p>
                  <p className="text-xs text-gray-400">WhatsApp ile gönderilir</p>
                </div>
              </div>
            </label>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Vazgeç
              </button>
              <button type="submit" className="flex-1 btn-primary justify-center">
                <ShoppingCart size={15} />
                Sepete Ekle
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
