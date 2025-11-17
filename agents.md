# Agents Configuration - Parallel Store E-commerce

## 🎯 Projeto: Parallel Store - Loja de Roupas Urbanas
**Conceito:** "Entre o comum e o paralelo, nasce o seu estilo"
**Localização:** Rio de Janeiro, Brasil
**Identidade Visual:** Street/Urban com tipografia moderna (PARALLEL outline + STORE amarelo grafite)

---

## 📋 Estrutura de Agentes Especializados

### 1. 🏗️ Arquiteto Principal (arquitecto-software)
**Responsabilidades:**
- Definir arquitetura Next.js 15 + TypeScript
- Estruturar pastas (app router, components, lib, types)
- Configurar ESLint, Prettier, Tailwind CSS
- Definir padrões de código e convenções
- Criar sistema de design tokens baseado na identidade visual

**Prioridades:**
- Performance (< 1.5s First Paint)
- SEO otimizado para e-commerce
- Mobile-first responsive
- Acessibilidade WCAG 2.1 AA

---

### 2. 🎨 Frontend Specialist (frontend-specialist)
**Responsabilidades:**
- Criar componentes React reutilizáveis com Tailwind CSS
- Implementar design system baseado na logo (preto/branco/amarelo)
- Desenvolver animações com Framer Motion
- Garantir responsividade em todos os breakpoints
- Implementar lazy loading de imagens

**Componentes Principais:**
```
- Header/Navigation (sticky, transparente com scroll)
- Hero Section (fullscreen, video/imagem background)
- Product Grid (masonry layout style Instagram)
- Product Card (hover effects, quick view)
- Cart Drawer (slide-in lateral)
- Footer (multi-column, social links)
- Search Bar (overlay fullscreen)
- Category Filters (sidebar + mobile drawer)
```

**Paleta de Cores:**
- Primary: `#000000` (preto)
- Secondary: `#FFD700` (amarelo vibrante - inspirado no logo)
- Neutral: `#FFFFFF`, `#F5F5F5`, `#E5E5E5`
- Accent: `#333333` (grafite)

---

### 3. ⚙️ Backend Specialist (backend-specialist)
**Responsabilidades:**
- Configurar API Routes do Next.js 15
- Integração com Supabase (PostgreSQL + Storage)
- Sistema de autenticação (Auth.js v5)
- Webhook para pagamentos (Stripe/Mercado Pago)
- Rate limiting e segurança

**Database Schema (Supabase):**
```sql
-- Produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  images JSONB, -- Array de URLs
  category TEXT,
  sizes JSONB, -- ["P", "M", "G", "GG"]
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categorias
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT
);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  items JSONB, -- Array de produtos
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 4. 🚀 Deploy Specialist (deploy-specialist)
**Responsabilidades:**
- Deploy na Netlify
- Configurar variáveis de ambiente
- Configurar headers de segurança
- Setup de domínio customizado
- Monitoring e analytics (Google Analytics 4)

**Netlify Configuration:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

### 5. 🧪 Performance Optimizer (performance-optimizer)
**Responsabilidades:**
- Implementar lazy loading (next/image)
- Code splitting por rotas
- Otimizar bundle size (< 1MB)
- Configurar PWA (service worker)
- Core Web Vitals monitoring

**Métricas Alvo:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- TTI < 3.5s

---

## 🛠️ Stack Tecnológica

### Frontend
```json
{
  "framework": "Next.js 15",
  "ui": "React 18.3 + TypeScript 5.6",
  "styling": "Tailwind CSS 4.0",
  "animations": "Framer Motion 11",
  "forms": "React Hook Form + Zod",
  "state": "Zustand",
  "icons": "Lucide React"
}
```

### Backend
```json
{
  "database": "Supabase (PostgreSQL)",
  "storage": "Supabase Storage",
  "auth": "Auth.js v5",
  "payments": "Stripe",
  "email": "Resend"
}
```

### Deploy & Infra
```json
{
  "hosting": "Netlify",
  "cdn": "Netlify Edge",
  "analytics": "Google Analytics 4",
  "monitoring": "Sentry"
}
```

---

## 📁 Estrutura de Pastas

```
parallel-store/
├── app/
│   ├── (main)/
│   │   ├── page.tsx              # Home
│   │   ├── produtos/
│   │   │   ├── page.tsx          # Catálogo
│   │   │   └── [slug]/page.tsx   # Produto individual
│   │   ├── categorias/
│   │   │   └── [slug]/page.tsx
│   │   └── carrinho/page.tsx
│   ├── api/
│   │   ├── produtos/route.ts
│   │   ├── checkout/route.ts
│   │   └── webhook/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                        # Componentes base (shadcn/ui)
│   ├── layout/                    # Header, Footer
│   ├── products/                  # ProductCard, ProductGrid
│   └── cart/                      # CartDrawer, CartItem
├── lib/
│   ├── supabase.ts
│   ├── utils.ts
│   └── constants.ts
├── types/
│   └── index.ts
├── public/
│   ├── logo.png
│   └── images/
└── tailwind.config.ts
```

---

## 🎯 Fluxo de Trabalho (Workflow EPCC)

### 1. **Explorar** (Arquiteto)
- Analisar referências (Zara, Nike, Tommy)
- Definir requisitos técnicos
- Criar wireframes mentais

### 2. **Planificar** (Todos os Agentes)
- Arquiteto: Define estrutura
- Frontend: Lista componentes
- Backend: Define schema DB
- Deploy: Planeja pipeline

### 3. **Codificar** (Especialistas)
- Frontend: Componentes + Páginas
- Backend: API Routes + DB
- Deploy: Configurações

### 4. **Confirmar** (Performance Optimizer)
- Testes de performance
- Validação de acessibilidade
- Lighthouse audit (>90)

---

## ✅ Checklist de Entrega

### Funcionalidades Essenciais
- [ ] Sistema de busca com filtros
- [ ] Carrinho de compras persistente
- [ ] Checkout com Stripe
- [ ] Sistema de autenticação
- [ ] Painel admin básico
- [ ] Newsletter signup
- [ ] Instagram feed integration
- [ ] SEO otimizado (meta tags dinâmicas)

### Design
- [ ] Mobile-first responsive
- [ ] Dark mode toggle (opcional)
- [ ] Animações suaves (60fps)
- [ ] Loading states
- [ ] Error boundaries

### Performance
- [ ] Lighthouse Score > 90
- [ ] Imagens otimizadas (WebP)
- [ ] Lazy loading implementado
- [ ] Service Worker configurado

### Segurança
- [ ] HTTPS obrigatório
- [ ] Headers de segurança
- [ ] Rate limiting na API
- [ ] Validação de inputs (Zod)

---

## 📞 Contato dos Responsáveis
- **CEO**: @luizvictor_021
- **Co-CEO**: @bernardo_amr
- **Instagram**: @parallel.store

---

**Versão:** 1.0
**Última atualização:** 2025-11-15
