import { Link } from 'react-router-dom';
import {
  Zap, Star, MapPin, ShieldCheck,
  UtensilsCrossed, Clock, Truck, ChevronRight,
  Mail, Phone, Share2, MessageCircle, AtSign
} from 'lucide-react';

const features = [
  {
    icon: <UtensilsCrossed size={24} className="text-[#FF6B35]" />,
    title: 'Local Restaurants',
    desc: 'Discover the best restaurants and home kitchens in your area — from local delicacies to fast food.',
  },
  {
    icon: <Zap size={24} className="text-[#FF6B35]" />,
    title: 'Lightning Fast',
    desc: 'Our couriers are always ready. Most orders are delivered in under 30 minutes.',
  },
  {
    icon: <MapPin size={24} className="text-[#FF6B35]" />,
    title: 'Live Tracking',
    desc: 'Know exactly where your order is at every step — from kitchen to your doorstep.',
  },
  {
    icon: <ShieldCheck size={24} className="text-[#FF6B35]" />,
    title: 'Safe & Secure',
    desc: 'Your data and payments are fully protected. Order with complete peace of mind.',
  },
];

const steps = [
  { step: '01', icon: <UtensilsCrossed size={28} className="text-white" />, title: 'Choose a restaurant', desc: 'Browse vendors in your area and pick what you love' },
  { step: '02', icon: <Clock size={28} className="text-white" />, title: 'Place your order', desc: 'Add items to cart, enter your address and checkout in seconds' },
  { step: '03', icon: <Truck size={28} className="text-white" />, title: 'Fast delivery', desc: 'A courier picks up and brings it straight to your door' },
];

const roles = [
  {
    emoji: '🍔',
    role: 'Customer',
    desc: 'Order food from local restaurants and track deliveries in real time',
    from: 'from-orange-50',
    to: 'to-orange-100',
    badge: 'bg-orange-100 text-orange-700',
    border: 'hover:border-orange-300',
  },
  {
    emoji: '🏪',
    role: 'Vendor',
    desc: 'List your restaurant, manage your menu and process incoming orders with ease',
    from: 'from-purple-50',
    to: 'to-purple-100',
    badge: 'bg-purple-100 text-purple-700',
    border: 'hover:border-purple-300',
  },
  {
    emoji: '🛵',
    role: 'Courier',
    desc: 'Pick up available orders and deliver them to earn money on your own schedule',
    from: 'from-green-50',
    to: 'to-green-100',
    badge: 'bg-green-100 text-green-700',
    border: 'hover:border-green-300',
  },
];

const foodItems = [
  { emoji: '🍔', label: 'Burgers', delay: '0s', duration: '2s' },
  { emoji: '🍕', label: 'Pizza', delay: '0.3s', duration: '2.4s' },
  { emoji: '🥤', label: 'Drinks', delay: '0.6s', duration: '2.2s' },
  { emoji: '🛒', label: 'Groceries', delay: '0.2s', duration: '2.6s' },
  { emoji: '🍲', label: 'Local Food', delay: '0.4s', duration: '2s' },
  { emoji: '🍟', label: 'Snacks', delay: '0.5s', duration: '2.3s' },
  { emoji: '🍰', label: 'Desserts', delay: '0.7s', duration: '2.1s' },
];

