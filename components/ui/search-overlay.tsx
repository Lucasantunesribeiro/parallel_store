"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const TOP_TERMS = ["Parallel Drop 01", "Calças cargo", "Boné grafite", "Moletom oversized", "Linha Cassete"];
const RECENT_TERMS = ["Air Parallel", "Sneakers urbanos"];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  const submit = () => {
    if (!term.trim()) return;
    router.push(`/produtos?query=${encodeURIComponent(term.trim())}`);
    onClose();
  };

  const handleSuggestion = (value: string) => {
    setTerm(value);
    router.push(`/produtos?query=${encodeURIComponent(value)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex cursor-pointer items-start justify-center bg-black/80 px-4 py-10 sm:py-16"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            className="w-full max-w-4xl cursor-auto overflow-hidden rounded-[32px] bg-white text-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            ref={containerRef}
          >
            <div className="flex flex-col gap-4 border-b border-neutral-200 px-6 py-4 sm:flex-row sm:items-center">
              <Link href="/" className="flex items-center" aria-label="Parallel Store">
                <Image src="/logo.png" alt="Parallel Store" width={120} height={40} className="h-8 w-auto object-contain" />
              </Link>
              <form
                className="flex flex-1 items-center gap-3 rounded-full border border-neutral-300 bg-neutral-100 px-4 py-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  submit();
                }}
              >
                <Search className="h-5 w-5 text-neutral-500" />
                <input
                  autoFocus
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Buscar produtos, drops ou categorias"
                  className="flex-1 bg-transparent text-xs uppercase tracking-[0.35em] text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
                >
                  Buscar
                </button>
              </form>
              <button onClick={onClose} className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-500 hover:text-black">
                Cancelar
              </button>
            </div>

            <div className="grid gap-10 px-6 py-8 sm:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Termos mais buscados</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {TOP_TERMS.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-700 transition hover:border-neutral-900 hover:text-black"
                      onClick={() => handleSuggestion(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Recentes</p>
                {RECENT_TERMS.length === 0 ? (
                  <p className="text-sm text-neutral-500">Nenhuma busca recente.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {RECENT_TERMS.map((item) => (
                      <li key={item}>
                        <button className="hover:text-black" onClick={() => handleSuggestion(item)}>
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
