import { NextResponse } from 'next/server';

import { enforceRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const identifier = request.headers.get('x-forwarded-for') ?? 'webhook';
  if (!enforceRateLimit(`webhook-${identifier}`)) {
    return NextResponse.json({ error: 'rate-limit' }, { status: 429 });
  }
  if (!signature) {
    return NextResponse.json({ error: 'missing signature' }, { status: 400 });
  }

  // TODO: validar evento Stripe
  const body = await request.text();
  console.info('Webhook recebido', { signature, body });

  return NextResponse.json({ received: true });
}
