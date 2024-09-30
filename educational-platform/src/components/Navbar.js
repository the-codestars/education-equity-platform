// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';
import NotificationBadge from './NotificationBadge';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          EduPlatform
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
            <Link to="/profile" className="text-white hover:underline">
                My Profile
              </Link>
            <Link to="/forums" className="text-white hover:underline">
                Forums
              </Link>
              <Link to="/scholarship-guidance" className="text-white hover:underline">
                Scholarship Guidance
              </Link>
              <Link to="/meetings" className="text-white hover:underline">
                My Meetings
              </Link>
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
             <Link to="/meetings" className="text-white hover:underline">
                My Meetings
              </Link>
              
              <Link to="/notifications" className="relative">
                <NotificationBadge />
              </Link>
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
              <Link to="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
          <Link to="/schedule-meeting" className="text-white hover:underline">
            Schedule Meeting
          </Link>
              <Link to="/scholarship-guidance" className="text-white hover:underline">
                Scholarship Guidance
              </Link>
              {user.role === 'mentor' && (
                <Link to="/mentor-profile" className="text-white hover:underline">
                  Mentor Profile
                </Link>
              )}
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
