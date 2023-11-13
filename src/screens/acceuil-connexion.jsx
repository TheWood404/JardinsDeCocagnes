import React from 'react';
import Header from '../components/Header'; // Importez le composant Header
import Acceuil_connexion from '../components/Acceuil_connexion'; // Importez le composant Acceuil_connexion

function AcceuilScreen() {
  return (
    <div>
      <Header afficherHeader={false} />
      <Acceuil_connexion />
    </div>
  );
}

export default AcceuilScreen;
