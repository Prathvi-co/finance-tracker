// client/src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'You', path: '/user-info' },
    { name: 'About Us', path: '/about-us' },
  ];

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between h-12">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b-2 border-white px-3 py-3 text-sm font-medium'
                  : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-300 px-3 py-3 text-sm font-medium'
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;