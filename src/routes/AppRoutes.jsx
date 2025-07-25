// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Product from "../pages/Product";
import Category1 from "../pages/Category1";
import Category2 from "../pages/Category2";
import Category3 from "../pages/Category3";
import PurchaseCard from '../pages/PurchaseCard';
import About from "../pages/About";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Landing />
            <Product />
          </>
        }
      />
      <Route path="/category1" element={<Category1 />} />
      <Route path="/category2" element={<Category2 />} />
      <Route path="/category3" element={<Category3 />} />
      <Route path="/purchase" element={<PurchaseCard />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default AppRoutes;
