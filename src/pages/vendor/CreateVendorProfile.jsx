import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVendor } from '../../api/vendors';
import { Store, MapPin, UtensilsCrossed, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const CUISINE_TYPES = [
  'Local Nigerian',
  'Fast Food',
  'Continental',
  'Chinese',
  'Shawarma & Grills',
  'Pizza',
  'Seafood',
  'Vegetarian',
  'Bakery & Pastries',
  'Drinks & Smoothies',
];

export default function CreateVendorProfile() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    cuisineType: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createVendor(form);
      toast.success('Restaurant profile created! 🎉');
      navigate('/vendor/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Store size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A1A2E]">
            Set up your restaurant
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Tell customers about your restaurant before you can add menu items
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                Restaurant Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Mama Pat's Kitchen"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                Description
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell customers what makes your restaurant special..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition resize-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                Restaurant Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g. 12 Market Road, Effurun, Delta State"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                />
              </div>
            </div>

            {/* Cuisine Type */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                Cuisine Type <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <UtensilsCrossed size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="cuisineType"
                  value={form.cuisineType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition bg-white appearance-none">
                  <option value="">Select cuisine type</option>
                  {CUISINE_TYPES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#FF6B35] hover:bg-[#E8541A] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition text-sm mt-2">
              {submitting ? 'Creating profile...' : 'Create Restaurant Profile →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          You can update these details later from your dashboard settings
        </p>
      </div>
    </div>
  );
}