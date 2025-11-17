import { NextResponse } from 'next/server';

import { demoProducts } from '@/lib/data';
import { enforceRateLimit } from '@/lib/rate-limit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const identifier = request.headers.get('x-forwarded-for') ?? 'global';
  if (!enforceRateLimit(identifier)) {
    return NextResponse.json({ error: 'rate-limit' }, { status: 429 });
  }
  const query = searchParams.get('query');
  const filtered = query
    ? demoProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      )
    : demoProducts;

  return NextResponse.json({ data: filtered });
}
