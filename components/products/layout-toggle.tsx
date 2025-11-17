"use client";

import { LayoutGrid, Rows } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

type LayoutMode = "grid" | "single";

export function LayoutToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode: LayoutMode = searchParams?.get("layout") === "single" ? "single" : "grid";

  const updateMode = (nextMode: LayoutMode) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (nextMode === "grid") {
      params.delete("layout");
    } else {
      params.set("layout", "single");
    }
    router.push(params.toString() ? `/produtos?${params}` : "/produtos", { scroll: false });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white px-1 py-1 text-black shadow-sm">
      <ToggleButton
        icon={<LayoutGrid className="h-3.5 w-3.5" />}
        label="2 em 2"
        active={mode === "grid"}
        onClick={() => updateMode("grid")}
      />
      <ToggleButton
        icon={<Rows className="h-3.5 w-3.5" />}
        label="1 coluna"
        active={mode === "single"}
        onClick={() => updateMode("single")}
      />
    </div>
  );
}

function ToggleButton({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition",
        active ? "bg-black text-white" : "text-neutral-500 hover:text-black",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
