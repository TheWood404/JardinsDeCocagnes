import React from 'react';
import Header from '../../components/Header';
import GestionAbonnement from '../../components/GestionAbonnementCP';
import VisualisationAbonnement from '../../components/VisualisationAbonnementCP';
import GestionAbonnementAbonnee from '../../components/GestionAbonnementAbonnee';

function Abonnement() {
  return (
    <div>
      <Header afficherHeader={true} />

      <div className="md:flex md:justify-center md:mt-10">
        {/* Deux composants côte à côte sur la première ligne */}
        <div className="md:w-1/3 md:pr-4">
          <GestionAbonnement />
        </div>
        <div className="md:w-1/3 md:pl-4 mt-4 md:mt-0">
          <VisualisationAbonnement />
        </div>
      </div>

      {/* Un composant en dessous sur la deuxième ligne */}
      <div className="flex pb-10 justify-center mt-4 md:mt-10">
        <div className="sm:w-2/3 md:w-1/2 lg:w-2/3">
          <GestionAbonnementAbonnee />
        </div>
      </div>
    </div>
  );
}

export default Abonnement;
