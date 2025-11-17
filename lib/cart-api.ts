import { supabase } from './supabase';
import type { Size, DbCartItem } from '@/types/index';

export const cartApi = {
  // Busca todos os itens do carrinho do usuário
  async getCartItems(userId: string): Promise<DbCartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  // Adiciona ou atualiza item no carrinho
  async upsertCartItem(userId: string, productId: string, size: Size | undefined, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        size: size || null,
        quantity,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,product_id,size',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove item do carrinho
  async removeCartItem(userId: string, productId: string, size: Size | undefined) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('size', size || null);

    if (error) throw error;
  },

  // Limpa todo o carrinho do usuário
  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  },

  // Atualiza quantidade de um item
  async updateQuantity(userId: string, productId: string, size: Size | undefined, quantity: number) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('size', size || null);

    if (error) throw error;
  },
};
