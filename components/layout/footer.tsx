import Link from 'next/link';

const columns = [
  {
    title: 'Loja',
    items: [
      { label: 'Coleções', href: '/produtos' },
      { label: 'Lançamentos', href: '/produtos?featured=true' },
      { label: 'Lookbook', href: '/categorias/lifestyle' },
    ],
  },
  {
    title: 'Suporte',
    items: [
      { label: 'Pedidos', href: '/carrinho' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contato', href: '/contato' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'Instagram', href: 'https://instagram.com/parallel.store' },
      { label: 'TikTok', href: 'https://tiktok.com/@parallel' },
      { label: 'YouTube', href: 'https://youtube.com/@parallelstore' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-background-muted">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-accent">Parallel Store</p>
          <p className="mt-4 text-sm text-accent">
            Entre o comum e o paralelo, nasce o seu estilo. Rua Augusta, 420, Rio de Janeiro - RJ.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-accent">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 px-4 py-6 text-center text-xs text-accent">
        © {new Date().getFullYear()} Parallel Store. Todos os direitos reservados.
      </div>
    </footer>
  );
}
