'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ProductCard } from '@/components/products/product-card';
import { NewReleaseMobileCard } from '@/components/products/new-release-mobile-card';
import { demoProducts } from '@/lib/data';
import { useAuthStore } from '@/store/auth-store';

export default function FavoritesPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const favorites = demoProducts.slice(0, 4);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-background pt-40 lg:pt-48">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-16 lg:px-8">
        <header className="space-y-4 text-white">
          <p className="text-xs uppercase tracking-[0.6em] text-secondary">Seu universo</p>
          <h1 className="text-4xl font-black uppercase tracking-[0.3em]">Favoritos Parallel</h1>
          <p className="text-white/70">
            Salve os drops que representam seu momento. Ao ativar notificações, avisamos antes de cada restock.
          </p>
        </header>

        {favorites.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-center text-white/70">
            <p className="text-sm uppercase tracking-[0.4em]">Nenhum favorito ainda</p>
            <p className="mt-4 text-base">
              Explore os drops e clique em “Favoritos” para montar uma lista paralela só sua.
            </p>
            <Link
              href="/produtos"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
              {favorites.map((product) => (
                <NewReleaseMobileCard key={product.id} product={product} />
              ))}
            </div>
            <div className="hidden gap-6 md:grid md:grid-cols-2">
              {favorites.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
