import { useEffect, useState } from 'react';
import { getVendorOrders, updateOrderStatus } from '../../api/orders';
import { Clock, MapPin, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  PLACED:           'bg-blue-100 text-blue-700',
  ACCEPTED:         'bg-indigo-100 text-indigo-700',
  PREPARING:        'bg-yellow-100 text-yellow-700',
  READY_FOR_PICKUP: 'bg-orange-100 text-orange-700',
  PICKED_UP:        'bg-purple-100 text-purple-700',
  DELIVERING:       'bg-purple-100 text-purple-700',
  DELIVERED:        'bg-green-100 text-green-700',
  CANCELLED:        'bg-red-100 text-red-600',
};

const NEXT_STATUS = {
  PLACED:           'ACCEPTED',
  ACCEPTED:         'PREPARING',
  PREPARING:        'READY_FOR_PICKUP',
};

const NEXT_LABEL = {
  PLACED:    'Accept Order',
  ACCEPTED:  'Start Preparing',
  PREPARING: 'Mark Ready for Pickup',
};

export default function VendorDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const fetchOrders = () => {
    getVendorOrders()
      .then((res) => setOrders(res.data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? res.data : o))
      );
      toast.success(`Order #${orderId} updated to ${newStatus.replace(/_/g, ' ')}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const FILTERS = ['ALL', 'PLACED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'DELIVERED', 'CANCELLED'];

  const filtered = filter === 'ALL'
    ? orders
    : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Vendor Dashboard 🍽️</h1>
            <p className="text-sm text-gray-400 mt-1">{orders.length} total orders</p>
          </div>
          <button
            onClick={fetchOrders}
            className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
            Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'New Orders', status: 'PLACED', color: 'text-blue-600' },
            { label: 'Preparing', status: 'PREPARING', color: 'text-yellow-600' },
            { label: 'Ready', status: 'READY_FOR_PICKUP', color: 'text-orange-600' },
            { label: 'Delivered', status: 'DELIVERED', color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.status} className="bg-white rounded-2xl shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>
                {orders.filter((o) => o.status === stat.status).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full transition ${
                filter === f
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#FF6B35]'
              }`}>
              {f.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p>No orders in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">

                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-[#1A1A2E]">
                      Order #{order.id}
                      <span className="text-gray-400 font-normal text-sm ml-2">
                        · {order.customerEmail}
                      </span>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Clock size={11} />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Items */}
                <div className="border-t border-gray-100 pt-3 space-y-1 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.quantity}x {item.name}</span>
                      <span className="text-gray-500">₦{Number(item.subtotal).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={11} />
                    {order.deliveryAddress}
                  </div>
                  <p className="font-bold text-[#FF6B35]">
                    ₦{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>

                {order.note && (
                  <p className="text-xs text-gray-400 mt-2 italic">Note: {order.note}</p>
                )}

                {/* Action Button */}
                {NEXT_STATUS[order.status] && (
                  <button
                    onClick={() => handleStatusUpdate(order.id, NEXT_STATUS[order.status])}
                    disabled={updating === order.id}
                    className="mt-4 w-full bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition">
                    {updating === order.id ? 'Updating...' : NEXT_LABEL[order.status]}
                  </button>
                )}

                {/* Cancel button for PLACED orders */}
                {order.status === 'PLACED' && (
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}
                    disabled={updating === order.id}
                    className="mt-2 w-full border border-red-200 text-red-400 hover:bg-red-50 text-sm font-semibold py-2 rounded-xl transition">
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}