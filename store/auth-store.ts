'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/index';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: Error | null }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isAuthenticated: false,
      loading: true,

      initialize: async () => {
        try {
          // Verifica sessão atual
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            // Tenta buscar perfil, mas não falha se não conseguir (RLS)
            let profile = null;
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (error) {
                console.warn('Aviso ao buscar perfil (continuando autenticado):', error);
              } else {
                profile = data;
              }
            } catch (profileError) {
              console.warn('Perfil não disponível (continuando autenticado):', profileError);
            }

            // Mantém usuário autenticado mesmo sem perfil
            set({
              user: session.user,
              profile: profile,
              isAuthenticated: true,
              loading: false
            });
          } else {
            set({ user: null, profile: null, isAuthenticated: false, loading: false });
          }

          // Listener para mudanças de auth
          supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
              // Tenta buscar perfil, mas não falha se não conseguir
              let profile = null;
              try {
                const { data, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                if (error) {
                  console.warn('Aviso ao buscar perfil (continuando autenticado):', error);
                } else {
                  profile = data;
                }
              } catch (profileError) {
                console.warn('Perfil não disponível (continuando autenticado):', profileError);
              }

              // Mantém usuário autenticado mesmo sem perfil
              set({
                user: session.user,
                profile: profile,
                isAuthenticated: true
              });
            } else {
              set({ user: null, profile: null, isAuthenticated: false });
            }
          });
        } catch (error) {
          console.error('Erro ao inicializar auth:', error);
          set({ loading: false });
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });

          if (error) return { error };

          if (data.user) {
            // Tenta buscar perfil, mas não falha se não conseguir
            let profile = null;
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

              if (profileError) {
                console.warn('Aviso ao buscar perfil após signup (continuando):', profileError);
              } else {
                profile = profileData;
              }
            } catch (profileError) {
              console.warn('Perfil não disponível após signup (continuando):', profileError);
            }

            set({
              user: data.user,
              profile: profile,
              isAuthenticated: true
            });
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) return { error };

          if (data.user) {
            // Tenta buscar perfil, mas não falha se não conseguir
            let profile = null;
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

              if (profileError) {
                console.warn('Aviso ao buscar perfil após login (continuando):', profileError);
              } else {
                profile = profileData;
              }
            } catch (profileError) {
              console.warn('Perfil não disponível após login (continuando):', profileError);
            }

            set({
              user: data.user,
              profile: profile,
              isAuthenticated: true
            });
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null, isAuthenticated: false });
      },

      updateProfile: async (data: Partial<Profile>) => {
        const { user } = get();
        if (!user) return { error: new Error('Não autenticado') };

        try {
          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);

          if (error) return { error: new Error(error.message) };

          // Tenta atualizar o perfil local, mas não falha se não conseguir
          try {
            const { data: updatedProfile, error: fetchError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            if (fetchError) {
              console.warn('Aviso ao buscar perfil atualizado (continuando):', fetchError);
            } else {
              set({ profile: updatedProfile });
            }
          } catch (profileError) {
            console.warn('Perfil atualizado não disponível (continuando):', profileError);
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },
    }),
    {
      name: 'parallel-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        // Não persiste user e profile por segurança
      }),
    },
  ),
);
