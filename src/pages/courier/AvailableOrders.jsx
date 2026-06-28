import { useEffect, useState } from 'react';
import { getAvailableOrders, claimOrder } from '../../api/delivery';
import { MapPin, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AvailableOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    getAvailableOrders()
      .then((res) => setOrders(res.data))
      .catch(() => toast.error('Failed to load available orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleClaim = async (orderId) => {
    setClaiming(orderId);
    try {
      await claimOrder(orderId);
      toast.success(`Order #${orderId} claimed! Head to the restaurant.`);
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to claim order');
    } finally {
      setClaiming(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading available orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Available Orders 🛵</h1>
            <p className="text-sm text-gray-400 mt-1">
              {orders.length} order{orders.length !== 1 ? 's' : ''} waiting for pickup
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-xl hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
            Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-medium">No orders available right now</p>
            <p className="text-sm mt-1">Check back in a moment</p>
            <button
              onClick={fetchOrders}
              className="mt-6 bg-[#FF6B35] hover:bg-[#E8541A] text-white px-6 py-3 rounded-xl text-sm font-semibold transition">
              Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId}
                className="bg-white rounded-2xl shadow-sm p-5">

                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-[#1A1A2E]">{order.vendorName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Order #{order.orderId}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                    Ready for Pickup
                  </span>
                </div>

                {/* Route */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Pickup from</p>
                      <p className="text-gray-700 font-medium">{order.vendorAddress}</p>
                    </div>
                  </div>
                  <div className="ml-1 border-l-2 border-dashed border-gray-200 h-4" />
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Deliver to</p>
                      <p className="text-gray-700 font-medium">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-[#1A1A2E]">{order.itemCount}</span> item{order.itemCount !== 1 ? 's' : ''}
                  </div>
                  <p className="font-bold text-[#FF6B35]">
                    ₦{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>

                {/* Claim Button */}
                <button
                  onClick={() => handleClaim(order.orderId)}
                  disabled={claiming === order.orderId}
                  className="w-full bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition">
                  {claiming === order.orderId ? 'Claiming...' : '🛵 Claim this order'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}