"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { SPOTLIGHT_BANNERS } from '@/lib/constants';

export function SpotlightBanners() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const offset = container.clientWidth * 0.9;
    container.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Coleções em destaque</p>
          <h2 className="text-3xl font-bold uppercase tracking-[0.4em]">Shop the Drop</h2>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Atualizado em tempo real</p>
      </div>

      <div className="relative lg:hidden">
        <div ref={mobileScrollRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6">
          {SPOTLIGHT_BANNERS.map((banner, index) => (
            <Link
              key={banner.title}
              href={banner.href}
              className="group relative min-w-[85vw] snap-center overflow-hidden rounded-[32px]"
            >
              <div className="relative h-[75vh] min-h-[480px]">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  quality={95}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1023px) 90vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/70">{banner.subtitle}</p>
                  <h3 className="text-3xl font-bold uppercase tracking-[0.2em]">{banner.title}</h3>
                  <span className="mt-4 text-xs uppercase tracking-[0.4em]">Explorar</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 flex items-center justify-between px-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="pointer-events-auto rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:border-white"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="pointer-events-auto rounded-full border border-white/20 bg-black/60 p-2 text-white transition hover:border-white"
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden gap-2 sm:gap-4 lg:grid lg:grid-cols-3">
        {SPOTLIGHT_BANNERS.map((banner) => (
          <Link key={banner.title} href={banner.href} className="group relative block overflow-hidden rounded-[48px]">
            <div className="relative min-h-[80vh]">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                quality={95}
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{banner.subtitle}</p>
                <h3 className="text-3xl font-bold uppercase tracking-[0.2em]">{banner.title}</h3>
                <span className="mt-4 text-xs uppercase tracking-[0.4em]">Explorar</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
