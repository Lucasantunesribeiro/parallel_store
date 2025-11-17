# Como Criar Conta de Administrador

## Método 1: Via SQL no Supabase

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Vá em **SQL Editor**
3. Execute o seguinte comando (substitua o email):

```sql
-- Primeiro, crie o usuário normalmente pelo site (/cadastro)
-- Depois, execute este comando com o email do usuário:

UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'seu-email@exemplo.com';
```

## Método 2: Durante o Registro

Se você ainda não tem usuários, siga estes passos:

### Passo 1: Registre-se no site

1. Acesse `/cadastro`
2. Preencha seus dados
3. Crie a conta normalmente

### Passo 2: Torne-se admin via SQL

1. Vá no Supabase SQL Editor
2. Execute:

```sql
-- Liste os usuários existentes para encontrar o ID
SELECT id, email, full_name, is_admin 
FROM public.profiles;

-- Torne o usuário admin (use o email ou id)
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'seu-email@exemplo.com';

-- OU usando o ID:
UPDATE public.profiles 
SET is_admin = true 
WHERE id = 'uuid-do-usuario-aqui';
```

### Passo 3: Verifique

```sql
-- Confirme que o usuário é admin
SELECT email, is_admin 
FROM public.profiles 
WHERE is_admin = true;
```

## Acessar o Painel Admin

Após se tornar admin:

1. Faça login normalmente
2. Acesse: `/admin/pedidos`
3. Você verá o painel de gerenciamento de pedidos

## Funcionalidades do Painel Admin

- ✅ Visualizar todos os pedidos
- ✅ Atualizar status dos pedidos
- ✅ Adicionar código de rastreamento
- ✅ Filtrar por status
- ✅ Ver detalhes completos (itens, valor, cliente)

## Segurança

- ⚠️ Apenas usuários com `is_admin = true` podem acessar `/admin`
- ⚠️ As RLS policies garantem que apenas admins vejam todos os pedidos
- ⚠️ Nunca compartilhe credenciais de admin

## Status dos Pedidos

O admin pode alterar o status para:

- **Aguardando Pagamento** - Cliente ainda não pagou
- **Pago** - Pagamento confirmado
- **Em Preparação** - Separando produtos
- **Enviado** - Pedido despachado (adicione código de rastreamento)
- **Entregue** - Cliente recebeu
- **Cancelado** - Pedido cancelado

## Exemplo Rápido

```sql
-- Criar primeiro admin
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'admin@parallelstore.com';
```

Pronto! Agora você pode acessar `/admin/pedidos` após fazer login.
