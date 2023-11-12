import React from 'react';
import Calendrier from '../components/Calendrier_components'; // Assurez-vous d'importer le composant Calendrier correctement

function CalendrierScreen() {
  return (
    <div className="mt-20">
      <div className="bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Calendrier</h1>
        <Calendrier /> {/* Affichez le composant Calendrier ici */}
      </div>
    </div>
  );
}

export default CalendrierScreen;
