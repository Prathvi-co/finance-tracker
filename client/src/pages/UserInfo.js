// client/src/pages/UserInfo.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../authContext';
import backgroundImage from '../assets/financial-planning-image.jpg.jpg'; // Ensure this path is correct

const UserInfo = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user`, config);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user information.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Foreground content */}
      <div className="relative z-10 p-8 rounded-2xl max-w-lg w-full 
                      bg-white/30 backdrop-blur-lg border border-white/20">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow-sm">
          User Profile
        </h2>

        {loading ? (
          <p className="text-gray-700 text-center">Loading user information...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : user ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700">Full Name</p>
              <p className="text-lg font-semibold text-blue-900">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-700">Email</p>
              <p className="text-lg font-semibold text-blue-900">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-700">Account Created</p>
              <p className="text-lg font-semibold text-blue-900">
                {new Date(user.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-700">Status</p>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-900 rounded-full">
                Active
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Please log in to view your information.</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
