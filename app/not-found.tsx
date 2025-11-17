import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-24 text-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-secondary">Erro 404</p>
        <h1 className="mt-4 text-5xl font-black uppercase tracking-[0.3em]">Paralelo não encontrado</h1>
        <p className="mt-4 text-white/70">
          A página que você tentou acessar se perdeu entre as camadas do nosso universo urbano.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90"
          >
            Voltar para a home
          </Link>
          <Link
            href="/produtos"
            className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 hover:border-white hover:text-white"
          >
            Explorar produtos
          </Link>
        </div>
      </div>
    </div>
  );
}
