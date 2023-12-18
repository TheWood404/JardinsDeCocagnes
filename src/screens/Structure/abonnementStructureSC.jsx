import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import GestionAbonnement from '../../components/GestionAbonnementCP';
import VisualisationAbonnement from '../../components/VisualisationAbonnementCP';


function Abonnement() {
  return (
    <div>
      <Header afficherHeader={true} />

      <div className="flex justify-center mt-10">
  <div className="w-1/2 pr-4">
    <GestionAbonnement />
  </div>
  <div className="w-1/2 pl-4">
    <VisualisationAbonnement />
  </div>
</div>


    </div>
  );
}

export default Abonnement;