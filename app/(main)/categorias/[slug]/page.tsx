import Image from 'next/image';

import { getCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/supabase-server';
import { CategoryCard } from '@/components/products/category-card';
import { ProductCard } from '@/components/products/product-card';
import { NewReleaseMobileCard } from '@/components/products/new-release-mobile-card';
import type { Product, Category } from '@/types/index';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, items, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories(),
  ]);

  if (!category) {
    return (
      <div className="pt-32 text-center">Categoria não encontrada.</div>
    );
  }

  return (
    <div className="bg-background pt-44 lg:pt-52">
      <div className="relative mx-auto w-full max-w-[1920px] px-3 sm:px-4">
        <div className="relative h-80 overflow-hidden rounded-3xl">
          <Image src={category.image_url ?? '/logo.png'} alt={category.name} fill className="object-cover" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/35 to-transparent px-6 py-10 backdrop-blur-[1px]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.5em] text-[#fcd34d] drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)]">
              Categoria
            </p>
            <h1 className="text-5xl font-bold text-[#fde047] drop-shadow-[0_5px_18px_rgba(0,0,0,0.75)] lg:text-6xl">
              {category.name}
            </h1>
          </div>
        </div>
        <div className="mt-12 space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {items.map((product: Product) => (
              <NewReleaseMobileCard key={product.id} product={product} />
            ))}
          </div>
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product: Product, index: number) => (
              <ProductCard key={product.id} product={product} priority={index === 0} />
            ))}
          </div>
        </div>
        {items.length === 0 && (
          <div className="mt-12 rounded-3xl border border-black/10 bg-white p-8 text-center text-sm text-accent">
            Em breve novos drops nesta categoria.
          </div>
        )}
        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Outras categorias</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {allCategories
              .filter((item: Category) => item.slug !== category.slug)
              .map((cat: Category) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
