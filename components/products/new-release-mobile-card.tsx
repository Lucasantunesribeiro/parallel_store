import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types/index';

interface NewReleaseMobileCardProps {
  product: Product;
}

export function NewReleaseMobileCard({ product }: NewReleaseMobileCardProps) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      aria-label={`Abrir detalhes do produto ${product.name}`}
      className="group flex flex-col gap-2 text-primary"
    >
      <div className="relative rounded-[28px] bg-background-muted">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 45vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            priority={false}
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-primary shadow-panel transition hover:bg-background-muted"
        >
          <Heart className="h-4 w-4" />
        </span>
      </div>
      <div className="space-y-1 text-primary">
        <p className="text-[10px] uppercase tracking-[0.35em] text-accent">{product.category}</p>
        <p className="text-sm font-semibold leading-snug">{product.name}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-semibold">{formatCurrency(product.price)}</span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-accent/70">Pix ou cartão</span>
        </div>
      </div>
    </Link>
  );
}
