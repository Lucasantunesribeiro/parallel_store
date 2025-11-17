'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import SearchOverlay from './SearchOverlay'

const MainHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartItemsCount] = useState(0) // TODO: Connect to cart store

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'Lançamentos', href: '/lancamentos' },
    { label: 'Masculino', href: '/masculino' },
    { label: 'Feminino', href: '/feminino' },
    { label: 'Acessórios', href: '/acessorios' },
    { label: 'Sale', href: '/sale', highlight: true },
  ]

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full transition-all duration-300
          ${
            isScrolled
              ? 'bg-white shadow-md border-b border-neutral-200'
              : 'bg-white/95 backdrop-blur-sm'
          }
        `}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo - Horizontal Stretched Version */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0"
              aria-label="Parallel Store - Ir para home"
            >
              <div className="relative w-32 lg:w-48 h-10 lg:h-12">
                {/* Logo Horizontal Customizada */}
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-1">
                    {/* PARALLEL - Outline */}
                    <span
                      className="font-black text-2xl lg:text-3xl tracking-wider"
                      style={{
                        WebkitTextStroke: '1.5px black',
                        WebkitTextFillColor: 'white',
                        textShadow: '0 0 1px rgba(0,0,0,0.3)',
                      }}
                    >
                      PARALLEL
                    </span>

                    {/* STORE - Amarelo Grafite */}
                    <span
                      className="font-black text-2xl lg:text-3xl text-yellow-400 tracking-wide"
                      style={{
                        fontFamily: 'Impact, sans-serif',
                        transform: 'skewY(-2deg)',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                      }}
                    >
                      STORE
                    </span>

                    {/* Estrela */}
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-sm font-medium tracking-wide transition-all duration-200
                    hover:text-yellow-500 relative group
                    ${item.highlight ? 'text-yellow-500' : 'text-neutral-900'}
                  `}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors group"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-neutral-700 group-hover:text-yellow-500 transition-colors" />
              </button>

              {/* Favorites */}
              <button
                className="hidden lg:block p-2 hover:bg-neutral-100 rounded-full transition-colors group"
                aria-label="Favoritos"
              >
                <Heart className="w-5 h-5 text-neutral-700 group-hover:text-yellow-500 transition-colors" />
              </button>

              {/* Cart */}
              <button
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors group"
                aria-label={`Carrinho ${cartItemsCount > 0 ? `com ${cartItemsCount} itens` : 'vazio'}`}
              >
                <ShoppingBag className="w-5 h-5 text-neutral-700 group-hover:text-yellow-500 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      text-base font-medium tracking-wide transition-colors
                      hover:text-yellow-500
                      ${item.highlight ? 'text-yellow-500' : 'text-neutral-900'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default MainHeader
