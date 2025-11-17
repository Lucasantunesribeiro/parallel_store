'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { supabase } from '@/lib/supabase';
import {
  User,
  Package,
  Heart,
  Lock,
  LogOut,
  ChevronRight,
  Mail,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Trash2
} from 'lucide-react';
import type { OrderWithItems } from '@/types/index';
import { ConfirmationModal } from '@/components/ui/confirmation-modal';

type TabType = 'pedidos' | 'favoritos' | 'perfil' | 'seguranca';

const STATUS_CONFIG = {
  pending_payment: { label: 'Aguardando Pagamento', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  paid: { label: 'Pago', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  processing: { label: 'Em Preparação', icon: Package, color: 'text-blue-600 bg-blue-50' },
  shipped: { label: 'Enviado', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-700 bg-green-100' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50' },
};

export default function MinhaContaPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const signOut = useAuthStore((state) => state.signOut);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [activeTab, setActiveTab] = useState<TabType>('pedidos');
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const fetchOrders = useCallback(async () => {
    if (!user) {
      console.log('fetchOrders: user not available');
      return;
    }
    try {
      setLoadingOrders(true);
      console.log('Fetching orders for user:', user.id);

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', JSON.stringify(error, null, 2));
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Orders fetched:', data?.length || 0);
      setOrders(data || []);
    } catch (error: any) {
      console.error('Erro ao buscar pedidos:', JSON.stringify(error, null, 2));
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error || {}));
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  }, [user]);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      console.log('fetchFavorites: user not available');
      return;
    }
    try {
      setLoadingFavorites(true);
      console.log('Fetching favorites for user:', user.id);

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Favorites fetched:', data?.length || 0);
      setFavorites(data || []);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      setFavorites([]);
    } finally {
      setLoadingFavorites(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && profile) {
      setEmail(user.email || '');
      setFullName(profile.full_name || '');
      fetchOrders();
      fetchFavorites();
    }
  }, [user, profile, fetchOrders, fetchFavorites]);

  const openDeleteModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (!deletingOrderId) {
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      setDeletingOrderId(orderToDelete);

      const response = await fetch(`/api/orders/${orderToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao deletar pedido');
      }

      // Remove o pedido da lista local
      setOrders((prev) => prev.filter((order) => order.id !== orderToDelete));
      setMessage({ type: 'success', text: 'Pedido removido com sucesso!' });

      // Fecha o modal
      setShowDeleteModal(false);
      setOrderToDelete(null);

      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error: any) {
      console.error('Erro ao deletar pedido:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao remover pedido' });
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile({ full_name: fullName });
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil' });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' });
      setUpdating(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres' });
      setUpdating(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao alterar senha' });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
      {/* Header */}
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2">MINHA CONTA</h1>
        <p className="text-sm md:text-base text-neutral-600">Gerencie suas informações e pedidos</p>
      </div>

      {/* Mobile User Info Card */}
      <div className="lg:hidden bg-white rounded-lg border border-neutral-200 p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{profile?.full_name || 'Usuário'}</p>
            <p className="text-xs text-neutral-600 truncate">{email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:bg-red-50 p-2 rounded-md transition flex-shrink-0"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition whitespace-nowrap text-sm ${
              activeTab === 'pedidos'
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white border border-neutral-200 text-neutral-700'
            }`}
          >
            <Package className="h-4 w-4" />
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab('favoritos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition whitespace-nowrap text-sm ${
              activeTab === 'favoritos'
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white border border-neutral-200 text-neutral-700'
            }`}
          >
            <Heart className="h-4 w-4" />
            Favoritos
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition whitespace-nowrap text-sm ${
              activeTab === 'perfil'
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white border border-neutral-200 text-neutral-700'
            }`}
          >
            <User className="h-4 w-4" />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('seguranca')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition whitespace-nowrap text-sm ${
              activeTab === 'seguranca'
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white border border-neutral-200 text-neutral-700'
            }`}
          >
            <Lock className="h-4 w-4" />
            Segurança
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{profile?.full_name || 'Usuário'}</p>
                <p className="text-xs text-neutral-600 truncate">{email}</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  activeTab === 'pedidos'
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Package className="h-5 w-5" />
                <span className="flex-1 text-left text-sm">Meus Pedidos</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('favoritos')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  activeTab === 'favoritos'
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Heart className="h-5 w-5" />
                <span className="flex-1 text-left text-sm">Favoritos</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('perfil')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  activeTab === 'perfil'
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <User className="h-5 w-5" />
                <span className="flex-1 text-left text-sm">Dados Pessoais</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('seguranca')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  activeTab === 'seguranca'
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Lock className="h-5 w-5" />
                <span className="flex-1 text-left text-sm">Segurança</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="h-5 w-5" />
                <span className="flex-1 text-left text-sm font-medium">Sair</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Meus Pedidos */}
          {activeTab === 'pedidos' && (
            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Meus Pedidos</h2>

              {loadingOrders ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-4">Você ainda não fez nenhum pedido</p>
                  <Link
                    href="/produtos"
                    className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
                  >
                    EXPLORAR PRODUTOS
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const statusConfig = STATUS_CONFIG[order.status];
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={order.id}
                        className="border border-neutral-200 rounded-lg p-3 md:p-4 hover:shadow-md transition"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base md:text-lg">
                              Pedido #{order.id.slice(0, 8).toUpperCase()}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-1">
                              {order.created_at ? new Date(order.created_at).toLocaleString('pt-BR') : 'Data não disponível'}
                            </p>
                          </div>
                          <div className={'flex items-center gap-2 px-3 py-1 rounded-full whitespace-nowrap ' + statusConfig.color}>
                            <StatusIcon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-xs font-semibold">{statusConfig.label}</span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.order_items?.map((item, idx) => (
                            <div key={idx} className="text-sm text-neutral-700">
                              {item.quantity}x {item.product_name} {item.size ? `(${item.size})` : ''} - R$ {item.product_price.toFixed(2)}
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-neutral-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm">
                              <span className="text-neutral-600">Total: </span>
                              <span className="font-bold text-lg">R$ {order.total.toFixed(2)}</span>
                            </div>
                            {order.tracking_code && (
                              <div className="text-xs text-neutral-600">
                                Rastreamento: <span className="font-mono font-semibold">{order.tracking_code}</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => openDeleteModal(order.id)}
                            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remover Pedido
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Favoritos */}
          {activeTab === 'favoritos' && (
            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Favoritos</h2>

              {loadingFavorites ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-4">Você ainda não tem favoritos</p>
                  <Link
                    href="/produtos"
                    className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
                  >
                    EXPLORAR PRODUTOS
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {favorites.map((fav) => (
                    <Link
                      key={fav.id}
                      href={`/produtos/${fav.products.slug}`}
                      className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                      <div className="relative aspect-square bg-neutral-100">
                        <Image
                          src={fav.products.images[0] || '/placeholder.jpg'}
                          alt={fav.products.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-1 truncate">{fav.products.name}</h3>
                        <p className="text-lg font-bold text-yellow-600">
                          R$ {fav.products.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dados Pessoais */}
          {activeTab === 'perfil' && (
            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Dados Pessoais</h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-neutral-400" />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full pl-10 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3 border border-neutral-300 rounded-md bg-neutral-50 text-neutral-500 cursor-not-allowed text-sm md:text-base"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">O email não pode ser alterado</p>
                </div>

                {message.text && activeTab === 'perfil' && (
                  <div
                    className={`p-4 rounded-md ${
                      message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-yellow-400 text-black font-semibold py-2.5 md:py-3 rounded-md hover:bg-yellow-500 transition disabled:opacity-50 text-sm md:text-base"
                >
                  {updating ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                </button>
              </form>
            </div>
          )}

          {/* Segurança */}
          {activeTab === 'seguranca' && (
            <div className="bg-white rounded-lg border border-neutral-200 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Segurança</h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nova Senha</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                    placeholder="Digite a nova senha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm md:text-base"
                    placeholder="Confirme a nova senha"
                  />
                </div>

                {message.text && activeTab === 'seguranca' && (
                  <div
                    className={`p-4 rounded-md ${
                      message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating || !newPassword || !confirmPassword}
                  className="w-full bg-yellow-400 text-black font-semibold py-2.5 md:py-3 rounded-md hover:bg-yellow-500 transition disabled:opacity-50 text-sm md:text-base"
                >
                  {updating ? 'ALTERANDO...' : 'ALTERAR SENHA'}
                </button>
              </form>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-neutral-50 rounded-md">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                  <Lock className="h-4 w-4 flex-shrink-0" />
                  Dicas de Segurança
                </h3>
                <ul className="text-xs md:text-sm text-neutral-600 space-y-1">
                  <li>• Use uma senha forte com pelo menos 6 caracteres</li>
                  <li>• Combine letras maiúsculas, minúsculas e números</li>
                  <li>• Não compartilhe sua senha com ninguém</li>
                  <li>• Troque sua senha regularmente</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de confirmação para deletar pedido */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteOrder}
        title="Remover Pedido"
        message="Tem certeza que deseja remover este pedido? Esta ação não pode ser desfeita e todas as informações do pedido serão permanentemente excluídas."
        confirmText="Sim, Remover"
        cancelText="Cancelar"
        type="danger"
        isLoading={!!deletingOrderId}
      />
    </div>
  );
}
