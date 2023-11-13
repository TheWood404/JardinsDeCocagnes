import React from 'react';
import Header from '../components/Header'; // Importez le composant Header
import Acceuil_connexion from '../components/Acceuil_connexion'; // Importez le composant Acceuil_connexion
import connexion_responsable from '../components/Connexion_responsable_components'; // Importez le composant connexion_responsable

function ConnexionResponsable() {
  return (
    <div>
      <Header afficherHeader={false} />
      <connexion_responsable_components />
    </div>
  );
}

export default ConnexionResponsable;
