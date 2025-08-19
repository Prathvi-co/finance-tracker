// client/src/PrivateRoute.js

import React, { useContext } from 'react'; // <-- IMPORT useContext
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext'; // <-- IMPORT CONTEXT

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // <-- GET STATE FROM CONTEXT
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;