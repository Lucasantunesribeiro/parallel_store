'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useFavoritesStore } from '@/store/favorites-store';
import { useCartStore } from '@/store/cart-store';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/index';

export default function FavoritosPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (user) {
      loadFavorites(user.id);
    }
  }, [user, loadFavorites]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (favoriteIds.size === 0) {
        setProducts([]);
        setLoadingProducts(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .in('id', Array.from(favoriteIds));

        setProducts(data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [favoriteIds]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">MEUS FAVORITOS</h1>
        <p className="text-sm text-neutral-600 mt-2">
          {products.length} {products.length === 1 ? 'produto' : 'produtos'} salvos
        </p>
      </div>

      {loadingProducts ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-neutral-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhum favorito ainda</h2>
          <p className="text-neutral-600 mb-6">
            Adicione produtos aos favoritos para vê-los aqui
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
          >
            EXPLORAR PRODUTOS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-all">
              <Link href={`/produtos/${product.slug}`}>
                <div className="aspect-square relative overflow-hidden bg-neutral-100">
                  <Image
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                aria-label="Remover dos favoritos"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </button>

              <div className="p-4">
                <Link href={`/produtos/${product.slug}`}>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-yellow-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-yellow-600 mb-3">
                  R$ {product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => addItem(product)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
                >
                  <ShoppingBag className="h-4 w-4" />
                  ADICIONAR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
