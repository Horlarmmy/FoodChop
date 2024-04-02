// import  { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Index from "./pages/landingPage/Index";
import IndexFood from "./pages/foodPage/Index";
import Cart from "./pages/Cart/Cart";
import CheckoutPage from "./pages/Checkout/Checkout";
import OrderProcessing from "./pages/Order/Order";

export default function AppRoutes() {
  // const [cartItems, setCartItems] = useState([]); // Cart state is managed here

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="food" element={<IndexFood />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="order" element={<OrderProcessing />} />

      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
