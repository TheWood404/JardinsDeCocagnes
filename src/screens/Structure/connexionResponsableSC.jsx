import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import ConnexionResponsable from '../components/Connexion_responsable_components'; // Importez le composant connexion_responsable

function ConnexionResponsable() {
  return (
    <div>
      <Header afficherHeader={false} />
      <ConnexionResponsable />
    </div>
  );
}

export default ConnexionResponsable;
