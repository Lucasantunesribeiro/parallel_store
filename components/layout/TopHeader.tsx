'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const TopHeader = () => {
  return (
    <div className="bg-black text-white border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 text-xs lg:text-sm">
          {/* Left Side - Empty for balance */}
          <div className="flex-1" />

          {/* Center/Right - Navigation Links */}
          <nav className="flex items-center gap-3 lg:gap-4">
            <Link
              href="/acompanhar-pedido"
              className="text-white/90 hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
            >
              Acompanhar Pedido
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link
              href="/ajuda"
              className="text-white/90 hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
            >
              Ajuda
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link
              href="/sobre"
              className="text-white/90 hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
            >
              Sobre
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link
              href="/cadastro"
              className="flex items-center gap-1 text-white/90 hover:text-yellow-400 transition-colors duration-200 font-medium tracking-wide"
            >
              Junte-se a nós
              <ChevronRight className="w-3 h-3" />
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link
              href="/login"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-semibold tracking-wide"
            >
              Entrar
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
