import React from 'react';
import HeaderAD from '../../components/HeaderAD'; // Importez le composant Header
import CalendrierAdherent from '../../components/CalendrierAdherentCP'; // Importez le composant CalendrierAdherent


function CalendrierAD() {
  return (
    <div>
      <HeaderAD  afficherHeader={true}/>

      <div className="mt-20">
        <div className="bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Jour disponible de livraison</h1>
          <CalendrierAdherent /> {/* Affichez le composant Calendrier ici */}
        </div>
      </div>

    </div>
  );
}

export default CalendrierAD;
