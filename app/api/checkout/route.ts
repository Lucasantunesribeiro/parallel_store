import { NextResponse } from 'next/server';
import { z } from 'zod';

import { enforceRateLimit } from '@/lib/rate-limit';

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(1),
    }),
  ),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const identifier = request.headers.get('x-forwarded-for') ?? 'global';
  if (!enforceRateLimit(`checkout-${identifier}`)) {
    return NextResponse.json({ error: 'rate-limit' }, { status: 429 });
  }
  const parsed = checkoutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: integrar com Stripe
  return NextResponse.json({
    checkoutUrl: 'https://checkout.stripe.com/pay/mock',
  });
}
