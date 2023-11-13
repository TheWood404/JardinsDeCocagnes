import React from 'react';
import Header from '../components/Header'; // Importez le composant Header
import Accueil_connexion from '../components/Accueil_connexion'; // Importez le composant Acceuil_connexion

function AccueilScreen() {
  return (
    <div>
      <Header afficherHeader={false} />
      <Accueil_connexion />
    </div>
  );
}

export default AccueilScreen;
