'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export default function PedidoConfirmadoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clear);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const orderIdParam = searchParams?.get('order_id');
    if (orderIdParam) {
      setOrderId(orderIdParam);
      clearCart();
    } else {
      // Se não tiver order_id, redireciona para home
      router.push('/');
    }
  }, [searchParams, clearCart, router]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
            <p className="text-neutral-600">
              Seu pagamento foi processado com sucesso
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Package className="h-6 w-6 text-green-700" />
              <h2 className="text-lg font-semibold text-green-900">
                Número do Pedido
              </h2>
            </div>
            <p className="text-2xl font-mono font-bold text-green-700">
              #{orderId.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 rounded-full p-2 mt-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Confirmação por Email</h3>
                <p className="text-sm text-neutral-600">
                  Enviamos um email com os detalhes do seu pedido
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 rounded-full p-2 mt-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Preparação do Pedido</h3>
                <p className="text-sm text-neutral-600">
                  Estamos preparando seus produtos para envio
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 rounded-full p-2 mt-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Código de Rastreamento</h3>
                <p className="text-sm text-neutral-600">
                  Você receberá o código assim que o pedido for enviado
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition text-center"
            >
              VOLTAR PARA LOJA
            </Link>
            <Link
              href="/produtos"
              className="flex-1 border border-neutral-300 font-semibold py-3 rounded-md hover:bg-neutral-50 transition text-center"
            >
              CONTINUAR COMPRANDO
            </Link>
          </div>

          <p className="text-xs text-neutral-500 mt-6">
            Obrigado por comprar na Parallel Store!
          </p>
        </div>
      </div>
    </div>
  );
}
