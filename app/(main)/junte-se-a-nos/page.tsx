'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Gift, Zap, Crown, Users, Instagram, Mail } from 'lucide-react';

const BENEFICIOS = [
  {
    icon: Zap,
    title: 'Acesso Antecipado',
    description: 'Seja o primeiro a ver e comprar drops exclusivos antes do público geral.',
  },
  {
    icon: Gift,
    title: 'Descontos Exclusivos',
    description: 'Cupons especiais e descontos em datas comemorativas só para membros.',
  },
  {
    icon: Bell,
    title: 'Notificações VIP',
    description: 'Receba alertas instantâneos de restocks e lançamentos via SMS e e-mail.',
  },
  {
    icon: Crown,
    title: 'Eventos Exclusivos',
    description: 'Convites para eventos presenciais, festas de lançamento e meet & greets.',
  },
];

const COMUNIDADE_STATS = [
  { numero: '50k+', label: 'Membros Ativos' },
  { numero: '200+', label: 'Drops Lançados' },
  { numero: '95%', label: 'Satisfação' },
  { numero: '24h', label: 'Suporte' },
];

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-40 lg:pt-48">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-yellow-500">Community First</p>
          <h1 className="mt-3 text-5xl font-bold uppercase tracking-tight text-neutral-900 lg:text-6xl">
            Junte-se a Nós
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-600">
            Faça parte de uma comunidade apaixonada por streetwear. Tenha acesso antecipado aos drops, descontos exclusivos e participe de eventos únicos.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMUNIDADE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-4xl font-bold text-yellow-500">{stat.numero}</p>
              <p className="mt-2 text-sm font-medium text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefícios */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <Users className="mx-auto mb-4 h-10 w-10 text-yellow-500" />
            <h2 className="text-2xl font-bold text-neutral-900">Benefícios Exclusivos</h2>
            <p className="mt-2 text-neutral-600">O que você ganha ao se tornar membro</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((beneficio) => {
              const Icon = beneficio.icon;
              return (
                <div
                  key={beneficio.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                    <Icon className="h-7 w-7 text-yellow-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">{beneficio.title}</h3>
                  <p className="text-sm text-neutral-600">{beneficio.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulário */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Inscreva-se Agora</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700" htmlFor="name">
                    Nome Completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700" htmlFor="phone">
                  WhatsApp (opcional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700" htmlFor="interests">
                  Interesses (opcional)
                </label>
                <select
                  id="interests"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                >
                  <option value="">Selecione suas categorias favoritas</option>
                  <option value="casual">Casual Urbano</option>
                  <option value="esportivo">Esportivo</option>
                  <option value="social">Social</option>
                  <option value="casacos">Casacos</option>
                </select>
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-yellow-500 focus:ring-yellow-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-neutral-600">
                  Aceito receber e-mails e notificações sobre drops, promoções e eventos exclusivos da Parallel Store.
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-500"
              >
                {submitted ? 'Bem-vindo(a)! 🎉' : 'Quero Fazer Parte'}
              </button>
            </form>

            {submitted && (
              <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-sm font-medium text-green-900">
                  Inscrição confirmada! Enviamos um e-mail de boas-vindas com seus benefícios.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Comunidade */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-neutral-900">Nossa Comunidade</h3>
              <p className="mb-6 text-neutral-600">
                Mais de 50 mil pessoas já fazem parte da Parallel Family. Junte-se a elas e conecte-se com outros apaixonados por streetwear.
              </p>
              <div className="space-y-3">
                <Link
                  href="https://instagram.com/parallel.store"
                  target="_blank"
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 transition hover:bg-neutral-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">@parallel.store</p>
                    <p className="text-sm text-neutral-600">Siga no Instagram</p>
                  </div>
                </Link>
                <Link
                  href="mailto:suporte@parallel.store"
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 transition hover:bg-neutral-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Mail className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">suporte@parallel.store</p>
                    <p className="text-sm text-neutral-600">Envie um e-mail</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* FAQ Rápido */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-neutral-900">Perguntas Frequentes</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-neutral-900">É grátis?</p>
                  <p className="mt-1 text-neutral-600">
                    Sim! A inscrição na comunidade é 100% gratuita.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Posso cancelar a qualquer momento?</p>
                  <p className="mt-1 text-neutral-600">
                    Claro! Basta descadastrar seu e-mail pelos links nos nossos e-mails.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Como recebo os benefícios?</p>
                  <p className="mt-1 text-neutral-600">
                    Enviaremos cupons e avisos de drops direto no seu e-mail e WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-8 text-center shadow-sm">
          <h3 className="mb-3 text-2xl font-bold text-neutral-900">Quer Colaborar Com a Gente?</h3>
          <p className="mb-6 text-neutral-600">
            Se você é criador de conteúdo, artista ou representante comercial e quer fazer parte do nosso time, entre em contato!
          </p>
          <Link
            href="mailto:parcerias@parallel.store"
            className="inline-block rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-800"
          >
            Falar Sobre Parcerias
          </Link>
        </div>
      </div>
    </div>
  );
}