const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Support: ['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  'For Business': ['Become a Vendor', 'Become a Courier', 'Partner with Us', 'Advertise'],
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-extrabold text-[#FF6B35]">🛵 QuickChop</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#features" className="hover:text-[#FF6B35] transition">Features</a>
          <a href="#how-it-works" className="hover:text-[#FF6B35] transition">How it works</a>
          <a href="#join" className="hover:text-[#FF6B35] transition">Join Us</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login"
            className="text-[#1A1A2E] text-sm font-semibold hover:text-[#FF6B35] transition px-4 py-2 hidden sm:block">
            Login
          </Link>
          <Link to="/register"
            className="bg-[#FF6B35] hover:bg-[#E8541A] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md hover:shadow-lg">
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FF6B35] via-[#f05e28] to-[#E8541A] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">

          {/* Left */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Now live in Delta State 🇳🇬
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Everything you love,
              <br />
              <span className="text-[#1A1A2E]">delivered fast.</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              From your favourite local spot to grocery runs — QuickChop gets it to your door in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
              <Link to="/register"
                className="flex items-center justify-center gap-2 bg-[#1A1A2E] hover:bg-[#2d2d4e] text-white font-bold px-8 py-4 rounded-xl transition shadow-xl text-sm">
                Order Now — It's Free
                <ChevronRight size={16} />
              </Link>
              <Link to="/login"
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition border border-white/30 text-sm">
                Login to Account
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 justify-center md:justify-start text-sm text-white/70">
              <div className="flex items-center gap-1">
                <Star size={14} fill="white" className="text-white" />
                <span className="font-semibold text-white">4.8</span> rating
              </div>
              <div className="w-px h-4 bg-white/30" />
              <span>🏪 Multiple vendors</span>
              <div className="w-px h-4 bg-white/30" />
              <span>🛵 Fast couriers</span>
            </div>
          </div>

          {/* Right — Animated food grid */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-white/10 rounded-full" />

              {/* Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2s infinite`, animationDelay: '0s' }}>
                <span className="text-3xl block">🍔</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Burgers</span>
              </div>

              {/* Top right */}
              <div className="absolute top-8 right-0 translate-x-2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.4s infinite`, animationDelay: '0.3s' }}>
                <span className="text-3xl block">🍕</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Pizza</span>
              </div>

              {/* Right */}
              <div className="absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.2s infinite`, animationDelay: '0.6s' }}>
                <span className="text-3xl block">🥤</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Drinks</span>
              </div>

              {/* Bottom right */}
              <div className="absolute bottom-8 right-0 translate-x-2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.6s infinite`, animationDelay: '0.2s' }}>
                <span className="text-3xl block">🛒</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Groceries</span>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2s infinite`, animationDelay: '0.4s' }}>
                <span className="text-3xl block">🍲</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Local Food</span>
              </div>

              {/* Bottom left */}
              <div className="absolute bottom-8 left-0 -translate-x-2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.3s infinite`, animationDelay: '0.5s' }}>
                <span className="text-3xl block">🍟</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Snacks</span>
              </div>

              {/* Left */}
              <div className="absolute top-1/2 left-0 -translate-x-6 -translate-y-1/2 bg-white rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.1s infinite`, animationDelay: '0.7s' }}>
                <span className="text-3xl block">🍰</span>
                <span className="text-xs font-bold text-[#1A1A2E]">Desserts</span>
              </div>

              {/* Top left — Rider */}
              <div className="absolute top-8 left-0 -translate-x-2 bg-[#1A1A2E] rounded-2xl shadow-xl px-4 py-3 text-center"
                style={{ animation: `bounce 2.5s infinite`, animationDelay: '0.1s' }}>
                <span className="text-3xl block">🛵</span>
                <span className="text-xs font-bold text-white">Delivery</span>
              </div>

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-5 text-center shadow-2xl border border-white/30">
                  <span className="text-5xl block mb-1">🛵</span>
                  <p className="text-white font-extrabold text-sm">Order</p>
                  <p className="text-white font-extrabold text-sm">Anything</p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-white/80 text-xs">30 min delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="w-full overflow-hidden leading-none -mb-1">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#ffffff" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B35] text-sm font-bold uppercase tracking-widest">Why QuickChop</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mt-2">
              Built for your city
            </h2>
            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              We're not just another delivery app — we're your neighbour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center
                  shadow-md hover:shadow-xl transition-all duration-300
                  hover:-translate-y-1 hover:border-[#FF6B35]/30 group cursor-default">
                <div className="w-14 h-14 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4
                  group-hover:bg-[#FF6B35]/20 group-hover:scale-110 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2 text-base">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B35] text-sm font-bold uppercase tracking-widest">Simple process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              How it works
            </h2>
            <p className="text-gray-400 mt-3">From hungry to full in three easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35]/20" />

            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center group">
                <div className="w-20 h-20 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-6
                  shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <span className="text-[#FF6B35]/40 text-xs font-bold uppercase tracking-widest">
                  Step {s.step}
                </span>
                <h3 className="font-bold text-white text-lg mt-1 mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section id="join" className="py-24 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B35] text-sm font-bold uppercase tracking-widest">Join the platform</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A2E] mt-2">
              There's a role for everyone
            </h2>
            <p className="text-gray-400 mt-3">Whether you're ordering, cooking, or delivering</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {roles.map((card) => (
              <div key={card.role}
                className={`bg-gradient-to-br ${card.from} ${card.to} rounded-2xl p-8
                  border-2 border-transparent ${card.border}
                  hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
                <span className="text-5xl mb-5 block
                  group-hover:scale-110 transition-transform duration-300">
                  {card.emoji}
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-extrabold text-[#1A1A2E] text-xl">{card.role}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badge}`}>
                    {card.role}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.desc}</p>
                <Link to="/register"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#FF6B35] hover:gap-2 transition-all">
                  Join as {card.role} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '20+', label: 'Restaurants' },
              { value: '30min', label: 'Avg Delivery Time' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-[#FF6B35]">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#FF6B35] to-[#E8541A] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-2xl mx-auto px-6 text-center text-white relative z-10">
          <span className="text-4xl mb-4 block">🍽️</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Hungry right now?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of happy customers across Delta State. Your favourite meal is just a tap away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#1A1A2E] hover:bg-[#2d2d4e] text-white font-bold px-10 py-4 rounded-xl transition shadow-xl text-sm">
              Create Free Account <ChevronRight size={16} />
            </Link>
            <Link to="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-10 py-4 rounded-xl transition border border-white/30 text-sm">
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-400">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <p className="text-xl font-extrabold text-white mb-3">
                🛵 <span className="text-[#FF6B35]">Quick</span>Chop
              </p>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Your favourite food delivery platform, built for Delta State. Fast, reliable, and always nearby.
              </p>
              {/* Social */}
             {/* Social */}
<div className="flex items-center gap-3">
  {[
    { icon: <AtSign size={16} />, href: '#', label: 'Instagram' },
    { icon: <MessageCircle size={16} />, href: '#', label: 'Twitter' },
    { icon: <Share2 size={16} />, href: '#', label: 'Facebook' },
  ].map((s, i) => (
    <a key={i} href={s.href}
      title={s.label}
      className="w-9 h-9 bg-white/10 hover:bg-[#FF6B35] rounded-lg flex items-center justify-center transition text-gray-400 hover:text-white">
      {s.icon}
    </a>
  ))}
</div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-white font-bold text-sm mb-4">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#"
                        className="text-sm hover:text-[#FF6B35] transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <a href="mailto:hello@quickchop.ng"
                className="flex items-center gap-2 hover:text-[#FF6B35] transition">
                <Mail size={14} />
                hello@quickchop.ng
              </a>
              <a href="tel:+2348000000000"
                className="flex items-center gap-2 hover:text-[#FF6B35] transition">
                <Phone size={14} />
                +234 800 000 0000
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} QuickChop. Built with ❤️ in Delta State, Nigeria. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}