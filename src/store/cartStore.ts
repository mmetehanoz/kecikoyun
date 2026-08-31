import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCountryPrice } from '@/lib/utils';
import type { CartItem, Product, CartItemProxyInfo, DeliveryOption } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (
    product: Product,
    proxy: CartItemProxyInfo,
    wantsVideo: boolean,
    delivery: DeliveryOption,
    country: string,
    niyet: string
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, proxy, wantsVideo, delivery, country, niyet) => {
        set((state) => {
          const exists = state.items.find((i) => i.product.id === product.id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { product, quantity: 1, proxy, wantsVideo, delivery, country, niyet },
            ],
          };
        });
        set({ isOpen: true });
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + getCountryPrice(i.product, i.country) * i.quantity,
          0
        ),
    }),
    { name: 'kecikoyun-cart', version: 2, migrate: () => ({ items: [], isOpen: false }) }
  )
);
