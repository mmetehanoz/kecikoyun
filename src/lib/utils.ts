import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountryPrice(product: Product, country?: string): number {
  if (!product.countries || product.countries.length === 0) return 0;
  if (!country) return product.countries[0].price ?? 0;
  return (
    product.countries.find((c) => c.country === country)?.price ??
    product.countries[0].price ??
    0
  );
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function generateOrderId(): string {
  return 'KK' + Date.now().toString(36).toUpperCase();
}
