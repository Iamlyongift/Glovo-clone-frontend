import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVendorById } from '../../api/vendors';
import { addToCart } from '../../api/cart';
import { MapPin, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [addingItem, setAddingItem] = useState(null);

  useEffect(() => {
    getVendorById(id)
      .then((res) => setVendor(res.data))
      .catch(() => toast.error('Failed to load vendor'))
      .finally(() => setLoading(false));
  }, [id]);

  const increment = (itemId) => {
    setQuantities((prev) => ({ ...prev, [itemId]: (prev[itemId] || 1) + 1 }));
  };

  const decrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1),
    }));
  };

  const handleAddToCart = async (item) => {
    setAddingItem(item.id);
    try {
      await addToCart({ menuItemId: item.id, quantity: quantities[item.id] || 1 });
      toast.success(`${item.name} added to cart!`);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add to cart';
      toast.error(msg);
    } finally {
      setAddingItem(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Loading menu...</p>
      </div>
    );
  }

  if (!vendor) return null;

  return (
   <div className="min-h-screen bg-[#F8F9FA]">

  {/* Vendor Hero */}
  <div className="bg-gradient-to-br from-[#FF6B35] to-[#E8541A] h-48 flex items-center justify-center relative">
    <span className="text-7xl">🍽️</span>
    <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
      vendor.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
    }`}>
      {vendor.open ? 'Open' : 'Closed'}
    </span>
  </div>

  {/* Vendor Info */}
  <div className="max-w-3xl mx-auto px-6">
    <div className="bg-white rounded-2xl shadow-sm p-6 -mt-8 relative z-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">{vendor.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{vendor.cuisineType}</p>
          {vendor.description && (
            <p className="text-sm text-gray-600 mt-2">{vendor.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {vendor.address}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400" fill="#FACC15" />
        ))}
        <span className="text-xs text-gray-400 ml-1">
          {vendor.menuItems?.length || 0} items on menu
        </span>
      </div>
    </div>

    {/* Menu Items */}
    <div className="mt-8 mb-24">
      <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">Menu</h2>

      {vendor.menuItems?.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p>No menu items yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vendor.menuItems?.map((item) => (
            <div key={item.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex gap-4">

              {/* Food Image */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-28 h-28 object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-28 h-28 bg-gradient-to-br from-[#FF6B35] to-[#E8541A] flex-shrink-0 flex items-center justify-center ${
                  item.imageUrl ? 'hidden' : 'flex'
                }`}>
                <span className="text-3xl">🍽️</span>
              </div>

              {/* Item Info + Controls */}
              <div className="flex-1 flex items-center justify-between gap-4 pr-4 py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#1A1A2E]">{item.name}</h3>
                    {!item.available && (
                      <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                        Unavailable
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  )}
                  <p className="text-[#FF6B35] font-bold mt-2">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>

                {/* Quantity + Add */}
                {item.available && vendor.open && (
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingItem === item.id}
                      className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white text-xs font-semibold px-3 py-2 rounded-xl transition">
                      <ShoppingCart size={12} />
                      {addingItem === item.id ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>

    {/* View Cart Button */}
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-20">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#2d2d4e] text-white px-8 py-3 rounded-full shadow-lg font-semibold text-sm transition">
        <ShoppingCart size={16} />
        View Cart
      </button>
    </div>
  </div>
</div>
  );
}