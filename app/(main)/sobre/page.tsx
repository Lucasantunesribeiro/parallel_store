'use client';

import Link from 'next/link';
import { MapPin, Package, Zap, Heart, Users, TrendingUp } from 'lucide-react';

const VALORES = [
  {
    icon: Zap,
    title: 'Drops Limitados',
    description: 'Coleções exclusivas lançadas em ciclos curtos. Quando acaba, acaba.',
  },
  {
    icon: Heart,
    title: 'Autenticidade',
    description: 'Produtos 100% originais de marcas parceiras selecionadas.',
  },
  {
    icon: Package,
    title: 'Entrega Rápida',
    description: 'Logística inteligente com envio em até 48h para todo o Brasil.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description: 'Mais que uma loja, somos uma comunidade de entusiastas de streetwear.',
  },
];

const TIMELINE = [
  { year: '2022', title: 'Fundação', description: 'Nascemos no Rio de Janeiro com a missão de democratizar o acesso ao streetwear premium.' },
  { year: '2023', title: 'Primeiro Drop', description: 'Lançamento da primeira coleção exclusiva com 500 unidades. Esgotou em 48 horas.' },
  { year: '2024', title: 'Expansão Nacional', description: 'Alcançamos mais de 50 mil clientes em todos os estados brasileiros.' },
  { year: '2025', title: 'Novas Parcerias', description: 'Firmamos parcerias com marcas internacionais e expandimos o catálogo.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-40 lg:pt-48">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-yellow-500">Manifesto Parallel</p>
          <h1 className="mt-3 text-5xl font-bold uppercase tracking-tight text-neutral-900 lg:text-6xl">
            Sobre Nós
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-600">
            Entre o comum e o paralelo, nasce o seu estilo. Somos uma plataforma de streetwear que conecta entusiastas da moda urbana aos drops mais desejados do Brasil.
          </p>
        </div>

        {/* Nossa História */}
        <div className="mb-16 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <MapPin className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Nossa História</h2>
          </div>
          <div className="space-y-4 text-neutral-700">
            <p>
              A <strong>Parallel Store</strong> nasceu em 2022 no coração do Rio de Janeiro, entre o asfalto quente da Avenida Brasil e o brilho de neon da Lapa. Criada por entusiastas de streetwear cansados de perder drops limitados, desenvolvemos uma plataforma que democratiza o acesso às peças mais desejadas do mercado.
            </p>
            <p>
              Nosso nome vem da ideia de <strong>realidade paralela</strong>: enquanto o mercado tradicional funciona de um jeito, nós criamos uma alternativa mais justa, transparente e acessível. Acreditamos que todo mundo merece ter a chance de conseguir aquele tênis ou aquela jaqueta dos sonhos.
            </p>
            <p>
              Começamos com 50 produtos e um ateliê em Botafogo. Hoje, temos parcerias com as maiores marcas do mundo, atendemos mais de 50 mil clientes em todo o Brasil e lançamos drops exclusivos toda semana.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">Nossos Valores</h2>
            <p className="mt-2 text-neutral-600">Os pilares que guiam nossa missão</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((valor) => {
              const Icon = valor.icon;
              return (
                <div
                  key={valor.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                    <Icon className="h-7 w-7 text-yellow-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">{valor.title}</h3>
                  <p className="text-sm text-neutral-600">{valor.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <TrendingUp className="mx-auto mb-4 h-10 w-10 text-yellow-500" />
            <h2 className="text-2xl font-bold text-neutral-900">Nossa Jornada</h2>
            <p className="mt-2 text-neutral-600">Marcos importantes da nossa história</p>
          </div>
          <div className="space-y-6">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className="relative flex gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-2xl font-bold text-black">
                  {item.year}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Localização */}
        <div className="mb-16 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">Onde Estamos</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                <MapPin className="h-5 w-5 text-yellow-500" />
                Ateliê Principal
              </h3>
              <p className="text-neutral-600">
                Rua da Passagem, 123 - Botafogo<br />
                Rio de Janeiro, RJ - 22290-030<br />
                Segunda a Sexta, 9h às 18h
              </p>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                <Package className="h-5 w-5 text-yellow-500" />
                Centro de Distribuição
              </h3>
              <p className="text-neutral-600">
                Av. Brasil, 4567 - São Cristóvão<br />
                Rio de Janeiro, RJ - 20930-040<br />
                Envios diários para todo o Brasil
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-8 text-center shadow-sm">
          <h3 className="mb-3 text-2xl font-bold text-neutral-900">Quer Fazer Parte da Nossa História?</h3>
          <p className="mb-6 text-neutral-600">
            Junte-se a milhares de entusiastas de streetwear e seja o primeiro a saber dos próximos drops exclusivos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/junte-se-a-nos"
              className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-500"
            >
              Junte-se a Nós
            </Link>
            <Link
              href="/produtos"
              className="rounded-full border-2 border-neutral-300 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:border-neutral-400"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
