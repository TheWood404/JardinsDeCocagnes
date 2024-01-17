import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header
import PointDepotComponent from '../../components/PointDepotComponent'; // Importez le composant PointDepotComponent

function PointDeDepot() {
  return (
    <div>
      <Header afficherHeader={true} />
      <PointDepotComponent />
  
      {/* Ajoutez le contenu spécifique à cet écran ici */}
    </div>
  );
} 

export default PointDeDepot;
