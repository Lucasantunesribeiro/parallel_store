import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature ausente' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Erro ao verificar webhook:', error);
    return NextResponse.json(
      { error: 'Webhook inválido' },
      { status: 400 }
    );
  }

  // Processa eventos do Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      // Atualiza status do pedido
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId);

      // Busca detalhes do pedido para enviar email
      const { data: order } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderId)
        .single();

      if (order && process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: 'Parallel Store <noreply@parallelstore.com>',
            to: order.user_email,
            subject: 'Pedido confirmado! 🎉',
            html: `
              <h1>Seu pedido foi confirmado!</h1>
              <p>Olá! Seu pedido #${orderId.slice(0, 8)} foi confirmado e está sendo preparado.</p>
              <h2>Detalhes do pedido:</h2>
              <ul>
                ${order.order_items?.map((item: any) => `
                  <li>${item.product_name} - ${item.quantity}x R$ ${item.product_price.toFixed(2)}</li>
                `).join('')}
              </ul>
              <p><strong>Total: R$ ${order.total.toFixed(2)}</strong></p>
              <p>Em breve você receberá informações sobre o envio.</p>
              <br />
              <p>Obrigado por comprar na Parallel Store!</p>
            `,
          });
        } catch (emailError) {
          console.error('Erro ao enviar email:', emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
