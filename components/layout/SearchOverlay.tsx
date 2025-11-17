'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, X, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Popular searches (mock data)
  const popularSearches = [
    'Camisetas oversized',
    'Calças cargo',
    'Bonés snapback',
    'Moletons',
    'Tênis street',
  ]

  // Recent searches (mock - should come from localStorage)
  const [recentSearches] = useState([
    'Camiseta preta',
    'Jaqueta jeans',
  ])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // TODO: Implement actual search logic
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white border-b border-neutral-200">
              <div className="max-w-4xl mx-auto px-6 py-6">
                <div className="flex items-center gap-4">
                  {/* Search Form */}
                  <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Buscar produtos, categorias..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-4 py-4 bg-neutral-100 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                      />
                    </div>
                  </form>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-3 hover:bg-neutral-100 rounded-full transition-colors"
                    aria-label="Fechar busca"
                  >
                    <X className="w-6 h-6 text-neutral-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="max-w-4xl mx-auto px-6 py-8">
                {searchQuery.trim() === '' ? (
                  <div className="space-y-8">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                          Buscas Recentes
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(search)}
                              className="px-4 py-2 bg-neutral-100 hover:bg-yellow-400 hover:text-black rounded-full text-sm font-medium transition-all duration-200"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Buscas Populares
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="px-4 py-2 bg-neutral-100 hover:bg-yellow-400 hover:text-black rounded-full text-sm font-medium transition-all duration-200"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories Quick Access */}
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                        Categorias
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {['Camisetas', 'Calças', 'Bonés', 'Acessórios'].map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              // TODO: Navigate to category
                              onClose()
                            }}
                            className="p-4 bg-neutral-100 hover:bg-yellow-400 hover:text-black rounded-lg text-center font-medium transition-all duration-200 group"
                          >
                            <div className="text-lg mb-1 group-hover:scale-110 transition-transform">
                              {category === 'Camisetas' && '👕'}
                              {category === 'Calças' && '👖'}
                              {category === 'Bonés' && '🧢'}
                              {category === 'Acessórios' && '🎒'}
                            </div>
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                      Resultados para "{searchQuery}"
                    </h3>
                    {/* TODO: Implement search results */}
                    <p className="text-neutral-600">
                      Implementar resultados da busca aqui...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchOverlay
