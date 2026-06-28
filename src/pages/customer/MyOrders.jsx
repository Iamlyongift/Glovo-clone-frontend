import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../api/orders';
import { submitRating } from '../../api/ratings';
import { MapPin, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  PLACED:            'bg-blue-100 text-blue-700',
  ACCEPTED:          'bg-indigo-100 text-indigo-700',
  PREPARING:         'bg-yellow-100 text-yellow-700',
  READY_FOR_PICKUP:  'bg-orange-100 text-orange-700',
  PICKED_UP:         'bg-purple-100 text-purple-700',
  DELIVERING:        'bg-purple-100 text-purple-700',
  DELIVERED:         'bg-green-100 text-green-700',
  CANCELLED:         'bg-red-100 text-red-600',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ratedOrders, setRatedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const handleRatingSubmit = async () => {
    setSubmitting(true);
    try {
      await submitRating({ orderId: ratingOrder.id, stars, review });
      toast.success('Rating submitted! ⭐');
      setRatedOrders((prev) => [...prev, ratingOrder.id]);
      setRatingOrder(null);
      setStars(5);
      setReview('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">My Orders 📦</h1>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-gray-500 font-medium">No orders yet</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-6 bg-[#FF6B35] hover:bg-[#E8541A] text-white px-6 py-3 rounded-xl text-sm font-semibold transition">
              Order Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">

                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-[#1A1A2E]">{order.vendorName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Order #{order.id} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-100 pt-3 space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-500">
                        ₦{Number(item.subtotal).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={12} />
                    {order.deliveryAddress}
                  </div>
                  <p className="font-bold text-[#FF6B35]">
                    ₦{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>

                {/* Note */}
                {order.note && (
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Note: {order.note}
                  </p>
                )}

                {/* Rate button — only for DELIVERED orders */}
                {order.status === 'DELIVERED' && !ratedOrders.includes(order.id) && (
                  <button
                    onClick={() => setRatingOrder(order)}
                    className="mt-3 w-full border border-[#FF6B35] text-[#FF6B35] hover:bg-orange-50 text-sm font-semibold py-2 rounded-xl transition">
                    ⭐ Rate this order
                  </button>
                )}

                {ratedOrders.includes(order.id) && (
                  <p className="mt-3 text-center text-xs text-green-600 font-medium">
                    ✅ You rated this order
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-1">
              Rate {ratingOrder.vendorName}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              How was your experience with order #{ratingOrder.id}?
            </p>

            {/* Star selector */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setStars(s)}>
                  <Star
                    size={28}
                    fill={s <= stars ? '#FACC15' : 'none'}
                    className={s <= stars ? 'text-yellow-400' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>

            {/* Review text */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a review (optional)..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition resize-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setRatingOrder(null)}
                className="flex-1 border border-gray-200 text-gray-500 hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold transition">
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={submitting}
                className="flex-1 bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition">
                {submitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}