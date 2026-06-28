import { useEffect, useState } from 'react';
import { getAllOrders } from '../../api/admin';
import { MapPin } from 'lucide-react';
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

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    getAllOrders()
      .then((res) => setOrders(res.data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const FILTERS = ['ALL', 'PLACED', 'PREPARING', 'DELIVERING', 'DELIVERED', 'CANCELLED'];

  const filtered = filter === 'ALL'
    ? orders
    : orders.filter((o) => o.status === filter);

  const totalRevenue = orders
    .filter((o) => o.status === 'DELIVERED')
    .reduce((sum, o) => sum + Number(o.totalAmount), 0);

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

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">All Orders 📋</h1>
          <p className="text-sm text-gray-400 mt-1">{orders.length} total orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#1A1A2E]">{orders.length}</p>
            <p className="text-xs text-gray-400 mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === 'DELIVERED').length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Delivered</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-red-500">
              {orders.filter((o) => o.status === 'CANCELLED').length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Cancelled</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-lg font-bold text-[#FF6B35]">
              ₦{totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">Revenue</p>
          </div>
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

        {/* Orders */}
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-[#1A1A2E] text-sm">Order #{order.id}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {order.customerEmail} → {order.vendorName}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MapPin size={10} />
                  {order.deliveryAddress}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="font-bold text-[#FF6B35] whitespace-nowrap">
                ₦{Number(order.totalAmount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}