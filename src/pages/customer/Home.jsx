import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVendors } from '../../api/vendors';
import { MapPin, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getVendors()
      .then((res) => setVendors(res.data))
      .catch(() => toast.error('Failed to load vendors'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.cuisineType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* Hero Banner */}
      <div className="bg-[#1A1A2E] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hungry? We've got you 🍽️
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Order from the best restaurants in your area
        </p>
        <input
          type="text"
          placeholder="Search restaurants or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
        />
      </div>

      {/* Vendor Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
          {search ? `Results for "${search}"` : 'Open Restaurants'}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-52 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-lg font-medium">No restaurants found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => navigate(`/vendors/${vendor.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden group">

                {/* Vendor Image Placeholder */}
                <div className="bg-gradient-to-br from-[#FF6B35] to-[#E8541A] h-36 flex items-center justify-center group-hover:opacity-90 transition">
                  <span className="text-5xl">🍽️</span>
                </div>

                {/* Vendor Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-[#1A1A2E] text-base">{vendor.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      vendor.open
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {vendor.open ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">{vendor.cuisineType || 'Restaurant'}</p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {vendor.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-400"
                        fill="#FACC15"
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">New</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}