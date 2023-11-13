import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import ConnexionAdherent from '../components/ConnexionAdherentCP'; // Importez le composant ConnexionAdherentCP

function ConnexionAdherent() {
  return (
    <div>
      <Header afficherHeader={false} />
      <ConnexionAdherent />
    </div>
  );
}

export default ConnexionAdherent;
