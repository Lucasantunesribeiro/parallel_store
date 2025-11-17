import type { Product } from '@/types/index';
import { ProductCard } from './product-card';
import { NewReleaseMobileCard } from './new-release-mobile-card';

interface ProductGridProps {
  title: string;
  products: Product[];
  eyebrow?: string;
  variant?: 'default' | 'new-release';
}

export function ProductGrid({ title, products, eyebrow, variant = 'default' }: ProductGridProps) {
  const isNewReleaseVariant = variant === 'new-release';

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-accent">{eyebrow}</p>}
          <h2 className="text-3xl font-bold uppercase tracking-[0.4em]">{title}</h2>
        </div>
        <span className="text-xs uppercase tracking-[0.4em] text-accent">Imersão visual em alta resolução</span>
      </div>
      {isNewReleaseVariant ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {products.map((product) => (
              <NewReleaseMobileCard key={product.id} product={product} />
            ))}
          </div>
          <div className="hidden gap-5 sm:gap-6 md:gap-8 md:grid md:grid-cols-2">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 2} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:gap-6 md:gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      )}
    </section>
  );
}
