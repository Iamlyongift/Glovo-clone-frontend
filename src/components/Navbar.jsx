import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart, LogOut, LayoutDashboard,
  UtensilsCrossed, Truck, Users, Menu, X
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const navLinks = () => {
    if (!user) return [];
    switch (user.role) {
      case 'CUSTOMER': return [
        { to: '/home', label: 'Home' },
        { to: '/my-orders', label: 'My Orders' },
      ];
      case 'VENDOR': return [
        { to: '/vendor/dashboard', label: 'Orders', icon: <LayoutDashboard size={14} /> },
        { to: '/vendor/menu', label: 'Menu', icon: <UtensilsCrossed size={14} /> },
      ];
      case 'COURIER': return [
        { to: '/courier/orders', label: 'Available', icon: <Truck size={14} /> },
        { to: '/courier/deliveries', label: 'My Deliveries' },
      ];
      case 'ADMIN': return [
        { to: '/admin/users', label: 'Users', icon: <Users size={14} /> },
        { to: '/admin/vendors', label: 'Vendors' },
        { to: '/admin/orders', label: 'Orders' },
      ];
      default: return [];
    }
  };

  const links = navLinks();

  return (
    <nav className="bg-[#1A1A2E] text-white shadow-lg sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-[#FF6B35] text-xl font-bold">🛵 Glovo</span>
            <span className="text-white text-xl font-bold">Clone</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-300 text-sm">
                Hi, <span className="text-[#FF6B35] font-semibold">{user.fullName}</span>
              </span>
              {user.role === 'CUSTOMER' && (
                <Link to="/cart"
                  className="flex items-center gap-1 bg-[#FF6B35] hover:bg-[#E8541A] px-3 py-2 rounded-lg text-sm font-medium transition">
                  <ShoppingCart size={16} />
                  Cart
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-gray-300 hover:text-white text-sm transition">Login</Link>
              <Link to="/register"
                className="bg-[#FF6B35] hover:bg-[#E8541A] px-4 py-2 rounded-lg text-sm font-medium transition">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/10 px-6 py-4 space-y-3">
          {/* User greeting */}
          {user && (
            <p className="text-sm text-gray-400 pb-2 border-b border-white/10">
              Hi, <span className="text-[#FF6B35] font-semibold">{user.fullName}</span>
            </p>
          )}

          {/* Nav links */}
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm py-1 transition">
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* Cart for customers */}
          {user?.role === 'CUSTOMER' && (
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm py-1 transition">
              <ShoppingCart size={14} />
              Cart
            </Link>
          )}

          {/* Auth actions */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm py-1 transition w-full">
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <div className="space-y-2 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="block text-gray-300 hover:text-white text-sm transition">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="block bg-[#FF6B35] hover:bg-[#E8541A] text-white text-sm px-4 py-2 rounded-lg text-center transition">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}