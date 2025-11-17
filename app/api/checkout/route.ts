import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
import type { CartItem } from '@/types/index';

export async function POST(req: NextRequest) {
  try {
    const { items, userId, userEmail, paymentMethod = 'card' } = await req.json() as {
      items: CartItem[];
      userId: string;
      userEmail: string;
      paymentMethod?: 'card' | 'pix';
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' },
        { status: 400 }
      );
    }

    // Cria line items para o Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.product.name,
          description: item.size ? `Tamanho: ${item.size}` : undefined,
          images: item.product.images[0] ? [item.product.images[0]] : undefined,
        },
        unit_amount: Math.round(item.product.price * 100), // Converte para centavos
      },
      quantity: item.quantity,
    }));

    // Calcula total
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    // Cria pedido no banco
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        user_email: userEmail,
        total,
        status: 'pending_payment',
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Erro ao criar pedido no Supabase:', orderError);
      throw new Error(`Erro ao criar pedido: ${orderError?.message || 'Desconhecido'}`);
    }

    // Cria itens do pedido
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_price: item.product.price,
      size: item.size || null,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Erro ao criar itens do pedido:', itemsError);
      throw new Error(`Erro ao criar itens: ${itemsError.message}`);
    }

    // Define payment methods baseado na escolha
    const paymentMethodTypes = paymentMethod === 'pix' ? ['pix'] : ['card'];

    // Cria sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes as any,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${req.nextUrl.origin}/checkout?canceled=true`,
      customer_email: userEmail,
      metadata: {
        orderId: order.id,
        userId,
        paymentMethod,
      },
      // Configurações específicas para PIX
      ...(paymentMethod === 'pix' && {
        payment_method_options: {
          pix: {
            expires_after_seconds: 60 * 60 * 24, // 24 horas
          },
        },
      }),
    });

    // Atualiza pedido com Stripe payment intent ID
    await supabaseAdmin
      .from('orders')
      .update({ stripe_payment_intent_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Erro no checkout:', error);
    console.error('Detalhes do erro:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    return NextResponse.json(
      {
        error: 'Erro ao processar checkout',
        details: error?.message || 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
