'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, FormEvent, useMemo, useState, useEffect } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';

import { NAV_LINKS } from '@/lib/constants';
import { useCartStore } from '@/store/cart-store';
import { SearchOverlay } from '@/components/ui/search-overlay';
import { useAuthStore } from '@/store/auth-store';

const UTILITY_LINKS = [
  { label: 'Ajuda', href: '/ajuda' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Junte-se a nós', href: '/junte-se-a-nos' },
  { label: 'Entrar', href: '/login', highlight: true },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const toggleCart = useCartStore((state) => state.toggle);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOut);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (href: string) => pathname?.startsWith(href);
  const navLinks = useMemo(() => NAV_LINKS, []);

  const utilityLinks = useMemo(
    () =>
      isAuthenticated
        ? [
            { label: 'Ajuda', href: '/ajuda' },
            { label: 'Sobre', href: '/sobre' },
            { label: 'Junte-se a nós', href: '/junte-se-a-nos' },
            { label: 'Minha conta', href: '/conta' },
            { label: 'Sair', action: 'logout' as const },
          ]
        : UTILITY_LINKS,
    [isAuthenticated],
  );
  const ensureAuth = (next?: () => void) => {
    if (!isAuthenticated) {
      router.push('/login');
      return false;
    }
    next?.();
    return true;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <TopHeader utilityLinks={utilityLinks} signOut={signOut} />
      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          isScrolled ? 'bg-[#e8e8e8] border-neutral-300 shadow-md' : 'bg-[#e8e8e8]/95 border-neutral-200'
        }`}
      >
        <div className="mx-auto w-full max-w-[1920px] px-3 sm:px-4 lg:px-8">
          <div className="hidden h-20 items-center justify-between lg:flex">
            <Link href="/" className="flex items-center" aria-label="Parallel Store">
              <Image
                src="/logo.png"
                alt="Parallel Store"
                width={640}
                height={120}
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>
            <nav className="flex flex-1 items-center justify-center gap-8 text-xs font-semibold uppercase tracking-[0.4em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pb-1 transition-colors ${
                    isActive(link.href) ? 'text-yellow-500' : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700 transition hover:border-neutral-900 hover:text-black"
                aria-label="Buscar produtos"
              >
                <Search className="h-4 w-4" />
                Buscar
              </button>
              <button
                onClick={() => ensureAuth(() => router.push('/favoritos'))}
                className="hidden items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-700 transition hover:border-neutral-900 hover:text-black xl:flex"
                aria-label="Favoritos"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </button>
              <button
                onClick={() => ensureAuth(() => toggleCart(true))}
                className="relative flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-yellow-500"
                aria-label="Abrir sacola"
              >
                <ShoppingBag className="h-4 w-4" />
                Sacola
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-semibold text-yellow-400">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          <MobileHeaderBar
            onMenuOpen={() => setMobileOpen(true)}
            onCartOpen={() => ensureAuth(() => toggleCart(true))}
            onFavorites={() => ensureAuth(() => router.push('/favoritos'))}
            onSearchOpen={() => setSearchOpen(true)}
            totalItems={totalItems}
          />
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} utilityLinks={utilityLinks} signOut={signOut} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MobileHeaderBar({
  onMenuOpen,
  onCartOpen,
  onSearchOpen,
  onFavorites,
  totalItems,
}: {
  onMenuOpen: () => void;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  onFavorites: () => void;
  totalItems: number;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchOpen();
  };

  return (
    <div className="flex flex-col gap-3 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Parallel Store">
          <Image
            src="/logo.png"
            alt="Parallel Store"
            width={400}
            height={70}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={onFavorites}
            className="rounded-full border border-neutral-300 p-2 text-neutral-700 transition hover:border-neutral-900 hover:text-black"
            aria-label="Favoritos"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            onClick={onCartOpen}
            className="relative rounded-full border border-neutral-300 p-2 text-neutral-700 transition hover:border-neutral-900 hover:text-black"
            aria-label="Abrir sacola"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[0.6rem] font-semibold text-black">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={onMenuOpen}
            className="rounded-full border border-neutral-300 p-2 text-neutral-700 transition hover:border-neutral-900 hover:text-black"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-[28px] border border-neutral-300 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-700"
      >
        <Search className="h-4 w-4 text-neutral-600" />
        <input
          type="search"
          readOnly
          className="flex-1 bg-transparent text-xs uppercase tracking-[0.4em] placeholder:text-neutral-500 focus:outline-none"
          placeholder="Buscar tênis, drops e categorias"
          onFocus={onSearchOpen}
        />
        <button
          type="submit"
          className="rounded-full bg-neutral-800 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white"
        >
          Ir
        </button>
      </form>
    </div>
  );
}

function TopHeader({
  utilityLinks,
  signOut,
}: {
  utilityLinks: readonly (
    | { label: string; href: string; highlight?: boolean }
    | { label: string; action: 'logout' }
  )[];
  signOut: () => void;
}) {
  return (
    <div className="hidden border-b border-neutral-300 bg-black text-white lg:block">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-8">
        <div className="flex h-10 items-center justify-end text-[0.58rem] uppercase tracking-[0.45em]">
          <nav className="flex items-center gap-3 text-[0.58rem]">
            {utilityLinks.map((link, index) => (
              <Fragment key={'href' in link ? link.href : link.label}>
                {index > 0 && <div className="h-4 w-px bg-white/20" />}
                {'action' in link && link.action === 'logout' ? (
                  <button
                    onClick={signOut}
                    className="font-semibold tracking-[0.45em] text-white/80 hover:text-white transition"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={'href' in link ? link.href : '/'}
                    className={`font-semibold tracking-[0.45em] transition ${
                      'highlight' in link && link.highlight
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
  utilityLinks,
  signOut,
}: {
  open: boolean;
  onClose: () => void;
  utilityLinks: readonly (
    | { label: string; href: string; highlight?: boolean }
    | { label: string; action: 'logout' }
  )[];
  signOut: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm lg:hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-white" style={{ WebkitTextStroke: '1px white' }}>
              PARALLEL
            </span>
            <span className="font-black text-xl text-yellow-400">STORE</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-8 px-6">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Utility Links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {utilityLinks.map((link) =>
                'action' in link && link.action === 'logout' ? (
                  <button
                    key={link.label}
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={'href' in link ? link.href : link.label}
                    href={'href' in link ? link.href : '/'}
                    onClick={onClose}
                    className={`text-sm font-medium transition-colors ${
                      'highlight' in link && link.highlight
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-white/50 text-center">
            Entre o comum e o paralelo, nasce o seu estilo.
          </p>
        </div>
      </div>
    </div>
  );
}



