import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID do pedido não fornecido' },
        { status: 400 }
      );
    }

    // Primeiro deleta os itens do pedido (por causa da foreign key)
    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('order_id', orderId);

    if (itemsError) {
      console.error('Erro ao deletar itens do pedido:', itemsError);
      return NextResponse.json(
        { error: 'Erro ao deletar itens do pedido', details: itemsError.message },
        { status: 500 }
      );
    }

    // Depois deleta o pedido
    const { error: orderError } = await supabaseAdmin
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (orderError) {
      console.error('Erro ao deletar pedido:', orderError);
      return NextResponse.json(
        { error: 'Erro ao deletar pedido', details: orderError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao deletar pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição', details: error?.message || 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
