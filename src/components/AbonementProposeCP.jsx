import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

function AbonnementsPropose() {
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const idStructureAD = localStorage.getItem('idStructureAD');

        if (!idStructureAD) {
          console.error("Id de structure non spécifié dans le localStorage");
          return;
        }

        // Récupérer les abonnements de la structure de l'adhérent
        const responseAbonnements = await axios.get(`/api/abonnements/${idStructureAD}`);

        // Mettre à jour l'état des abonnements
        setAbonnements(responseAbonnements.data.abonnements);
      } catch (error) {
        console.error('Erreur lors de la récupération de la structure ou des abonnements :', error);
      }
    };

    fetchAbonnements();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="container mx-auto p-4 max-w-md mx-auto bg-white p-6 rounded-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Abonnements proposés par la structure de l'adhérent</h1>
        <ul className="list-disc">
          {abonnements.map((abonnement) => (
            <div key={abonnement.id} className="mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-3 rounded-3xl">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl mr-2  text-white ">{abonnement.type}</span>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-3xl hover:bg-green-700"
                      onClick={() => console.log('Souscrire à l\'abonnement avec ID:', abonnement.id)}
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>
                  </div>
                </div>

                <span className="mr-2">- Prix : {abonnement.montant} €</span>
                <br />
                <span className="mr-2">- Compositions : {abonnement.compositions}</span>
                <br />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AbonnementsPropose;
