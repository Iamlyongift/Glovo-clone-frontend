import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Customer
import Home from "./pages/customer/Home";
import VendorDetail from "./pages/customer/VendorDetail";
import Cart from "./pages/customer/Cart";
import MyOrders from "./pages/customer/MyOrders";

// Vendor
import VendorDashboard from "./pages/vendor/VendorDashboard";
import MenuManager from "./pages/vendor/MenuManager";
import CreateVendorProfile from "./pages/vendor/CreateVendorProfile";

// Courier
import AvailableOrders from "./pages/courier/AvailableOrders";
import MyDeliveries from "./pages/courier/MyDeliveries";

// Admin
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminOrders from "./pages/admin/AdminOrders";

import Unauthorized from "./pages/Unauthorized";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Customer */}
        <Route
          path="/home"
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors/:id"
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <VendorDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Vendor */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute roles={["VENDOR"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/menu"
          element={
            <ProtectedRoute roles={["VENDOR"]}>
              <MenuManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/setup"
          element={
            <ProtectedRoute roles={["VENDOR"]}>
              <CreateVendorProfile />
            </ProtectedRoute>
          }
        />

        {/* Courier */}
        <Route
          path="/courier/orders"
          element={
            <ProtectedRoute roles={["COURIER"]}>
              <AvailableOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courier/deliveries"
          element={
            <ProtectedRoute roles={["COURIER"]}>
              <MyDeliveries />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminVendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
