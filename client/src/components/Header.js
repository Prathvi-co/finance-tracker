// client/src/components/Header.js

import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../authContext';

// We will use a placeholder for the icon
const Icon = () => (
  <svg
    className="h-6 w-6 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zM12 18h.01M17 18h.01"
    />
  </svg>
);

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get('${process.env.REACT_APP_API_URL}/api/auth/user', config);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side: Icon and App Name */}
        <div className="flex items-center space-x-3">
          <Link to="/dashboard">
            <Icon />
          </Link>
          <div className="text-xl font-bold text-gray-800 font-serif">
            <Link to="/dashboard">Finance Tracker</Link>
          </div>
        </div>

        {/* Center: Welcome Message (only for authenticated users) */}
        {isAuthenticated && user && (
          <span className="text-gray-600 font-medium font-serif">Welcome, {user.name}</span>
        )}

        {/* Right side: Logout/Login/Register Buttons */}
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={() => logout(navigate)} 
              className="px-4 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;