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
  user_id?: string;
  user_email: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  stripe_payment_intent_id?: string;
  created_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DbCartItem {
  id: string;
  user_id: string;
  product_id: string;
  size?: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at?: string;
}
