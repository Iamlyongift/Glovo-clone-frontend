import { Link } from 'react-router-dom';

const features = [
  { emoji: '🍽️', title: 'Local Restaurants', desc: 'Order from the best restaurants in your town' },
  { emoji: '🛵', title: 'Fast Delivery', desc: 'Couriers ready to bring food to your door' },
  { emoji: '📦', title: 'Track Orders', desc: 'Know exactly where your order is at all times' },
  { emoji: '⭐', title: 'Rate & Review', desc: 'Share your experience after every delivery' },
];

const steps = [
  { step: '01', title: 'Choose a restaurant', desc: 'Browse vendors near you and pick what you love' },
  { step: '02', title: 'Add to cart', desc: 'Select your meals and customize your order' },
  { step: '03', title: 'We deliver', desc: 'A courier picks up and brings it straight to you' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <span className="text-xl font-bold">
          <span className="text-[#FF6B35]">🛵 Glovo</span>
          <span className="text-[#1A1A2E]"> Clone</span>
        </span>
        <div className="flex items-center gap-3">
          <Link to="/login"
            className="text-[#1A1A2E] text-sm font-semibold hover:text-[#FF6B35] transition px-4 py-2">
            Login
          </Link>
          <Link to="/register"
            className="bg-[#FF6B35] hover:bg-[#E8541A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FF6B35] to-[#E8541A] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              🚀 Now serving Delta State
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Food delivery <br />
              <span className="text-[#1A1A2E]">and more</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Order from your favourite local restaurants and get it delivered fast — right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/register"
                className="bg-[#1A1A2E] hover:bg-[#2d2d4e] text-white font-bold px-8 py-4 rounded-xl transition text-sm">
                Order Now — It's Free
              </Link>
              <Link to="/login"
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl transition text-sm">
                Login to Account
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-9xl">🍽️</span>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white text-[#1A1A2E] rounded-2xl shadow-lg px-4 py-2 text-xs font-bold">
                🛵 Fast Delivery
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-[#1A1A2E] rounded-2xl shadow-lg px-4 py-2 text-xs font-bold">
                ⭐ Top Rated
              </div>
              <div className="absolute top-1/2 -left-8 bg-[#1A1A2E] text-white rounded-2xl shadow-lg px-4 py-2 text-xs font-bold">
                🔥 Order Now
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E]">Why choose Glovo Clone?</h2>
            <p className="text-gray-400 mt-3">Everything you need, delivered to you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title}
                className="bg-[#F8F9FA] rounded-2xl p-6 text-center hover:shadow-md transition group">
                <div className="w-14 h-14 bg-[#FF6B35]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF6B35]/20 transition">
                  <span className="text-3xl">{f.emoji}</span>
                </div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#1A1A2E] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold">How it works</h2>
            <p className="text-gray-400 mt-3">Three simple steps to get your food</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-extrabold text-xl">{s.step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-white/10" />
                )}
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-[#1A1A2E]">Join as anyone</h2>
            <p className="text-gray-400 mt-3">Glovo Clone works for everyone in the chain</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '🍔', role: 'Customer', desc: 'Order food from local restaurants and track deliveries in real time', color: 'from-orange-50 to-orange-100', badge: 'bg-orange-100 text-orange-700' },
              { emoji: '🏪', role: 'Vendor', desc: 'List your restaurant, manage your menu and process incoming orders', color: 'from-purple-50 to-purple-100', badge: 'bg-purple-100 text-purple-700' },
              { emoji: '🛵', role: 'Courier', desc: 'Pick up available orders and deliver them to earn on your schedule', color: 'from-green-50 to-green-100', badge: 'bg-green-100 text-green-700' },
            ].map((card) => (
              <div key={card.role}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 hover:shadow-md transition`}>
                <span className="text-4xl mb-4 block">{card.emoji}</span>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold text-[#1A1A2E] text-lg">{card.role}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.badge}`}>
                    {card.role}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-[#FF6B35] to-[#E8541A] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to order? 🍽️
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of happy customers in Delta State
          </p>
          <Link to="/register"
            className="inline-block bg-[#1A1A2E] hover:bg-[#2d2d4e] text-white font-bold px-10 py-4 rounded-xl transition text-sm">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-400 py-8 px-6 text-center text-sm">
        <p className="text-white font-bold mb-1">
          <span className="text-[#FF6B35]">🛵 Glovo</span> Clone
        </p>
        <p>Built with ❤️ in Delta State, Nigeria</p>
        <p className="mt-2 text-xs">© {new Date().getFullYear()} Glovo Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}