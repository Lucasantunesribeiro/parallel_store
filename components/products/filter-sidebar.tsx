"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORY_OPTIONS = [
  { label: "Casacos", value: "casacos" },
  { label: "Casual urbano", value: "casual-urbano" },
  { label: "Esportivo", value: "esportivo" },
  { label: "Social", value: "social" },
] as const;

const PRICE_OPTIONS = [
  { label: "Até R$ 400", value: "0-400" },
  { label: "R$ 400 — R$ 700", value: "400-700" },
  { label: "Acima de R$ 700", value: "700+" },
] as const;

const SIZE_OPTIONS = ["P", "M", "G", "GG"] as const;

type FilterKey = "category" | "price" | "size";

interface FilterState {
  category?: string;
  price?: string;
  size?: string;
}

export function FilterSidebar() {
  const filter = useProductFilters();

  return (
    <aside className="hidden w-full max-w-xs shrink-0 lg:block">
      <div className="sticky top-32 space-y-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Filtros</p>
          <button
            type="button"
            onClick={filter.clearFilters}
            disabled={!filter.hasActive}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-500 transition hover:text-black disabled:opacity-40"
          >
            Limpar
          </button>
        </div>
        <FilterSections {...filter} />
      </div>
    </aside>
  );
}

export function FilterDrawer() {
  const filter = useProductFilters();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-white/10 bg-white p-6 text-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Filtros</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={filter.clearFilters}
                  disabled={!filter.hasActive}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-neutral-500 transition hover:text-black disabled:opacity-40"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-black/10 p-2 text-neutral-600 transition hover:text-black"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <FilterSections {...filter} />
          </div>
        </div>
      )}
    </>
  );
}

function FilterSections({ current, toggleParam }: FilterHook) {
  return (
    <div className="space-y-6 text-sm">
      <FilterSection title="Categorias" description="Selecione apenas uma">
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={current.category === option.value}
              onClick={() => toggleParam("category", option.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Faixa de preço" description="Defina o orçamento">
        <div className="flex flex-wrap gap-2">
          {PRICE_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              active={current.price === option.value}
              onClick={() => toggleParam("price", option.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tamanho" description="Disponível imediata">
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <FilterChip
              key={size}
              label={size}
              active={current.size === size}
              onClick={() => toggleParam("size", size)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">{title}</p>
        {description && <p className="text-[0.7rem] uppercase tracking-[0.3em] text-neutral-400">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.35em] transition ${
        active ? "border-black bg-black text-white" : "border-black/15 text-neutral-600 hover:border-black/40 hover:text-black"
      }`}
    >
      {label}
    </button>
  );
}

function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current: FilterState = {
    category: searchParams?.get("category") ?? undefined,
    price: searchParams?.get("price") ?? undefined,
    size: searchParams?.get("size") ?? undefined,
  };

  const updateRoute = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `/produtos?${query}` : "/produtos", { scroll: false });
  };

  const toggleParam = (key: FilterKey, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (!value || params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    updateRoute(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());
    (["category", "price", "size"] as FilterKey[]).forEach((key) => params.delete(key));
    updateRoute(params);
  };

  const hasActive = Boolean(current.category || current.price || current.size);

  return { current, toggleParam, clearFilters, hasActive };
}

type FilterHook = ReturnType<typeof useProductFilters>;
