# Como Habilitar PIX no Stripe

## ⚠️ Status Atual
PIX está **temporariamente desabilitado** no checkout porque não está ativado no Stripe.

## 🚀 Como Ativar PIX

### Passo 1: Acessar Dashboard do Stripe
1. Entre em: https://dashboard.stripe.com/
2. Faça login com sua conta

### Passo 2: Ativar Métodos de Pagamento
1. No menu lateral, vá em: **Settings** (Configurações)
2. Clique em: **Payment methods** (Métodos de pagamento)
3. URL direta: https://dashboard.stripe.com/account/payments/settings

### Passo 3: Habilitar PIX
1. Procure por **PIX** na lista de métodos de pagamento
2. Clique no botão **Enable** (Ativar) ao lado de PIX
3. Siga as instruções para configurar PIX no Brasil

### Passo 4: Verificar Requisitos
Para usar PIX no Stripe, você precisa:
- ✅ Conta Stripe verificada
- ✅ País configurado como Brasil
- ✅ Moeda BRL (Real Brasileiro) ativada
- ✅ Completar verificação de negócio (se necessário)

### Passo 5: Reativar no Código

Após habilitar PIX no dashboard do Stripe:

1. Abra o arquivo: `app/(main)/checkout/page.tsx`

2. Encontre a linha com PIX desabilitado (linha ~157):
```tsx
<label className="flex items-center gap-3 p-4 border rounded-lg opacity-50 cursor-not-allowed border-neutral-200">
  <input
    type="radio"
    name="payment"
    value="pix"
    disabled  // REMOVER ESTA LINHA
    className="w-4 h-4 text-yellow-400"
  />
```

3. Substitua por:
```tsx
<label className={'flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ' + (paymentMethod === 'pix' ? 'border-yellow-400 bg-yellow-50' : 'border-neutral-200 hover:border-neutral-300')}>
  <input
    type="radio"
    name="payment"
    value="pix"
    checked={paymentMethod === 'pix'}
    onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'pix')}
    className="w-4 h-4 text-yellow-400"
  />
  <div className="flex-1">
    <div className="font-semibold">PIX</div>
    <div className="text-xs text-neutral-600">Aprovação em até 1 hora</div>
  </div>
  <div className="text-2xl">📱</div>
</label>
```

4. Reinicie o servidor:
```bash
npm run dev
```

## 📝 Notas Importantes

### Limitações do Modo Test
- PIX no modo de teste (test mode) tem comportamento simulado
- Pode não funcionar exatamente como em produção
- Recomenda-se testar também em modo produção antes de lançar

### Taxas do Stripe para PIX
- Consulte as taxas atuais em: https://stripe.com/br/pricing
- Geralmente é diferente das taxas de cartão de crédito

### Webhook do PIX
O sistema já está configurado para receber notificações do Stripe quando o pagamento PIX for confirmado via webhook em: `/api/webhooks/stripe`

## ✅ Checklist

- [ ] PIX ativado no dashboard do Stripe
- [ ] País configurado como Brasil
- [ ] Moeda BRL ativada
- [ ] Código reativado no checkout
- [ ] Servidor reiniciado
- [ ] Teste realizado em modo test
- [ ] Webhook testado e funcionando

## 🆘 Problemas Comuns

### "PIX não disponível para seu país"
- Certifique-se de que o país da conta Stripe é Brasil
- Complete a verificação de negócio se solicitado

### "Método de pagamento inválido"
- Aguarde alguns minutos após ativar PIX
- Limpe o cache do navegador
- Reinicie o servidor

### "Webhook não recebe confirmação"
- Verifique se o webhook secret está correto no .env
- Teste o endpoint com Stripe CLI
- Verifique os logs do Stripe Dashboard

## 📚 Recursos Adicionais

- [Documentação PIX do Stripe](https://stripe.com/docs/payments/pix)
- [Guia de Integração PIX](https://stripe.com/docs/payments/payment-methods/integration-options)
- [Países e Moedas Suportadas](https://stripe.com/global)
