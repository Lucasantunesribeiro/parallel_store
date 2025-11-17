import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Globe2, Bell, FileCheck, Clock3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Parallel Store',
  description:
    'Como coletamos, usamos e protegemos seus dados na Parallel Store. Transparência, segurança e conformidade com a LGPD.',
};

const DATA_COLLECTED = [
  {
    title: 'Conta e Identificação',
    description: 'Nome, e-mail, telefone, endereço, documento (quando exigido por lei) e preferências de contato.',
  },
  {
    title: 'Navegação e Dispositivos',
    description: 'Páginas visitadas, tempo de sessão, IP anonimizado, tipo de dispositivo/navegador e cookies essenciais.',
  },
  {
    title: 'Pedidos e Pagamentos',
    description: 'Produtos comprados, valores, forma de pagamento, status do pedido e invoices. Dados de cartão são processados pelo Stripe/Mercado Pago; não salvamos números completos.',
  },
  {
    title: 'Suporte e Comunicação',
    description: 'Histórico de atendimento, mensagens enviadas (e-mail/WhatsApp/Instagram) e registros de consentimento.',
  },
];

const USE_OF_DATA = [
  'Processar pedidos, pagamentos e entregas com parceiros logísticos.',
  'Gerenciar conta, autenticação e recuperação de acesso.',
  'Enviar notificações transacionais (pedido, pagamento, entrega).',
  'Personalizar ofertas, recomendações e campanhas mediante consentimento.',
  'Cumprir obrigações legais, fiscais e de antifraude.',
  'Melhorar performance, segurança e experiência do site.',
];

const RIGHTS = [
  'Confirmar a existência de tratamento e acessar os dados.',
  'Corrigir dados incompletos, inexatos ou desatualizados.',
  'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.',
  'Revogar consentimento e gerenciar preferências de comunicação.',
  'Portar dados a outro fornecedor mediante requisição.',
  'Solicitar revisão de decisões automatizadas que afetem seus interesses.',
];

const SHARING = [
  'Processadores de pagamento (Stripe/Mercado Pago) para transações financeiras.',
  'Logística e entregas para separação, envio e rastreio.',
  'Plataformas de e-mail/SMS/Push para comunicações transacionais e marketing autorizado.',
  'Analytics e monitoramento para performance e segurança (dados agregados/anônimos sempre que possível).',
  'Autoridades públicas quando requerido por lei ou ordem judicial.',
];

const COOKIES = [
  { title: 'Essenciais', description: 'Garantem funcionalidades básicas (login, carrinho, checkout).' },
  { title: 'Analytics', description: 'Medição de tráfego e performance de páginas (Google Analytics 4).' },
  { title: 'Marketing', description: 'Personalização de ofertas e campanhas quando você permite.' },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white pt-40 lg:pt-48">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-yellow-500">Proteção de Dados</p>
          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight text-neutral-900 lg:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-600">
            Explicamos de forma clara como coletamos, usamos e protegemos suas informações. Transparência e segurança são
            prioridades na Parallel Store.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <Clock3 className="h-4 w-4" />
            <span>Atualizado em: 15/01/2025</span>
          </div>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Shield className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">Segurança em Primeiro Lugar</h3>
            <p className="text-sm text-neutral-600">
              Dados armazenados com criptografia em repouso e em trânsito, monitoramento contínuo e acesso restrito.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Lock className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">Controle do Titular</h3>
            <p className="text-sm text-neutral-600">
              Você decide como quer ser contatado e pode solicitar correção ou exclusão de dados a qualquer momento.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Globe2 className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">Conformidade com LGPD</h3>
            <p className="text-sm text-neutral-600">
              Tratamento baseado em bases legais adequadas, registros de consentimento e revisão periódica de fornecedores.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">Dados que Coletamos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {DATA_COLLECTED.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-neutral-900">Como Usamos Seus Dados</h2>
          </div>
          <ul className="space-y-3 text-neutral-700">
            {USE_OF_DATA.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold text-neutral-900">Seus Direitos</h2>
            </div>
            <ul className="space-y-3 text-neutral-700">
              {RIGHTS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-neutral-600">
              Para exercer qualquer direito, envie sua solicitação para{' '}
              <Link href="mailto:privacidade@parallel.store" className="font-semibold text-yellow-600 hover:text-yellow-700">
                privacidade@parallel.store
              </Link>
              .
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold text-neutral-900">Compartilhamento Seguro</h2>
            </div>
            <ul className="space-y-3 text-neutral-700">
              {SHARING.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-neutral-600">
              Não vendemos dados pessoais. Todos os fornecedores seguem padrões de segurança e privacidade equivalentes à LGPD.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">Cookies e Preferências</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {COOKIES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            Você pode gerenciar cookies diretamente no seu navegador. Cookies essenciais são necessários para login, carrinho e
            checkout.
          </p>
        </div>

        <div className="mb-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-neutral-900">Retenção e Armazenamento</h2>
          <p className="text-neutral-700">
            Mantemos seus dados apenas pelo tempo necessário para cumprir finalidades legais, fiscais e contratuais. Dados de
            contas inativas são anonimizados ou excluídos após períodos definidos por lei ou mediante solicitação.
          </p>
        </div>

        <div className="mb-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-neutral-900">Transferências Internacionais</h2>
          <p className="text-neutral-700">
            Alguns fornecedores podem processar dados fora do Brasil. Nesses casos, aplicamos cláusulas contratuais e exigimos
            padrões equivalentes aos previstos na LGPD para proteger suas informações.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-8 text-center shadow-sm">
          <h3 className="mb-3 text-2xl font-bold text-neutral-900">Fale com o Encarregado de Dados</h3>
          <p className="mb-6 text-neutral-600">
            Dúvidas ou solicitações sobre privacidade? Responderemos em até 48h úteis.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="mailto:privacidade@parallel.store"
              className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-yellow-500"
            >
              Enviar E-mail
            </Link>
            <Link
              href="/ajuda"
              className="rounded-full border-2 border-neutral-300 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 transition hover:border-neutral-400"
            >
              Ir para Ajuda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
