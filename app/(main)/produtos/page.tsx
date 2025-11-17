import { FilterDrawer, FilterSidebar } from '@/components/products/filter-sidebar';
import { ProductCard } from '@/components/products/product-card';
import { NewReleaseMobileCard } from '@/components/products/new-release-mobile-card';
import { LayoutToggle } from '@/components/products/layout-toggle';
import { getProducts } from '@/lib/supabase-server';
import type { Size } from '@/types/index';

interface ProductsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const ALLOWED_SIZES: readonly Size[] = ['P', 'M', 'G', 'GG'];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const categoryFilter =
    typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';
  const priceFilter = typeof resolvedSearchParams.price === 'string' ? resolvedSearchParams.price : '';
  const sizeFilter =
    typeof resolvedSearchParams.size === 'string' ? resolvedSearchParams.size : undefined;
  const featuredOnly = resolvedSearchParams.featured === 'true';
  const size = ALLOWED_SIZES.find((allowedSize) => allowedSize === sizeFilter);

  const allProducts = await getProducts();
  const priceRange = parsePriceRange(priceFilter);
  const layoutMode = resolvedSearchParams.layout === 'single' ? 'single' : 'grid';

  const filtered = allProducts.filter((product) => {
    const normalizedName = product.name.toLowerCase();
    const matchesQuery = !query || normalizedName.includes(query.toLowerCase());

    const productCategorySlug = slugify(product.category);
    const matchesCategory = !categoryFilter || productCategorySlug === categoryFilter;

    const matchesSize = !size || (product.sizes ?? []).includes(size);

    const matchesPrice =
      !priceRange || (product.price >= priceRange.min && product.price <= priceRange.max);

    const matchesFeatured = !featuredOnly || Boolean(product.featured);

    return matchesQuery && matchesCategory && matchesSize && matchesPrice && matchesFeatured;
  });

  return (
    <div className="bg-background pt-36 lg:pt-44">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-3 sm:px-4 lg:flex-row lg:gap-12">
        <FilterSidebar />
        <section className="flex-1 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Catálogo Parallel</p>
              <h1 className="text-3xl font-bold uppercase tracking-[0.4em]">Produtos</h1>
              {query && <p className="text-sm text-accent">Buscando por: {query}</p>}
              <p className="text-xs uppercase tracking-[0.35em] text-accent">
                {filtered.length} produtos encontrados
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <LayoutToggle />
              <FilterDrawer />
            </div>
          </div>
          {layoutMode === 'single' ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
                {filtered.map((product) => (
                  <NewReleaseMobileCard key={product.id} product={product} />
                ))}
              </div>
              <div className="hidden gap-5 md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                {filtered.map((product, index) => (
                  <ProductCard key={product.id} product={product} priority={index === 0} />
                ))}
              </div>
            </>
          )}
          {filtered.length === 0 && (
            <div className="rounded-3xl border border-black/10 bg-white p-8 text-center text-sm text-accent">
              Nenhum produto encontrado.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function parsePriceRange(value?: string) {
  if (!value) return null;
  if (value.endsWith('+')) {
    const min = Number(value.replace('+', '')) || 0;
    return { min, max: Number.POSITIVE_INFINITY };
  }
  const [rawMin, rawMax] = value.split('-').map((entry) => Number(entry));
  if (Number.isNaN(rawMin) && Number.isNaN(rawMax)) return null;
  const min = Number.isNaN(rawMin) ? 0 : rawMin;
  const max = Number.isNaN(rawMax) ? Number.POSITIVE_INFINITY : rawMax;
  return { min, max };
}

function slugify(value?: string) {
  if (!value) return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
