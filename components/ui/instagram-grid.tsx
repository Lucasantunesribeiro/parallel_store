import Image from 'next/image';

const sources = [
  '/images/social/Produto-1_lacoste.JPG',
  '/images/social/Produto-1_zara.JPG',
  '/images/social/Produto-2_lacoste.JPG',
  '/images/social/Produto-2_zara.JPG',
  '/images/social/Produto-1_lacoste.JPG',
  '/images/social/Produto-2_zara.JPG',
];

const posts = sources.map((src, index) => ({ id: index, src }));

export function InstagramGrid() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-accent">Instagram</p>
          <div className="text-3xl font-bold uppercase tracking-[0.4em]">
            <span className="block sm:inline">@parallel.</span>
            <span className="block sm:inline">store</span>
          </div>
        </div>
        <a
          href="https://www.instagram.com/parallel_store._/"
          target="_blank"
          className="text-xs uppercase tracking-[0.4em] text-secondary"
          rel="noreferrer"
        >
          Seguir
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="group relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={post.src}
              alt="Instagram"
              fill
              quality={95}
              className="object-cover transition duration-500 group-hover:scale-110"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white transition group-hover:bg-black/40">
              ♥
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
