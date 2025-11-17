'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth-store';

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', optIn: false });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password || form.password !== form.confirm) return;
    login();
    router.push('/favoritos');
  };

  return (
    <div className="relative bg-[#050505] pt-24 pb-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,215,0,0.08),_transparent_45%)]" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1300px] flex-col gap-12 px-5 lg:flex-row lg:px-10">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.6em] text-secondary">Crie sua conta</p>
          <h1 className="text-4xl font-black uppercase tracking-[0.2em]">Parallel Members</h1>
          <ul className="space-y-3 text-white/70">
            <li>• Drops antecipados e convites para eventos em rooftop</li>
            <li>• Conteúdos exclusivos com artistas cariocas</li>
            <li>• Status para liberar acesso rápido a coleções limitadas</li>
          </ul>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.4em] text-secondary">Benefício</p>
              <p className="mt-2 text-base font-semibold">Frete paralelo gratuito</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.4em] text-secondary">Clube</p>
              <p className="mt-2 text-base font-semibold">Playlist + experiências</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[520px] rounded-[36px] border border-white/15 bg-white/[0.08] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.4em] text-white/60">
                Nome completo
              </label>
              <input
                id="name"
                className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                placeholder="Seu nome"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.4em] text-white/60">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                placeholder="você@email.com"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs uppercase tracking-[0.4em] text-white/60">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm" className="text-xs uppercase tracking-[0.4em] text-white/60">
                  Confirmar
                </label>
                <input
                  id="confirm"
                  type="password"
                  className="w-full rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white focus:border-secondary focus:outline-none"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={(event) => setForm((prev) => ({ ...prev, confirm: event.target.value }))}
                  required
                />
              </div>
            </div>
            <label className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border border-white/30 bg-transparent"
                checked={form.optIn}
                onChange={(event) => setForm((prev) => ({ ...prev, optIn: event.target.checked }))}
              />
              Aceito receber convites por e-mail
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-secondary/90"
            >
              Criar conta
            </button>
          </form>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/60">
            Já faz parte?{' '}
            <Link href="/login" className="text-secondary hover:text-secondary/80">
              Entrar agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
