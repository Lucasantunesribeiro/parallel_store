export const formatCurrency = (value: number, currency: string = 'BRL') =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);

export const shimmer = (w: number, h: number) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs><linearGradient id="g"><stop stop-color="#eeeeee" offset="20%"/><stop stop-color="#dddddd" offset="50%"/><stop stop-color="#eeeeee" offset="70%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#f6f7f8"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/></svg>`
  ).toString('base64')}`;
