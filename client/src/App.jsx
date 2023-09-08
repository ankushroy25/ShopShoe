import React from "react";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Products from "./pages/Products.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />

            <Route path="/cart" />
            <Route path="/checkout" />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
