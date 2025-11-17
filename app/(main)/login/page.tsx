'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;
    login();
    router.push('/favoritos');
  };

  return (
    <div className="relative bg-[#050505] pt-24 pb-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.08),_transparent_45%)]" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-5 lg:flex-row lg:px-10">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-secondary">Parallel Members</p>
          <h1 className="text-4xl font-black uppercase tracking-[0.2em]">Bem-vindo de volta</h1>
          <p className="text-base text-white/70">
            Entre para acompanhar drops, salvar favoritos e acessar experiências exclusivas no universo Parallel.
          </p>
          <div className="rounded-[40px] border border-white/10 bg-white/10 p-8 text-white/80 shadow-[0_15px_60px_rgba(0,0,0,0.4)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.5em] text-secondary">Clube Parallel</p>
            <p className="mt-3 text-2xl font-semibold text-white">Drops antecipados, eventos e playlists.</p>
            <p className="mt-3 text-sm text-white/60">Ative as notificações para garantir acesso aos lançamentos mais disputados.</p>
          </div>
        </div>

        <div className="w-full max-w-[480px] rounded-[36px] border border-white/15 bg-white/[0.08] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.4em] text-white/60">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                placeholder="você@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase tracking-[0.4em] text-white/60">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border border-white/30 bg-transparent" />
                Lembrar
              </label>
              <Link href="/recuperar" className="text-secondary hover:text-secondary/90">
                Esqueci a senha
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90"
            >
              Entrar
            </button>
          </form>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/60">
            Ainda não é membro?{' '}
            <Link href="/registrar" className="text-secondary hover:text-secondary/80">
              Crie sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
