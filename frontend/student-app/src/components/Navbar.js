// src/components/Navbar.js

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaTasks,
  FaUser,
  FaHandshake,
  FaGraduationCap,
  FaComments,
  FaRobot,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "List of Teachers",
      path: "/teachers",
      icon: <FaChalkboardTeacher />,
    },
    { name: "View Assignments", path: "/assignments", icon: <FaTasks /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Finding Mentor", path: "/finding-mentor", icon: <FaHandshake /> },
    { name: "Scholarships", path: "/scholarships", icon: <FaGraduationCap /> },
    { name: "Forum", path: "/forum", icon: <FaComments /> },
    { name: "Chatbot", path: "/chatbot", icon: <FaRobot /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-primary text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold text-center py-6 border-b border-red-700">
        Mentor Platform
      </div>
      <nav className="flex-1 mt-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 hover:bg-red-700 transition-colors ${
                isActive ? "bg-red-700" : ""
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="text-md font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-red-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded transition duration-200 flex items-center justify-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
