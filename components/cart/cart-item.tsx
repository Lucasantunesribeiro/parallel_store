"use client";

import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";

import type { CartItem } from '@/types/index';
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemProps) {
  const updateQty = useCartStore((state) => state.updateQty);
  const remove = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 border-b border-white/10 pb-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white/5">
        <Image src={item.product.images[0] ?? "/logo.png"} alt={item.product.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {item.size ?? "Unissex"}
            </p>
          </div>
          <button onClick={() => remove(item.product.slug, item.size)} aria-label="Remover" className="text-white/60 transition hover:text-white">
            <Trash className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-white">
            <button onClick={() => updateQty(item.product.slug, item.size, item.quantity - 1)} aria-label="Diminuir">
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button onClick={() => updateQty(item.product.slug, item.size, item.quantity + 1)} aria-label="Aumentar">
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span>{formatCurrency(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
