'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types/index';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  pending_payment: { label: 'Aguardando Pagamento', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  paid: { label: 'Pago', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  processing: { label: 'Em Preparação', icon: Package, color: 'text-blue-600 bg-blue-50' },
  shipped: { label: 'Enviado', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-700 bg-green-100' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50' },
};

export default function PedidosAdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);

      const updateData: any = { status: newStatus };
      
      if (newStatus === 'shipped' && !orders.find(o => o.id === orderId)?.shipped_at) {
        updateData.shipped_at = new Date().toISOString();
      }
      
      if (newStatus === 'delivered' && !orders.find(o => o.id === orderId)?.delivered_at) {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      await fetchOrders();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do pedido');
    } finally {
      setUpdating(null);
    }
  };

  const updateTrackingCode = async (orderId: string, trackingCode: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ tracking_code: trackingCode })
        .eq('id', orderId);

      if (error) throw error;
      await fetchOrders();
    } catch (error) {
      console.error('Erro ao atualizar código de rastreamento:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Pedidos</h1>
        <p className="text-neutral-600 mt-2">{orders.length} pedidos no total</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    Pedido #{order.id.slice(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-neutral-600">{order.user_email}</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {new Date(order.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className={'flex items-center gap-2 px-3 py-1 rounded-full ' + statusConfig.color}>
                  <StatusIcon className="h-4 w-4" />
                  <span className="text-sm font-semibold">{statusConfig.label}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 mb-4">
                <h4 className="font-semibold mb-2">Itens:</h4>
                <ul className="space-y-1 text-sm">
                  {order.order_items?.map((item: any, idx: number) => (
                    <li key={idx} className="text-neutral-700">
                      {item.quantity}x {item.product_name} {item.size ? `(${item.size})` : ''} - R$ {item.product_price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-lg mt-2">Total: R$ {order.total.toFixed(2)}</p>
                <p className="text-sm text-neutral-600">
                  Pagamento: {order.payment_method === 'pix' ? 'PIX' : 'Cartão'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  disabled={updating === order.id}
                  className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="pending_payment">Aguardando Pagamento</option>
                  <option value="paid">Pago</option>
                  <option value="processing">Em Preparação</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>

                {order.status === 'shipped' && (
                  <input
                    type="text"
                    placeholder="Código de rastreamento"
                    defaultValue={order.tracking_code || ''}
                    onBlur={(e) => e.target.value && updateTrackingCode(order.id, e.target.value)}
                    className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-neutral-300 mb-4" />
          <p className="text-neutral-600">Nenhum pedido encontrado</p>
        </div>
      )}
    </div>
  );
}
