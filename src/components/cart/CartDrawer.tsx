import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-brand-green" />
                <h2 className="font-bold text-gray-900">Sepetim</h2>
                {items.length > 0 && (
                  <span className="bg-brand-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Sepeti kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <ShoppingCart size={28} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Sepetiniz boş</p>
                    <p className="text-sm text-gray-400 mt-1">Kurban seçerek başlayın</p>
                  </div>
                  <Link
                    to="/kurbanlıklar"
                    onClick={closeCart}
                    className="btn-primary text-sm py-2.5 px-5"
                  >
                    Kurbanlıklara Git
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.product.locationLabel}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.wantsVideo && (
                            <span className="badge-green text-xs">Video İstendi</span>
                          )}
                          {item.delivery === 'ihtiyac-sahipleri' && (
                            <span className="badge-gold text-xs">İhtiyaç Sahiplerine</span>
                          )}
                        </div>
                        {item.proxy.name && (
                          <p className="text-xs text-gray-500 mt-1.5">
                            Vekil: <span className="font-medium">{item.proxy.name}</span>
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors"
                        aria-label="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                          aria-label="Azalt"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                          aria-label="Artır"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-bold text-brand-green">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Toplam</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <Link
                  to="/odeme"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center"
                >
                  Siparişi Tamamla
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/sepet"
                  onClick={closeCart}
                  className="block text-center text-sm text-gray-500 hover:text-brand-green transition-colors"
                >
                  Sepete Git
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
