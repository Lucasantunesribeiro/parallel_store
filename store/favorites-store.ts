'use client';

import { create } from 'zustand';
import { favoritesApi } from '@/lib/favorites-api';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/index';

interface FavoritesState {
  favoriteIds: Set<string>;
  loading: boolean;
  loadFavorites: (userId: string) => Promise<void>;
  toggleFavorite: (product: Product) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: new Set<string>(),
  loading: false,

  loadFavorites: async (userId: string) => {
    try {
      set({ loading: true });
      const favorites = await favoritesApi.getFavorites(userId);
      const ids = new Set(favorites.map(f => f.product_id));
      set({ favoriteIds: ids, loading: false });
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      set({ loading: false });
    }
  },

  toggleFavorite: async (product: Product) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { favoriteIds } = get();
    const isFav = favoriteIds.has(product.id);

    try {
      if (isFav) {
        await favoritesApi.removeFavorite(session.user.id, product.id);
        const newIds = new Set(favoriteIds);
        newIds.delete(product.id);
        set({ favoriteIds: newIds });
      } else {
        await favoritesApi.addFavorite(session.user.id, product.id);
        const newIds = new Set(favoriteIds);
        newIds.add(product.id);
        set({ favoriteIds: newIds });
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    }
  },

  isFavorite: (productId: string) => {
    return get().favoriteIds.has(productId);
  },

  clear: () => {
    set({ favoriteIds: new Set() });
  },
}));
