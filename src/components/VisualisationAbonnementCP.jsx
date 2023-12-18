import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function VisualisationAbonnement() {
  const [abonnements, setAbonnements] = useState([]);
  const [editionAbonnement, setEditionAbonnement] = useState(null);

  useEffect(() => {
    fetchAbonnements();
  }, []);

  const fetchAbonnements = async () => {
    try {
      const structureId = localStorage.getItem('idStructureResponsable');
      
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
  
  
  

  const handleModifierAbonnement = (abonnement) => {
    setEditionAbonnement(abonnement);
  };

  const handleSupprimerAbonnement = async (id) => {
    try {
      await axios.delete(`/api/abonnements/${id}`);
      // Rechargez la liste des abonnements après la suppression
      fetchAbonnements();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'abonnement :", error);
    }
  };

  const handleAnnulerEdition = () => {
    setEditionAbonnement(null);
  };

  const handleEnregistrerEdition = async () => {
    // Logique pour enregistrer les modifications de l'abonnement
    // Utilisez l'ID de l'abonnement en cours d'édition : editionAbonnement.id
    // Envoyez les nouvelles données au backend et mettez à jour la liste des abonnements après l'enregistrement
    try {

        await axios.put(`/api/editabonnements/${editionAbonnement.id}`, {
        // Envoyez les nouvelles données ici
        type: editionAbonnement.type,
        montant: editionAbonnement.montant,

      });
      fetchAbonnements(); // Rechargez la liste des abonnements après l'enregistrement
      console.log("editionAbonnement:", editionAbonnement); // Ajoutez cette ligne
      setEditionAbonnement(null); // Annulez le mode d'édition
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des modifications de l'abonnement :", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
    <div className="container mx-auto p-4 max-w-md mx-auto bg-white p-6 rounded-3xl shadow-md">
    <h1 className="text-2xl font-bold mb-4">Abonnements disponible</h1>
    <ul className="list-disc">
  {abonnements.map((abonnement) => (
    <div key={abonnement.id} className="mb-4">
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-3 rounded-3xl">
        <div className="flex justify-between items-center">
        <span className="font-bold text-xl mr-2  text-white ">{abonnement.type}</span>
            <div>
                <button
                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded-3xl hover:bg-blue-700"
                onClick={() => handleModifierAbonnement(abonnement)}
                >
                <FontAwesomeIcon icon={faPencilAlt} />
                </button>

                <button
                className="bg-red-500 text-white px-2 py-1 rounded-3xl hover:bg-red-700"
                onClick={() => handleSupprimerAbonnement(abonnement.id)}
                >
                <FontAwesomeIcon icon={faTimes} size="lg" />
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


    {editionAbonnement && (
      <div className="p-4 mt-4 bg-orange-400 rounded-3xl">
        <h2 className="text-xl font-bold mb-2">Modifier l'abonnement</h2>
        <input
          type="text"
          value={editionAbonnement.type}
          onChange={(e) => setEditionAbonnement({ ...editionAbonnement, type: e.target.value })}
          className="border rounded-3xl py-2 px-3 mb-2"
        />
        <input
          type="number"
          value={editionAbonnement.montant}
          onChange={(e) => setEditionAbonnement({ ...editionAbonnement, montant: e.target.value })}
          className="border rounded-3xl py-2 px-3 mb-2"
        />
        <button
        className="bg-green-500 text-white px-3 py-1 m-2 rounded-3xl hover:bg-green-700"
        onClick={handleEnregistrerEdition}
        >
        <FontAwesomeIcon icon={faCheck}  />
        </button>
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded-3xl hover:bg-gray-700"
          onClick={handleAnnulerEdition}
        >
          Annuler
        </button>
      </div>
    )}
  </div>
    </div>
  );
}

export default VisualisationAbonnement;
