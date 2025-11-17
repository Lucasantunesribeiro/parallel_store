'use client';

import { useState } from 'react';

import type { Product } from '@/types/index';
import { useCartStore } from '@/store/cart-store';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [size, setSize] = useState(product.sizes[0]);
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggle);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold">Tamanho</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.sizes.map((entry) => (
            <button
              key={entry}
              className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.3em] ${size === entry ? 'border-secondary text-secondary' : 'border-black/10 text-accent'}`}
              onClick={() => setSize(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>
      <button
        className="w-full rounded-full bg-secondary px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-black"
        onClick={() => {
          addItem(product, size);
          toggleCart(true);
        }}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
