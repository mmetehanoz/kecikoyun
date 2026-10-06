import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { products as fallbackProducts } from '@/data/products';
import type { Product, Site } from '@/types';

export const DEFAULT_SITE: Site = {
  name: 'KeçiKoyun',
  siteName: 'KeçiKoyun',
  phone: '+90 534 017 88 67',
  email: 'info@kecikoyun.com',
  address: 'Muratpaşa Mahallesi Uluyol Caddesi No:17-19 Daire:68, İstanbul',
  website: '',
  logo: '',
  slaughterDate: '2026-05-27',
  whatsapp: '905340178867',
  bank: {
    name: 'Ziraat Katılım',
    iban: 'TR00 0000 0000 0000 0000 0000 00',
    accountHolder: 'KeçiKoyun',
  },
};

/**
 * Ürünleri backend storefront katalog endpoint'inden çeker.
 * Backend erişilemezse statik katalog verisine düşer (fallback).
 */
let _loggedUseProducts = false;

export function useProducts() {
  if (!_loggedUseProducts) {
    _loggedUseProducts = true;
    // eslint-disable-next-line no-console
    console.info('[storefront] useProducts hook invoked');
  }
  const query = useQuery({
    queryKey: ['storefront', 'catalog'],
    queryFn: () => api.storefront.catalog(),
    // Admin paneldeki fiyat/ürün değişiklikleri anında yansısın
    staleTime: 0,
    refetchOnMount: 'always',
    retry: 1,
  });

  const remote = query.data?.products;
  const products: Product[] = remote && remote.length > 0 ? remote : fallbackProducts;

  return {
    products,
    isLoading: query.isLoading,
    isError: query.isError,
    isFallback: !remote || remote.length === 0,
    refetch: query.refetch,
  };
}

let _loggedUseSite = false;

export function useSite() {
  if (!_loggedUseSite) {
    _loggedUseSite = true;
    // eslint-disable-next-line no-console
    console.info('[storefront] useSite hook invoked');
  }
  const query = useQuery({
    queryKey: ['storefront', 'site'],
    queryFn: () => api.storefront.site(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return {
    site: query.data?.site ?? DEFAULT_SITE,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
