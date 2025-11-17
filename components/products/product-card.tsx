"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import type { Product } from "@/types/index";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggle);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNavigate = () => {
    router.push(`/produtos/${product.slug}`);
  };

  const handleBuyNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addItem(product);
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    toggleCart(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <motion.article
      whileHover={{ scale: 0.99 }}
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[28px] sm:aspect-auto sm:h-[520px] sm:rounded-[40px]"
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalhes do produto ${product.name}`}
    >
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        quality={95}
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 45vw, 100vw"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      {product.featured && (
        <span className="pointer-events-none absolute left-6 top-6 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black">
          Drop exclusivo
        </span>
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white sm:p-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70 sm:text-xs">{product.category}</p>
        <h3 className="mt-2 text-lg font-bold uppercase leading-snug tracking-[0.15em] sm:text-3xl">{product.name}</h3>
        <p className="mt-1 text-base sm:mt-2 sm:text-lg">{formatCurrency(product.price)}</p>
        <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
          <button
            onClick={handleBuyNow}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-black transition sm:px-5 sm:py-3 sm:text-xs sm:tracking-[0.3em]"
          >
            <Plus className="h-4 w-4" /> Comprar agora
          </button>
        </div>
      </div>
    </motion.article>
  );
}
