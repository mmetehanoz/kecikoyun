import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import type { CategoryType } from '@/types';

interface CategoryPageProps {
  category: CategoryType;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
}

export default function CategoryPage({
  category,
  title,
  subtitle,
  description,
  emoji,
  color,
}: CategoryPageProps) {
  const filtered = products.filter((p) => p.category === category);

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Hero */}
      <div className={`${color} py-14`}>
        <div className="container-site">
          <Link
            to="/kurbanlıklar"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Tüm Kurbanlıklar
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-4xl">
              {emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
              <p className="text-white/80 mt-1">{subtitle}</p>
            </div>
          </div>
          <p className="text-white/70 mt-6 max-w-2xl leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container-site py-10">
        <div className="flex items-center justify-between mb-7">
          <p className="text-sm text-gray-500 font-medium">
            {filtered.length} bağış mevcut
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📋</p>
            <p className="font-semibold text-gray-700">Şu an stok yok</p>
            <p className="text-sm text-gray-400 mt-1">Kısa süre içinde tekrar kontrol edin</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
