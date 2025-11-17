import type { Metadata } from 'next';
import { Space_Grotesk, Archivo_Black } from 'next/font/google';
import clsx from 'clsx';

import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const archivo = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-archivo' });

export const metadata: Metadata = {
  title: 'Parallel Store',
  description: 'Entre o comum e o paralelo, nasce o seu estilo. Parallel Store é o seu destino urbano.',
  metadataBase: new URL('https://parallel.store'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Parallel Store',
    description: 'Loja urbana inspirada no Rio de Janeiro.',
    url: 'https://parallel.store',
    siteName: 'Parallel Store',
    images: [{ url: '/logo.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@parallel.store',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={clsx(space.variable, archivo.variable)}>
      <body className="bg-background text-primary antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
