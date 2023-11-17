import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RoutePrivee = ({ element: Element, utilisateurConnecte, ...rest }) => (
  <Route
    {...rest}
    element={utilisateurConnecte ? <Element /> : <Navigate to="/connexion-adherent" />}
  />
);

export default RoutePrivee;