'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { Product } from '@/types/index';
import { formatCurrency } from '@/lib/utils';

interface HeroShowcaseProps {
  products: Product[];
}

const AUTOPLAY_INTERVAL = 6000;

const containerVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export function HeroShowcase({ products }: HeroShowcaseProps) {
  const items = useMemo(() => (products.length > 0 ? products : []), [products]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  const active = items[index];

  const goToIndex = (next: number) => {
    setIndex(next);
  };

  return (
    <section className="relative overflow-hidden bg-[#040404] text-white">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(circle at 90% 10%, rgba(255,215,0,0.12), transparent 55%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-18">
        <div className="space-y-6 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[0.6rem] uppercase tracking-[0.5em] text-white/60 lg:justify-start">
            <span className="rounded-full border border-white/20 px-4 py-1 text-white">Parallel Store</span>
            <span>Rio de Janeiro · Brasil</span>
            <span className="text-secondary">Carrossel de drops</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-[0.2em] text-white sm:text-5xl md:text-7xl">
              Entre o comum <span className="text-secondary">e o paralelo</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg lg:mx-0">
              Descubra os lançamentos que conectam o concreto do Rio com o lifestyle urbano.
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-info`}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-[28px] border border-white/15 bg-white/5 p-5 text-left text-white/85 lg:max-w-md"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-secondary">Drop em destaque</p>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xl font-semibold text-white sm:text-2xl">{active.name}</p>
                <span className="text-sm text-white/70">{formatCurrency(active.price)}</span>
              </div>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{active.description}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/produtos/${active.slug}`}
                  className="rounded-full bg-secondary px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_12px_35px_rgba(255,215,0,0.35)] transition hover:bg-secondary/90"
                >
                  Comprar agora
                </Link>
                <a
                  href="#destaques"
                  className="rounded-full border border-white/40 px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white"
                >
                  Ver drops
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-2 lg:justify-start">
            {items.map((item, idx) => (
              <button
                key={item.id}
                className={`h-2 w-8 rounded-full transition ${idx === index ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Mostrar ${item.name}`}
              />
            ))}
          </div>
        </div>
        <Link
          href={`/produtos/${active.slug}`}
          className="relative block min-h-[62vh] w-full overflow-hidden rounded-[36px] border border-white/10 bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/80"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={active.images[0]}
                alt={active.name}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 55vw, 100vw"
                priority
                quality={95}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{active.category}</p>
                <p className="text-2xl font-semibold">{active.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          {items.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={`${item.id}-image-indicator`}
                  className={`h-2 w-2 rounded-full transition ${idx === index ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
                  onClick={(event) => {
                    event.preventDefault();
                    goToIndex(idx);
                  }}
                  aria-label={`Mostrar visual do ${item.name}`}
                />
              ))}
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
