import React from 'react';
import Header from '../../components/Header'; // Importez le composant Header


function Produits() {
  return (
    <div>
      <Header afficherHeader={true} />

      <h1>Produits</h1>
      {/* Ajoutez le contenu spécifique à cet écran ici */}
    </div>
  );
}

export default Produits;
