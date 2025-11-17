'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, MessageCircle, Phone, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'Pedidos e Entregas',
    questions: [
      {
        q: 'Qual o prazo de entrega?',
        a: 'O prazo varia de 3 a 7 dias úteis para todo o Brasil. Pedidos confirmados até às 18h saem no mesmo dia.',
      },
      {
        q: 'Como rastrear meu pedido?',
        a: 'Acesse a página "Acompanhar Pedido" e insira seu e-mail e número do pedido. Você receberá atualizações por e-mail e SMS.',
      },
      {
        q: 'Posso alterar o endereço de entrega?',
        a: 'Sim, desde que o pedido ainda não tenha sido despachado. Entre em contato pelo chat ou e-mail imediatamente.',
      },
      {
        q: 'Qual o valor do frete?',
        a: 'O frete varia conforme CEP e peso. Envio GRÁTIS para compras acima de R$ 299 para todo Brasil.',
      },
    ],
  },
  {
    category: 'Pagamentos',
    questions: [
      {
        q: 'Quais formas de pagamento são aceitas?',
        a: 'Aceitamos cartões de crédito (via Stripe), PIX e parcelamento em até 6x sem juros.',
      },
      {
        q: 'O pagamento via PIX é instantâneo?',
        a: 'Sim! A confirmação ocorre em até 5 minutos após o pagamento e seu pedido já entra em preparação.',
      },
      {
        q: 'Posso parcelar no PIX?',
        a: 'Não. O parcelamento está disponível apenas para cartão de crédito em até 6x sem juros.',
      },
      {
        q: 'Como recebo o comprovante de pagamento?',
        a: 'O comprovante é enviado automaticamente para seu e-mail após a confirmação do pagamento.',
      },
    ],
  },
  {
    category: 'Trocas e Devoluções',
    questions: [
      {
        q: 'Qual o prazo para trocas?',
        a: 'Você tem até 30 dias a partir do recebimento para solicitar troca ou devolução.',
      },
      {
        q: 'Como solicito uma troca?',
        a: 'Entre em contato pelo e-mail suporte@parallel.store informando o número do pedido e motivo da troca.',
      },
      {
        q: 'A troca é gratuita?',
        a: 'Sim! A primeira troca é gratuita. Enviamos o produto correto sem custo adicional.',
      },
      {
        q: 'Posso trocar por outro produto?',
        a: 'Sim, você pode trocar por outro produto de mesmo valor ou superior (pagando a diferença).',
      },
    ],
  },
  {
    category: 'Produtos',
    questions: [
      {
        q: 'Os produtos são originais?',
        a: 'Sim! Trabalhamos apenas com produtos 100% originais e autênticos de marcas parceiras.',
      },
      {
        q: 'Como funciona o sistema de drops?',
        a: 'Lançamos coleções limitadas em ciclos curtos. Inscreva-se na newsletter para ser avisado dos próximos lançamentos.',
      },
      {
        q: 'Posso reservar um produto?',
        a: 'Não fazemos reservas. Os produtos são vendidos por ordem de compra até acabar o estoque.',
      },
      {
        q: 'Vocês fazem pedidos personalizados?',
        a: 'Para pedidos especiais ou colaborações, entre em contato via e-mail: suporte@parallel.store',
      },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-40 lg:pt-48">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-yellow-500">Central de Ajuda</p>
          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-neutral-900 lg:text-5xl">
            Como Podemos Ajudar?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            Atendimento humano, 7 dias por semana. Resposta em até 2 horas nos dias úteis.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Mail className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">E-mail</h3>
            <p className="mb-3 text-sm text-neutral-600">Resposta em até 2h</p>
            <Link
              href="mailto:suporte@parallel.store"
              className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
            >
              suporte@parallel.store
            </Link>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <MessageCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">Instagram</h3>
            <p className="mb-3 text-sm text-neutral-600">Direct em tempo real</p>
            <Link
              href="https://instagram.com/parallel.store"
              target="_blank"
              className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
            >
              @parallel.store
            </Link>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Phone className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">WhatsApp</h3>
            <p className="mb-3 text-sm text-neutral-600">Seg a Sex, 9h às 18h</p>
            <Link href="https://wa.me/5521999999999" target="_blank" className="text-sm font-medium text-yellow-600 hover:text-yellow-700">
              (21) 99999-9999
            </Link>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <HelpCircle className="mx-auto mb-4 h-10 w-10 text-yellow-500" />
            <h2 className="text-2xl font-bold text-neutral-900">Perguntas Frequentes</h2>
            <p className="mt-2 text-neutral-600">Encontre respostas rápidas para as dúvidas mais comuns</p>
          </div>

          <div className="space-y-8">
            {FAQ_DATA.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((item, qIndex) => {
                    const id = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === id;

                    return (
                      <div
                        key={id}
                        className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all"
                      >
                        <button
                          onClick={() => toggleFAQ(id)}
                          className="flex w-full items-center justify-between p-5 text-left hover:bg-neutral-50"
                        >
                          <span className="font-medium text-neutral-900">{item.q}</span>
                          <ChevronDown
                            className={`h-5 w-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-neutral-100 bg-neutral-50 p-5">
                            <p className="text-neutral-700">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-8 text-center shadow-sm">
          <h3 className="mb-3 text-2xl font-bold text-neutral-900">Não encontrou o que procurava?</h3>
          <p className="mb-6 text-neutral-600">Nossa equipe está pronta para te atender com qualquer dúvida.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="mailto:suporte@parallel.store"
              className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-500"
            >
              Enviar E-mail
            </Link>
            <Link
              href="https://instagram.com/parallel.store"
              target="_blank"
              className="rounded-full border-2 border-neutral-300 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:border-neutral-400"
            >
              Falar no Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
