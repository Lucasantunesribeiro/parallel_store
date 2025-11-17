'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Size } from '@/types/index';

interface CartState {
  items: CartItem[];
  open: boolean;
  toggle: (value?: boolean) => void;
  addItem: (product: Product, size?: Size) => void;
  removeItem: (slug: string, size?: Size) => void;
  updateQty: (slug: string, size: Size | undefined, qty: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      toggle: (value) =>
        set((state) => ({ open: typeof value === 'boolean' ? value : !state.open })),
      addItem: (product, size) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.slug === product.slug && item.size === size,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.slug === product.slug && item.size === size
                  ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { product, size, quantity: 1 }],
          };
        }),
      removeItem: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.slug === slug && item.size === size),
          ),
        })),
      updateQty: (slug, size, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.slug === slug && item.size === size
              ? { ...item, quantity: Math.max(1, Math.min(qty, item.product.stock)) }
              : item,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'parallel-store-cart' },
  ),
);
