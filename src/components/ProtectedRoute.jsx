// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAllowed, fallbackPath, ...props }) => {
  return (
    <Route
      {...props}
      element={isAllowed ? <Component /> : <Navigate to={fallbackPath} />}
    />
  );
};

export default ProtectedRoute;

