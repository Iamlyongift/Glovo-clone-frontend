import { useEffect, useState } from 'react';
import { getMyVendor, addMenuItem } from '../../api/vendors';
import { uploadImage } from '../../api/cloudinary';
import { useAuth } from '../../context/AuthContext';
import { Plus, UtensilsCrossed, ImagePlus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuManager() {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', imageUrl: ''
  });

  useEffect(() => {
  getMyVendor()
    .then((res) => setVendor(res.data))
    .catch(() => toast.error('Failed to load your vendor profile'))
    .finally(() => setLoading(false));
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagePick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // show local preview immediately
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success('Image uploaded!');
    } catch {
      toast.error('Image upload failed. Try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setForm((prev) => ({ ...prev, imageUrl: '' }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!vendor) {
    toast.error('No vendor profile found. Please create your restaurant profile first.');
    return;
  }
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
    setPreview(null);
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
      <div className="h-1 bg-gradient-to-r from-[#FF6B35] via-[#E8541A] to-[#1A1A2E]" />
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

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Food Image
                </label>
                {preview ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <p className="text-white text-sm font-semibold animate-pulse">
                          Uploading...
                        </p>
                      </div>
                    )}
                    {!uploading && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#FF6B35] hover:bg-orange-50 transition">
                    <ImagePlus size={28} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-400">Click to upload food image</p>
                    <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImagePick}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

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

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setPreview(null); }}
                  className="flex-1 border border-gray-200 text-gray-500 hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="flex-1 bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition">
                  {submitting ? 'Adding...' : uploading ? 'Uploading image...' : 'Add to Menu'}
                </button>
              </div>
            </form>
          </div>
        )}

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
                className="bg-white rounded-2xl shadow-sm overflow-hidden flex items-center gap-4">

                {/* Food Image */}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B35] to-[#E8541A] flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">🍽️</span>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 py-4 pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
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