'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const items = useCartStore((state) => state.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (items.length === 0 && isAuthenticated) {
      router.push('/');
    }
  }, [items, isAuthenticated, router]);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userId: user.id,
          userEmail: user.email,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar checkout');
      }

      // Redireciona para o Stripe Checkout
      const stripe = await stripePromise;
      if (stripe && data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
      setLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">CHECKOUT</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Resumo do pedido */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4 pb-4 border-b border-neutral-200 last:border-0">
                  <div className="relative w-20 h-20 bg-neutral-100 rounded">
                    <Image
                      src={item.product.images[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.product.name}</h3>
                    {item.size && (
                      <p className="text-xs text-neutral-600 mt-1">Tamanho: {item.size}</p>
                    )}
                    <p className="text-xs text-neutral-600 mt-1">Quantidade: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      R$ {item.product.price.toFixed(2)} cada
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo do pagamento */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Resumo</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Frete</span>
                <span className="font-semibold text-green-600">GRÁTIS</span>
              </div>
              <div className="border-t border-neutral-200 pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-yellow-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Método de Pagamento</h3>
              <div className="space-y-3">
                <label className={'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ' + (paymentMethod === 'card' ? 'border-yellow-400 bg-yellow-50' : 'border-neutral-200 hover:border-neutral-300')}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'pix')}
                    className="w-4 h-4 text-yellow-400"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">Cartão de Crédito</div>
                    <div className="text-xs text-neutral-600">Processamento instantâneo</div>
                  </div>
                  <div className="text-2xl">💳</div>
                </label>

                <label className={'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ' + (paymentMethod === 'pix' ? 'border-yellow-400 bg-yellow-50' : 'border-neutral-200 hover:border-neutral-300')}>
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'pix')}
                    className="w-4 h-4 text-yellow-400"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">PIX</div>
                    <div className="text-xs text-neutral-600">Aprovação em até 1 hora</div>
                  </div>
                  <div className="text-2xl">📱</div>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  PROCESSANDO...
                </>
              ) : (
                paymentMethod === 'pix' ? 'PAGAR COM PIX' : 'PAGAR COM CARTÃO'
              )}
            </button>

            <p className="text-xs text-neutral-500 text-center mt-4">
              Pagamento seguro processado pelo Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
