import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import TourneesMap from '../../components/TourneesStructureCP'; // Importez le composant TourneesMapCP


function Tournees() {
  return (
    <div>
      <Header afficherHeader={true} />

        <TourneesMap />
      
    </div>
  );
}

export default Tournees;