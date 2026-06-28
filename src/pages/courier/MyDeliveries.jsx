import { useEffect, useState } from 'react';
import { getMyDeliveries, updateDeliveryStatus } from '../../api/delivery';
import { MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  ASSIGNED:  'bg-blue-100 text-blue-700',
  PICKED_UP: 'bg-yellow-100 text-yellow-700',
  DELIVERING:'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
};

const NEXT_STATUS = {
  ASSIGNED:  'PICKED_UP',
  PICKED_UP: 'DELIVERING',
  DELIVERING:'DELIVERED',
};

const NEXT_LABEL = {
  ASSIGNED:  '📦 Confirm Pickup',
  PICKED_UP: '🛵 Start Delivering',
  DELIVERING:'✅ Mark as Delivered',
};

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getMyDeliveries()
      .then((res) => setDeliveries(res.data))
      .catch(() => toast.error('Failed to load deliveries'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (deliveryId, newStatus) => {
    setUpdating(deliveryId);
    try {
      const res = await updateDeliveryStatus(deliveryId, newStatus);
      setDeliveries((prev) =>
        prev.map((d) => (d.deliveryId === deliveryId ? res.data : d))
      );
      toast.success(`Delivery updated to ${newStatus.replace(/_/g, ' ')}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update delivery');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading deliveries...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-2xl mx-auto px-6 py-10">

        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-6">My Deliveries 📦</h1>

        {deliveries.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🛵</p>
            <p className="font-medium">No deliveries yet</p>
            <p className="text-sm mt-1">Claim an order to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.deliveryId}
                className="bg-white rounded-2xl shadow-sm p-5">

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-[#1A1A2E]">
                      Order #{delivery.orderId}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      For {delivery.customerName}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[delivery.status]}`}>
                    {delivery.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Delivery address */}
                <div className="flex items-start gap-2 text-sm mb-3">
                  <MapPin size={14} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">{delivery.deliveryAddress}</p>
                </div>

                {/* Timestamps */}
                <div className="space-y-1 mb-4">
                  {delivery.assignedAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      Assigned: {new Date(delivery.assignedAt).toLocaleString()}
                    </div>
                  )}
                  {delivery.pickedUpAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      Picked up: {new Date(delivery.pickedUpAt).toLocaleString()}
                    </div>
                  )}
                  {delivery.deliveredAt && (
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <Clock size={11} />
                      Delivered: {new Date(delivery.deliveredAt).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {NEXT_STATUS[delivery.status] && (
                  <button
                    onClick={() => handleStatusUpdate(delivery.deliveryId, NEXT_STATUS[delivery.status])}
                    disabled={updating === delivery.deliveryId}
                    className="w-full bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition">
                    {updating === delivery.deliveryId ? 'Updating...' : NEXT_LABEL[delivery.status]}
                  </button>
                )}

                {delivery.status === 'DELIVERED' && (
                  <div className="text-center py-2 text-green-600 font-semibold text-sm">
                    ✅ Delivery Complete
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}