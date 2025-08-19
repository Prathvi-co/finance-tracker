// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './authContext'; // <-- IMPORT AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* <-- WRAP THE APP WITH AUTHPROVIDER */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);