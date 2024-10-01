// src/components/Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
