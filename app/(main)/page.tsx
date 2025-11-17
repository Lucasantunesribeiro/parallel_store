import Image from 'next/image';

import { ProductGrid } from '@/components/products/product-grid';
import { CategoryCard } from '@/components/products/category-card';
import { InstagramGrid } from '@/components/ui/instagram-grid';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import { SpotlightBanners } from '@/components/home/spotlight-banners';
import { HeroShowcase } from '@/components/home/hero-showcase';
import { getCategories, getFeaturedProducts, getProducts } from '@/lib/supabase-server';

export default async function HomePage() {
  const [categories, featured, allProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getProducts(),
  ]);

  const heroProducts = (featured.length ? featured : allProducts).slice(0, 6);

  return (
    <div className="space-y-20 bg-background pt-10 lg:pt-16">
      <HeroShowcase products={heroProducts} />
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-24 px-4 sm:px-6">
        <SpotlightBanners />
        <div id="destaques">
          <ProductGrid
            title="Drops em destaque"
            products={featured}
            eyebrow="Novos lançamentos"
            variant="new-release"
          />
        </div>
        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Categorias</p>
            <h2 className="text-3xl font-bold uppercase tracking-[0.4em]">Construídas no paralelo</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
        <EditorialSection />
        <InstagramGrid />
        <NewsletterForm />
      </div>
    </div>
  );
}

function EditorialSection() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-black/10 bg-white p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Manifesto Parallel</p>
        <h3 className="mt-4 text-3xl font-bold">
          Street culture com narrativa carioca. Drops inspirados pela noite, praia e concreto.
        </h3>
        <p className="mt-4 text-accent">
          Cada drop nasce de colaborações com artistas locais, trazendo estética urbana e performance. Tecidos tecnológicos, modelagens amplas e detalhes utilitários constroem o look Parallel.
        </p>
      </div>
      <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=1200&q=80"
          alt="Editorial"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
          <p className="text-sm uppercase tracking-[0.4em]">Rio Sessions</p>
          <p className="mt-2 text-3xl font-bold">Drop 01 _ Nebula</p>
        </div>
      </div>
    </section>
  );
}
