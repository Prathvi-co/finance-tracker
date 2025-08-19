// client/src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from './authContext';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import AboutUs from './pages/AboutUs';
import UserInfo from './pages/UserInfo';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';
import './App.css';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/forgot-password"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <ResetPassword />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/reports"
            element={<PrivateRoute><Reports /></PrivateRoute>}
          />
          <Route
            path="/user-info"
            element={<PrivateRoute><UserInfo /></PrivateRoute>}
          />
          <Route
            path="/about-us"
            element={<AboutUs />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;