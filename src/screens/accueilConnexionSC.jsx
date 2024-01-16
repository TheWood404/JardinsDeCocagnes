import React from 'react';
import Header from '../components/Header'; // Importez le composant Header
import AccueilConnexion from '../components/AccueilConnexionCP'; // Importez le composant Acceuil_connexion

function AccueilScreen() {

      //mettre a jour l'etat de l'utilisateur connecté dans le local storage comme false
      localStorage.setItem('structureConnecte', 'false');
      console.log("structureConnecte:", localStorage.getItem('structureConnecte'));

      localStorage.setItem('utilisateurConnecte', 'false');
      console.log("utilisateurConnecte:", localStorage.getItem('utilisateurConnecte'));
      
  return (
    <div>
      <Header afficherHeader={false} />
      <AccueilConnexion />
    </div>
  );
}

export default AccueilScreen;
