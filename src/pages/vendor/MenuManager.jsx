import { useEffect, useState } from 'react';
import { getVendors, addMenuItem } from '../../api/vendors';
import { useAuth } from '../../context/AuthContext';
import { Plus, UtensilsCrossed } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuManager() {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', imageUrl: ''
  });

  useEffect(() => {
    getVendors()
      .then((res) => {
        const mine = res.data.find(
          (v) => v.ownerEmail === user?.email || true
        );
        // fetch all open vendors and find the one belonging to logged-in vendor
        setVendor(res.data[0] || null);
      })
      .catch(() => toast.error('Failed to load vendor'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendor) return;
    setSubmitting(true);
    try {
      const res = await addMenuItem(vendor.id, {
        ...form,
        price: parseFloat(form.price),
      });
      setVendor((prev) => ({
        ...prev,
        menuItems: [...(prev.menuItems || []), res.data],
      }));
      toast.success(`${form.name} added to menu!`);
      setForm({ name: '', description: '', price: '', imageUrl: '' });
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Menu Manager 🍴</h1>
            <p className="text-sm text-gray-400 mt-1">
              {vendor?.menuItems?.length || 0} items on your menu
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E8541A] text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
            <Plus size={16} />
            Add Item
          </button>
        </div>

        {/* Add Item Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="font-bold text-[#1A1A2E] mb-4">New Menu Item</h2>
           <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Item Name <span className="text-red-400">*</span>
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="e.g. Jollof Rice"
        required
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Price (₦) <span className="text-red-400">*</span>
      </label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="e.g. 2000"
        required
        min="1"
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Description
    </label>
    <input
      type="text"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Brief description of the dish"
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Image URL (optional)
    </label>
    <input
      type="url"
      name="imageUrl"
      value={form.imageUrl}
      onChange={handleChange}
      placeholder="https://example.com/food-image.jpg"
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
    />
    {/* Live image preview */}
    {form.imageUrl && (
      <div className="mt-3">
        <p className="text-xs text-gray-400 mb-1">Preview:</p>
        <img
          src={form.imageUrl}
          alt="preview"
          onError={(e) => { e.target.style.display = 'none'; }}
          className="w-full h-40 object-cover rounded-xl border border-gray-100"
        />
      </div>
    )}
  </div>

  <div className="flex gap-3 pt-2">
    <button
      type="button"
      onClick={() => setShowForm(false)}
      className="flex-1 border border-gray-200 text-gray-500 hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold transition">
      Cancel
    </button>
    <button
      type="submit"
      disabled={submitting}
      className="flex-1 bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition">
      {submitting ? 'Adding...' : 'Add to Menu'}
    </button>
  </div>
</form>
          </div>
        )}

        {/* Menu Items List */}
       {/* Menu Items List */}
{!vendor?.menuItems?.length ? (
  <div className="text-center py-24 text-gray-400">
    <UtensilsCrossed size={48} className="mx-auto mb-4 text-gray-300" />
    <p className="font-medium">No menu items yet</p>
    <p className="text-sm mt-1">Click "Add Item" to get started</p>
  </div>
) : (
  <div className="space-y-3">
    {vendor.menuItems.map((item) => (
      <div key={item.id}
        className="bg-white rounded-2xl shadow-sm overflow-hidden flex items-center gap-4 p-4">

        {/* Food image */}
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E8541A] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🍽️</span>
          </div>
        )}

        {/* Item Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#1A1A2E]">{item.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              item.available
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-500'
            }`}>
              {item.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          )}
          <p className="text-[#FF6B35] font-bold text-sm mt-2">
            ₦{Number(item.price).toLocaleString()}
          </p>
        </div>

      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
}