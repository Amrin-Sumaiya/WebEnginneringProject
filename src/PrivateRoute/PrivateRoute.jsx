import React from 'react';
// src/PrivateRoute.jsx

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

