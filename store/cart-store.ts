'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Size } from '@/types/index';
import { cartApi } from '@/lib/cart-api';
import { supabase } from '@/lib/supabase';

interface CartState {
  items: CartItem[];
  open: boolean;
  syncing: boolean;
  toggle: (value?: boolean) => void;
  addItem: (product: Product, size?: Size) => Promise<void>;
  removeItem: (slug: string, size?: Size) => Promise<void>;
  updateQty: (slug: string, size: Size | undefined, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  syncCartWithDb: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      syncing: false,

      toggle: (value) =>
        set((state) => ({ open: typeof value === 'boolean' ? value : !state.open })),

      syncCartWithDb: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        try {
          set({ syncing: true });

          // Busca itens do DB
          const dbItems = await cartApi.getCartItems(session.user.id);

          // Busca produtos correspondentes
          if (dbItems.length > 0) {
            const productIds = dbItems.map(item => item.product_id);
            const { data: products } = await supabase
              .from('products')
              .select('*')
              .in('id', productIds);

            if (products) {
              const cartItems: CartItem[] = dbItems.map(dbItem => {
                const product = products.find(p => p.id === dbItem.product_id);
                if (!product) return null;

                return {
                  product,
                  size: dbItem.size as Size | undefined,
                  quantity: dbItem.quantity
                };
              }).filter(Boolean) as CartItem[];

              set({ items: cartItems });
            }
          } else {
            set({ items: [] });
          }
        } catch (error) {
          console.error('Erro ao sincronizar carrinho:', error);
        } finally {
          set({ syncing: false });
        }
      },

      addItem: async (product, size) => {
        const { data: { session } } = await supabase.auth.getSession();

        // Atualiza localmente primeiro
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
        });

        // Sincroniza com DB se autenticado
        if (session?.user) {
          try {
            const existing = get().items.find(
              item => item.product.slug === product.slug && item.size === size
            );
            const quantity = existing?.quantity || 1;

            await cartApi.upsertCartItem(session.user.id, product.id, size, quantity);
          } catch (error) {
            console.error('Erro ao salvar item no carrinho:', error);
          }
        }
      },

      removeItem: async (slug, size) => {
        const { data: { session } } = await supabase.auth.getSession();
        const item = get().items.find(i => i.product.slug === slug && i.size === size);

        // Remove localmente
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.slug === slug && item.size === size),
          ),
        }));

        // Sincroniza com DB se autenticado
        if (session?.user && item) {
          try {
            await cartApi.removeCartItem(session.user.id, item.product.id, size);
          } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
          }
        }
      },

      updateQty: async (slug, size, qty) => {
        const { data: { session } } = await supabase.auth.getSession();
        const item = get().items.find(i => i.product.slug === slug && i.size === size);

        // Atualiza localmente
        set((state) => ({
          items: state.items.map((item) =>
            item.product.slug === slug && item.size === size
              ? { ...item, quantity: Math.max(1, Math.min(qty, item.product.stock)) }
              : item,
          ),
        }));

        // Sincroniza com DB se autenticado
        if (session?.user && item) {
          try {
            const clampedQty = Math.max(1, Math.min(qty, item.product.stock));
            await cartApi.updateQuantity(session.user.id, item.product.id, size, clampedQty);
          } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
          }
        }
      },

      clear: async () => {
        const { data: { session } } = await supabase.auth.getSession();

        // Limpa localmente
        set({ items: [] });

        // Sincroniza com DB se autenticado
        if (session?.user) {
          try {
            await cartApi.clearCart(session.user.id);
          } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
          }
        }
      },
    }),
    { name: 'parallel-store-cart' },
  ),
);
