import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { getCountryPrice } from '@/lib/utils';
import type { CategoryType, LocationType } from '@/types';

const categoryOptions: { value: CategoryType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'kucukbas', label: 'Küçükbaş' },
  { value: 'buyukbas', label: 'Büyükbaş' },
  { value: 'yemek', label: 'Yemek' },
];

const locationOptions: { value: LocationType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tüm Lokasyonlar' },
  { value: 'yurt-disi', label: 'Yurt Dışı' },
];

export default function ProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState<LocationType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'default'>('default');

  let filtered = products.filter(
    (p) =>
      (categoryFilter === 'all' || p.category === categoryFilter) &&
      (locationFilter === 'all' || p.location === locationFilter)
  );

  if (sortBy === 'price-asc')
    filtered = [...filtered].sort((a, b) => getCountryPrice(a) - getCountryPrice(b));
  if (sortBy === 'price-desc')
    filtered = [...filtered].sort((a, b) => getCountryPrice(b) - getCountryPrice(a));

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-site py-8">
          <h1 className="text-3xl font-bold text-gray-900">Kurbanlıklar</h1>
          <p className="text-gray-500 mt-1">
            {filtered.length} bağış listeleniyor
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-card mb-7">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={15} />
              <span className="font-medium">Filtrele:</span>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCategoryFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    categoryFilter === opt.value
                      ? 'bg-brand-green text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            {/* Location filter */}
            <div className="flex gap-1.5">
              {locationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLocationFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    locationFilter === opt.value
                      ? 'bg-brand-gold text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs text-gray-600 bg-gray-100 border-0 rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              >
                <option value="default">Varsayılan Sıralama</option>
                <option value="price-asc">Artan Fiyat</option>
                <option value="price-desc">Azalan Fiyat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold text-gray-700">Sonuç bulunamadı</p>
            <p className="text-sm text-gray-400 mt-1">Farklı filtreler deneyin</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((product) => (
              <motion.div key={product.id} layout>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}