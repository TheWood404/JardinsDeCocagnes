import React from 'react';
import Header from '../components/Header'; // Importez le composant Header
import AccueilConnexion from '../components/AccueilConnexionCP'; // Importez le composant Acceuil_connexion

function AccueilScreen() {
  return (
    <div>
      <Header afficherHeader={false} />
      <AccueilConnexion />
    </div>
  );
}

export default AccueilScreen;
