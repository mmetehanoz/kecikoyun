import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Calendar, Video, Check, Users, Globe, Target } from 'lucide-react';
import { cn, formatPrice, formatDate, getCountryPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import type { Product, NiyetType } from '@/types';
import AddToCartModal from './AddToCartModal';

const NIYET_OPTIONS: NiyetType[] = ['Adak', 'Akika', 'Şükür', 'Sadaka'];

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState(product.countries[0]?.country ?? '');
  const [niyet, setNiyet] = useState<NiyetType>('Adak');
  const { items } = useCartStore();
  const inCart = items.some((i) => i.product.id === product.id);

  const price = getCountryPrice(product, country);

  const stockStatus =
    product.stock === 0
      ? { label: 'Tükendi', color: 'badge-red' }
      : product.stock <= 5
      ? { label: `Son ${product.stock} adet`, color: 'badge-gold' }
      : { label: 'Stokta Var', color: 'badge-green' };

  const selectClass =
    'w-full px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition bg-white text-gray-700';

  return (
    <>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn('card flex flex-col overflow-hidden group', className)}
      >
        {/* Image */}
        <div className="relative h-40 bg-gradient-to-br from-brand-cream to-brand-green/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl">
              {product.category === 'yemek' ? '🍲' : product.type === 'koc' ? '🐏' : product.category === 'buyukbas' ? '🐂' : '🐑'}
            </span>
          </div>
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={cn('badge', stockStatus.color)}>{stockStatus.label}</span>
            <span className="badge bg-blue-50 text-blue-600">{product.typeLabel}</span>
          </div>
          {product.videoAvailable && (
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-xl flex items-center justify-center shadow-sm">
              <Video size={14} className="text-brand-green" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-gray-900 text-base leading-tight">{product.name}</h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
              {product.shortDescription}
            </p>

            <div className="space-y-2 mb-4">
              {/* Niyet */}
              <div className="flex items-center gap-2">
                <Target size={13} className="text-brand-green flex-shrink-0" />
                <label className="text-xs text-gray-500 w-14 flex-shrink-0">Niyet</label>
                <select
                  value={niyet}
                  onChange={(e) => setNiyet(e.target.value as NiyetType)}
                  className={selectClass}
                >
                  {NIYET_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ülke */}
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-brand-green flex-shrink-0" />
                <label className="text-xs text-gray-500 w-14 flex-shrink-0">Ülke</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={selectClass}
                >
                  {product.countries.map((c) => (
                    <option key={c.country} value={c.country}>
                      {c.country} — {formatPrice(c.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} className="text-brand-green flex-shrink-0" />
                <span>Kesim: {formatDate(product.slaughterDate)}</span>
              </div>
              {product.shareCount && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users size={12} className="text-brand-green flex-shrink-0" />
                  <span>{product.shareCount} hisseli</span>
                </div>
              )}
              {product.videoAvailable && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Video size={12} className="text-brand-gold flex-shrink-0" />
                  <span>Video gönderilebilir</span>
                </div>
              )}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div>
              <p className="text-2xl font-bold text-brand-green">{formatPrice(price)}</p>
              <p className="text-xs text-gray-400">{country} kesim</p>
            </div>

            <button
              onClick={() => !inCart && setShowModal(true)}
              disabled={product.stock === 0}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all',
                inCart
                  ? 'bg-brand-green/10 text-brand-green cursor-default'
                  : product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'btn-primary'
              )}
            >
              {inCart ? (
                <>
                  <Check size={14} />
                  Sepette
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  Sepete Ekle
                </>
              )}
            </button>
          </div>
        </div>
      </motion.article>

      {showModal && (
        <AddToCartModal
          product={product}
          country={country}
          niyet={niyet}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}