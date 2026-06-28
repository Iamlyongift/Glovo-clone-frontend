# 🛵 Glovo Clone — Frontend

A modern, responsive food delivery web application built with **React + Vite + Tailwind CSS**. This is the frontend for the Glovo Clone project — a full-featured delivery platform supporting four user roles: Customer, Vendor, Courier, and Admin.

---

## 🌐 Live Demo

> Coming soon — deployment in progress

**Backend API:** [glovo-clone-api](https://github.com/YOUR_USERNAME/glovo-clone) — Spring Boot REST API

---

## ✨ Features by Role

### 👤 Customer
- Browse open restaurants with search and filtering
- View full restaurant menus with food images and pricing
- Add items to cart with quantity controls
- Single-vendor cart lock (can't mix restaurants)
- Checkout with delivery address and notes
- Real-time order status tracking with color-coded badges
- Rate and review vendors after delivery (star rating + written review)

### 🍽️ Vendor
- Order dashboard with stats (new, preparing, ready, delivered)
- Filter orders by status
- Accept, prepare, and mark orders ready for pickup
- Cancel incoming orders
- Menu manager — add and view menu items with image support

### 🛵 Courier
- Browse all orders ready for pickup
- View pickup and dropoff locations per order
- Claim orders (first come, first served)
- Progress deliveries step by step (Pickup → Delivering → Delivered)
- Full delivery history with timestamps

### 🛡️ Admin
- View all registered users with role badges
- Suspend or activate user accounts
- View and toggle vendor open/closed status
- View all orders with revenue stats and status filtering

---

## 🏗️ Project Structure

```
src/
├── api/                  # All API calls (axios)
│   ├── axios.js          # Base instance + JWT interceptor
│   ├── auth.js
│   ├── vendors.js
│   ├── cart.js
│   ├── orders.js
│   ├── delivery.js
│   ├── admin.js
│   └── ratings.js
├── context/
│   └── AuthContext.jsx   # Global auth state (user, token, login, logout)
├── routes/
│   └── ProtectedRoute.jsx # Role-based route guard
├── components/
│   └── Navbar.jsx        # Role-aware navigation
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── customer/
│   │   ├── Home.jsx        # Vendor listing + search
│   │   ├── VendorDetail.jsx # Menu + add to cart
│   │   ├── Cart.jsx         # Cart management + checkout
│   │   └── MyOrders.jsx     # Order history + ratings
│   ├── vendor/
│   │   ├── VendorDashboard.jsx
│   │   └── MenuManager.jsx
│   ├── courier/
│   │   ├── AvailableOrders.jsx
│   │   └── MyDeliveries.jsx
│   ├── admin/
│   │   ├── AdminUsers.jsx
│   │   ├── AdminVendors.jsx
│   │   └── AdminOrders.jsx
│   └── Unauthorized.jsx
├── App.jsx               # Route definitions
└── main.jsx              # Entry point
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 📱 Responsive Design

The app is designed mobile-first and works across all screen sizes:

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | Single column, stacked cards, compact navbar |
| Tablet (640–1024px) | 2-column vendor grid, expanded nav |
| Desktop (> 1024px) | 3-column vendor grid, full layout |

Key responsive features:
- Vendor grid adapts from 1 → 2 → 3 columns
- Navbar collapses text labels on mobile
- Admin tables scroll horizontally on small screens
- Sticky navbar on all devices
- Floating "View Cart" button on vendor detail page

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- [Glovo Clone Backend](https://github.com/YOUR_USERNAME/glovo-clone) running on `localhost:8080`

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/glovo-clone-frontend.git
cd glovo-clone-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

> Make sure the Spring Boot backend is running on port `8080` before starting the frontend.

---

## 🔗 Backend Connection

All API calls go through `src/api/axios.js`. The base URL defaults to `http://localhost:8080`.

JWT tokens are automatically attached to every request via an Axios interceptor. If a `401` response is received, the user is automatically logged out and redirected to `/login`.

---

## 🎨 Color System

| Name | Hex | Usage |
|---|---|---|
| Primary | `#FF6B35` | Buttons, highlights, prices |
| Primary Dark | `#E8541A` | Hover states |
| Dark | `#1A1A2E` | Navbar, headings |
| Light | `#F8F9FA` | Page backgrounds |
| Success | `#10B981` | Delivered, active |
| Warning | `#F59E0B` | Preparing, pending |
| Danger | `#EF4444` | Cancelled, errors |

---

## 🧭 Route Map

| Route | Role | Page |
|---|---|---|
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/home` | CUSTOMER | Browse vendors |
| `/vendors/:id` | CUSTOMER | Vendor menu |
| `/cart` | CUSTOMER | Cart + checkout |
| `/my-orders` | CUSTOMER | Order history + rating |
| `/vendor/dashboard` | VENDOR | Incoming orders |
| `/vendor/menu` | VENDOR | Menu management |
| `/courier/orders` | COURIER | Available orders |
| `/courier/deliveries` | COURIER | My deliveries |
| `/admin/users` | ADMIN | Manage users |
| `/admin/vendors` | ADMIN | Manage vendors |
| `/admin/orders` | ADMIN | All orders + revenue |

---

## 🚧 Roadmap

- [ ] Cloudinary image upload for menu items
- [ ] Real-time order status updates (WebSockets)
- [ ] Push notifications
- [ ] Vendor profile setup page
- [ ] Customer address book
- [ ] Order search and filtering
- [ ] Dark mode
- [ ] PWA support (installable on mobile)

---

## 👨‍💻 Author

**Lyon Gift**
NYSC Corps Member | Software Developer
Delta State, Nigeria

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
