import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Homepage from "./pages/Homepage.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";

import Cart from "./pages/Cart.jsx";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopContextProvider } from "./context/ShopContext.jsx";

function App() {
  return (
    <>
      <div className="app mesh-bg">
        <ShopContextProvider>
          <Router>
            <Navbar />

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/about" />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </Router>
        </ShopContextProvider>
      </div>
    </>
  );
}

export default App;
