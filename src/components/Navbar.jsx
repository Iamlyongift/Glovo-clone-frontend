import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, LayoutDashboard, UtensilsCrossed, Truck, Users } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case 'CUSTOMER':
        return (
          <>
            <Link to="/home" className="text-gray-300 hover:text-white text-sm transition">
              Home
            </Link>
            <Link to="/my-orders" className="text-gray-300 hover:text-white text-sm transition">
              My Orders
            </Link>
          </>
        );
      case 'VENDOR':
        return (
          <>
            <Link to="/vendor/dashboard"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
              <LayoutDashboard size={14} />
              Orders
            </Link>
            <Link to="/vendor/menu"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
              <UtensilsCrossed size={14} />
              Menu
            </Link>
          </>
        );
      case 'COURIER':
        return (
          <>
            <Link to="/courier/orders"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
              <Truck size={14} />
              Available
            </Link>
            <Link to="/courier/deliveries"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
              My Deliveries
            </Link>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <Link to="/admin/users"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
              <Users size={14} />
              Users
            </Link>
            <Link to="/admin/vendors" className="text-gray-300 hover:text-white text-sm transition">
              Vendors
            </Link>
            <Link to="/admin/orders" className="text-gray-300 hover:text-white text-sm transition">
              Orders
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-[#1A1A2E] text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-[#FF6B35] text-xl font-bold">🛵 Glovo</span>
          <span className="text-white text-xl font-bold">Clone</span>
        </Link>

        {/* Role-based nav links */}
        <div className="hidden sm:flex items-center gap-5">
          {navLinks()}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-300 text-sm hidden sm:block">
              Hi, <span className="text-[#FF6B35] font-semibold">{user.fullName}</span>
            </span>

            {user.role === 'CUSTOMER' && (
              <Link to="/cart"
                className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#E8541A] px-3 py-2 rounded-lg text-sm font-medium transition">
                <ShoppingCart size={16} />
                Cart
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition text-sm">
              <LogOut size={16} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="text-gray-300 hover:text-white text-sm transition">
              Login
            </Link>
            <Link to="/register"
              className="bg-[#FF6B35] hover:bg-[#E8541A] px-4 py-2 rounded-lg text-sm font-medium transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}