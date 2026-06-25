import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-[#FAFAF9] min-h-screen">
        <div className="container-site py-20 flex flex-col items-center justify-center gap-6 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
            <ShoppingCart size={36} className="text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sepetiniz Boş</h1>
            <p className="text-gray-500 mt-2">Kurban seçerek başlayın</p>
          </div>
          <Link to="/kurbanlıklar" className="btn-primary">
            Kurbanlıklara Gözat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      <div className="container-site py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/kurbanlıklar"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Alışverişe Devam Et
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Sepetim</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-3xl p-5 shadow-card"
              >
                <div className="flex gap-4">
                  {/* Product visual */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cream to-brand-green/10 flex items-center justify-center text-3xl flex-shrink-0">
                    🐑
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.product.locationLabel} · {item.product.typeLabel}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-8 h-8 rounded-xl hover:bg-red-50 hover:text-red-500 text-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                        aria-label="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.wantsVideo && (
                        <span className="badge-green">Video İstendi</span>
                      )}
                      <span className={`badge ${item.delivery === 'ihtiyac-sahipleri' ? 'badge-gold' : 'bg-gray-100 text-gray-600'}`}>
                        {item.delivery === 'ihtiyac-sahipleri' ? 'İhtiyaç Sahiplerine' : 'Kendim Alacağım'}
                      </span>
                    </div>

                    {item.proxy.name && (
                      <p className="text-xs text-gray-500 mt-2">
                        Vekil: <span className="font-semibold">{item.proxy.name}</span>
                        {item.proxy.phone && ` — ${item.proxy.phone}`}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
                          aria-label="Azalt"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
                          aria-label="Artır"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-brand-green text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-5">Sipariş Özeti</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Toplam</span>
                  <span className="text-2xl font-bold text-brand-green">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">KDV dahil</p>
              </div>

              <Link to="/odeme" className="btn-primary w-full justify-center">
                Siparişi Tamamla
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center justify-center gap-3 mt-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5 opacity-50" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50" />
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">Güvenli SSL ödeme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
