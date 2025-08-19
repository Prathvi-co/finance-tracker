// client/src/components/Layout.js

import React from 'react';
import Header from './Header';
import Navbar from './Navbar'; // <-- IMPORT THE NAVBAR
import Footer from './Footer';
import AuthContext from '../authContext'; // <-- IMPORT AUTH CONTEXT
import { useContext } from 'react';

const Layout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // <-- GET AUTH STATUS

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isAuthenticated && <Navbar />} {/* <-- RENDER NAVBAR ONLY IF AUTHENTICATED */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;