'use client';

import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/store/cart-store';
import { CartItemRow } from '@/components/cart/cart-item';
import { formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';

export default function CartPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const items = useCartStore((state) => state.items);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-background pt-40">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 lg:flex-row">
        <div className="flex-1 space-y-4 rounded-3xl border border-black/10 bg-white p-6">
          <h1 className="text-2xl font-bold uppercase tracking-[0.4em]">Carrinho</h1>
          {items.length === 0 ? (
            <p className="text-sm text-accent">Você ainda não adicionou produtos.</p>
          ) : (
            items.map((item) => <CartItemRow key={`${item.product.slug}-${item.size}`} item={item} />)
          )}
        </div>
        <aside className="w-full rounded-3xl border border-black/10 bg-white p-6 lg:w-80">
          <p className="text-sm uppercase tracking-[0.4em] text-accent">Resumo</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span>A calcular</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-black/10 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-secondary px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black"
          >
            Ir para checkout
          </Link>
          <p className="mt-3 text-xs text-accent">Pagamentos processados por Stripe e Mercado Pago (em breve).</p>
        </aside>
      </div>
    </div>
  );
}
