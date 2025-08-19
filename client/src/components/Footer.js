// client/src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="max-w-4xl mx-auto px-4 py-3 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;