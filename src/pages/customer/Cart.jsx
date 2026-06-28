import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem, clearCart } from '../../api/cart';
import { placeOrder } from '../../api/orders';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [ordering, setOrdering] = useState(false);
  const navigate = useNavigate();

  const fetchCart = () => {
    getCart()
      .then((res) => setCart(res.data))
      .catch(() => toast.error('Failed to load cart'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCart(); }, []);

  const handleIncrement = async (item) => {
    try {
      const res = await updateCartItem(item.cartItemId, { quantity: item.quantity + 1 });
      setCart(res.data);
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity === 1) return;
    try {
      const res = await updateCartItem(item.cartItemId, { quantity: item.quantity - 1 });
      setCart(res.data);
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      const res = await removeCartItem(cartItemId);
      setCart(res.data);
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
      setCart((prev) => ({ ...prev, items: [], totalAmount: 0, vendorName: null }));
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }
    setOrdering(true);
    try {
      await placeOrder({ deliveryAddress: address, note });
      toast.success('Order placed successfully! 🎉');
      navigate('/my-orders');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading cart...</p>
      </div>
    );
  }

  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Your Cart 🛒</h1>
          {!isEmpty && (
            <button
              onClick={handleClear}
              className="text-sm text-red-400 hover:text-red-600 transition">
              Clear all
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="text-center py-24">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add items from a restaurant to get started</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-6 bg-[#FF6B35] hover:bg-[#E8541A] text-white px-6 py-3 rounded-xl text-sm font-semibold transition">
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            {/* Vendor name */}
            <p className="text-sm text-gray-500 mb-4">
              Ordering from <span className="font-semibold text-[#FF6B35]">{cart.vendorName}</span>
            </p>

            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.items.map((item) => (
                <div key={item.cartItemId}
                  className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A2E] text-sm">{item.name}</p>
                    <p className="text-[#FF6B35] font-bold text-sm mt-1">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm font-bold text-[#1A1A2E] w-20 text-right">
                    ₦{Number(item.subtotal).toLocaleString()}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemove(item.cartItemId)}
                    className="text-gray-300 hover:text-red-400 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center mb-6">
              <span className="font-semibold text-[#1A1A2E]">Total</span>
              <span className="text-xl font-bold text-[#FF6B35]">
                ₦{Number(cart.totalAmount).toLocaleString()}
              </span>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 space-y-4">
              <h2 className="font-bold text-[#1A1A2E]">Delivery Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Delivery Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 45 Effurun Road, Delta State"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Note to restaurant (optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Extra pepper please"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                />
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              className="w-full bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white font-bold py-4 rounded-2xl text-sm transition">
              {ordering ? 'Placing order...' : `Place Order — ₦${Number(cart.totalAmount).toLocaleString()}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}