"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { CartItemRow } from "./cart-item";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const open = useCartStore((state) => state.open);
  const toggle = useCartStore((state) => state.toggle);
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (open && !isAuthenticated) {
      toggle(false);
      router.push("/login");
    }
  }, [open, isAuthenticated, toggle, router]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/70" onClick={() => toggle(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#030303] text-white shadow-panel"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <p className="text-sm uppercase tracking-[0.4em]">Carrinho</p>
              <button onClick={() => toggle(false)} className="text-white/60 transition hover:text-white">
                Fechar
              </button>
            </div>
            <div className="flex h-[calc(100vh-210px)] flex-col gap-6 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-white/60">Seu carrinho está vazio.</p>
              ) : (
                items.map((item) => <CartItemRow key={`${item.product.slug}-${item.size}`} item={item} />)
              )}
            </div>
            <div className="border-t border-white/10 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p className="mt-2 text-xs text-white/60">Frete calculado no checkout. Pagamento seguro via Stripe.</p>
              <Link
                href="/carrinho"
                onClick={() => toggle(false)}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-secondary px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90"
              >
                Finalizar compra
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
