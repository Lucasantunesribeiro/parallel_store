import { notFound } from 'next/navigation';

import { getProductBySlug } from '@/lib/supabase-server';
import { ProductGallery } from '@/components/products/product-gallery';
import { formatCurrency } from '@/lib/utils';
import { ProductDetailActions } from '@/components/products/product-detail-actions';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background pt-44 lg:pt-52">
      <div className="mx-auto grid w-full max-w-[1920px] gap-12 px-3 sm:px-4 md:grid-cols-2">
        <ProductGallery images={product.images} />
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">{product.category}</p>
            <h1 className="text-4xl font-bold">{product.name}</h1>
          </div>
          <p className="text-accent">{product.description}</p>
          <p className="text-3xl font-semibold">{formatCurrency(product.price)}</p>
          <ProductDetailActions product={product} />
          <ul className="space-y-2 text-sm text-accent">
            <li>• Envio em até 48h para todo o Brasil</li>
            <li>• Pagamentos com Stripe ou Pix</li>
            <li>• Trocas gratuitas em até 30 dias</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
