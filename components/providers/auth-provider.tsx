'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { useCartStore } from '@/store/cart-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize);
  const syncCartWithDb = useCartStore((state) => state.syncCartWithDb);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Sincroniza carrinho quando usuário faz login
  useEffect(() => {
    if (isAuthenticated) {
      syncCartWithDb();
    }
  }, [isAuthenticated, syncCartWithDb]);

  return <>{children}</>;
}
