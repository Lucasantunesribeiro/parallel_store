import type { Product, Category } from '@/types/index';

export const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Casaco Nike Essential',
    slug: 'casaco-nike-essential',
    description: 'Casaco leve de fleece, ideal para noites frias no pós-session.',
    price: 849.9,
    images: ['/images/casacos/nike-1.JPG'],
    category: 'casacos',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 14,
    featured: true,
  },
  {
    id: '2',
    name: 'Conjunto Casual Zara',
    slug: 'casual-zara',
    description: 'Look monocromático em algodão, perfeito para o centro do Rio.',
    price: 699.9,
    images: ['/images/casual_urbano/zara-1.JPG'],
    category: 'casual-urbano',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 18,
    featured: true,
  },
  {
    id: '3',
    name: 'Treino Adidas Pro',
    slug: 'esportivo-adidas-pro',
    description: 'Peça esportiva respirável com tecnologia anti-suor.',
    price: 559.9,
    images: ['/images/esportivo/adidas-1.JPG'],
    category: 'esportivo',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 22,
    featured: true,
  },
  {
    id: '4',
    name: 'Camisa Social Lacoste',
    slug: 'social-lacoste',
    description: 'Modelagem clássica, tecido premium e assinatura Parallel.',
    price: 919.9,
    images: ['/images/social/Produto-1_lacoste.JPG'],
    category: 'social',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 10,
    featured: false,
  },
];

export const demoCategories: Category[] = [
  {
    id: 'c1',
    name: 'Casacos',
    slug: 'casacos',
    image_url: '/images/casacos/nike-2.JPG',
  },
  {
    id: 'c2',
    name: 'Casual urbano',
    slug: 'casual-urbano',
    image_url: '/images/casual_urbano/Tommy-1.png',
  },
  {
    id: 'c3',
    name: 'Esportivo',
    slug: 'esportivo',
    image_url: '/images/esportivo/adidas-2.JPG',
  },
  {
    id: 'c4',
    name: 'Social',
    slug: 'social',
    image_url: '/images/social/Produto-2_zara.JPG',
  },
];
