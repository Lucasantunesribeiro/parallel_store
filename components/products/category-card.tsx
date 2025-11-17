import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/types/index';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categorias/${category.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-black/10"
    >
      <div className="relative h-64">
        <Image
          src={category.image_url ?? '/logo.png'}
          alt={category.name}
          fill
          quality={95}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-[#facc15] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Categoria
        </p>
        <p className="text-2xl font-semibold text-[#facc15] drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">{category.name}</p>
        <span className="text-xs uppercase tracking-[0.4em] text-white/80">Explorar</span>
      </div>
    </Link>
  );
}
