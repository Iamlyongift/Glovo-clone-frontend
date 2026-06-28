import { useEffect, useState } from 'react';
import { getAllVendors, toggleVendorOpen } from '../../api/admin';
import { Store } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    getAllVendors()
      .then((res) => setVendors(res.data))
      .catch(() => toast.error('Failed to load vendors'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (vendorId) => {
    setToggling(vendorId);
    try {
      const res = await toggleVendorOpen(vendorId);
      setVendors((prev) => prev.map((v) => (v.id === vendorId ? res.data : v)));
      toast.success(`Vendor ${res.data.isOpen ? 'opened' : 'closed'}`);
    } catch {
      toast.error('Failed to update vendor');
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-gray-400 animate-pulse text-sm">Loading vendors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">All Vendors 🏪</h1>
          <p className="text-sm text-gray-400 mt-1">{vendors.length} registered vendors</p>
        </div>

        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4">

              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#E8541A] rounded-xl flex items-center justify-center flex-shrink-0">
                <Store size={20} className="text-white" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-[#1A1A2E]">{vendor.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    vendor.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {vendor.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{vendor.ownerEmail}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{vendor.cuisineType}</span>
                  <span>·</span>
                  <span>{vendor.address}</span>
                  <span>·</span>
                  <span>{vendor.menuItemCount} items</span>
                </div>
              </div>

              {/* Toggle */}
              <button
                onClick={() => handleToggle(vendor.id)}
                disabled={toggling === vendor.id}
                className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${
                  vendor.isOpen
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}>
                {toggling === vendor.id ? '...' : vendor.isOpen ? 'Close' : 'Open'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}