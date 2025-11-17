'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import { Package, LogOut, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const signOut = useAuthStore((state) => state.signOut);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !profile?.is_admin)) {
      router.push('/login');
    }
  }, [isAuthenticated, profile, loading, router]);

  if (loading || !isAuthenticated || !profile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-neutral-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-yellow-400">ADMIN</h1>
          <p className="text-xs text-neutral-400 mt-1">Parallel Store</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition"
          >
            <Package className="h-5 w-5" />
            <span>Pedidos</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition"
          >
            <Home className="h-5 w-5" />
            <span>Voltar para Loja</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-neutral-700 pt-4">
            <p className="text-sm font-semibold mb-1">{profile.full_name || 'Admin'}</p>
            <p className="text-xs text-neutral-400 mb-3">{user?.email}</p>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
