import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AbonnementsPropose() {
  const [abonnements, setAbonnements] = useState([]);
  const [abonnementsEnCours, setAbonnementsEnCours] = useState([]);  // Déplacer à l'extérieur de la fonction

  const fetchAbonnements = async () => {
    try {
      const structureId = localStorage.getItem('idStructureAdherent');

      if (!structureId) {
        console.error('ID de structure non spécifié dans le localStorage');
        return;
      }

      const response = await axios.get("/api/abonnements", {
        params: {
          structureId: structureId,
        },
      });

      setAbonnements(response.data.abonnements);
    } catch (error) {
      console.error("Erreur lors de la récupération des abonnements :", error);
    }
  };

  const fetchAbonnementsEnCours = async () => {
    try {
      const idAdherent = localStorage.getItem('idAdherent');
      const response = await axios.get("/api/abonnements-en-cours", {
        params: {
          idAdherent: idAdherent,
        },
      });

      setAbonnementsEnCours(response.data.abonnementsEnCours);
    } catch (error) {
      console.error("Erreur lors de la récupération des abonnements en cours :", error);
    }
  };

const desabonner = async (idAbonnement) => {
  try {
    const idAdherent = localStorage.getItem('idAdherent');
    console.log('Tentative de désabonnement à l\'abonnement avec ID:', idAbonnement);
    console.log('ID de l\'adhérent:', idAdherent);

    const response = await axios.post("/api/desabonner", { idAdherent, idAbonnement });

    if (response.data.success) {
      // Mettre à jour l'affichage des abonnements après le désabonnement réussi
      fetchAbonnements();
      fetchAbonnementsEnCours();
      console.log('Désabonnement réussi de l\'abonnement avec ID:', idAbonnement);
    } else {
      console.error('Erreur lors du désabonnement :', response.data.message);
    }
  } catch (error) {
    console.error("Erreur lors du désabonnement :", error);
  }
};
  

  useEffect(() => {
    fetchAbonnements();
    fetchAbonnementsEnCours();
  }, []);

  const souscrireAbonnement = async (idAbonnement) => {
    try {
      console.log('Tentative de souscription à l\'abonnement avec ID:', idAbonnement);
      console.log('ID de ladhérent:', localStorage.getItem('idAdherent'));

      const idAdherent = localStorage.getItem('idAdherent');
      const response = await axios.post("/api/souscrire-abonnement", { idAdherent, idAbonnement });

      if (response.data.success) {
        // Mettre à jour l'affichage des abonnements après la souscription réussie
        fetchAbonnements();
        fetchAbonnementsEnCours();  // Mettre à jour les abonnements en cours après la souscription
        console.log('Souscription réussie à l\'abonnement avec ID:', idAbonnement);
      } else {
        console.error('Erreur lors de la souscription à l\'abonnement :', response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la souscription à l'abonnement :", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="container mx-auto p-4 max-w-md mx-auto bg-white p-6 rounded-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Abonnements proposés par la structure de l'adhérent</h1>
        <ul className="list-disc">
        {abonnements.map((abonnement) => (
  <div key={abonnement.id} className="mb-4">
    <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-3 rounded-3xl">
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl mr-2 text-white ">{abonnement.type}</span>
        <div>
           {/* Bouton pour souscrire (affiché uniquement si l'abonnement n'est pas en cours) */}
           {!abonnementsEnCours.some(enCours => enCours.id_abonnement === abonnement.id) && (
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-3xl hover:bg-green-700"
              onClick={() => souscrireAbonnement(abonnement.id)}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          )}

          {/* Bouton pour se désabonner (affiché uniquement si l'abonnement est en cours) */}
          {abonnementsEnCours.some(enCours => enCours.id_abonnement === abonnement.id) && (
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-3xl ml-2 hover:bg-red-700"
              onClick={() => desabonner(abonnement.id)}
            >
              Se désabonner
            </button>
          )}
        </div>
      </div>

      <span className="mr-2">- Prix : {abonnement.montant} €</span>
      <br />
      <span className="mr-2">- Compositions : {abonnement.compositions}</span>
      <br />
      {/* Afficher si l'abonnement est en cours */}
      {abonnementsEnCours.some(enCours => enCours.id_abonnement === abonnement.id) && (
        <span className="text-blue-500">Abonnement en cours</span>
      )}
    </div>
  </div>
))}

        </ul>
      </div>
    </div>
  );
}

export default AbonnementsPropose;