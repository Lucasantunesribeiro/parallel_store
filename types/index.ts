export type Size = 'P' | 'M' | 'G' | 'GG';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: Size[];
  stock: number;
  featured?: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
}

export interface CartItem {
  product: Product;
  size?: Size;
  quantity: number;
}

export interface Order {
  id: string;
  user_email: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
}
