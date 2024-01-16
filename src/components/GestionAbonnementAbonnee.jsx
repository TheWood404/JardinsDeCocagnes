import React, { useEffect, useState } from 'react';

const GestionAbonnementAbonnee = () => {
  const [adherents, setAdherents] = useState([]);
  const [selectedAdherent, setSelectedAdherent] = useState(null);
  const [abonnement, setAbonnement] = useState(null);

  useEffect(() => {
    const idStructure = localStorage.getItem("idStructureResponsable");

    if (idStructure) {
      fetch(`/api/adherents-de-structure?idStructure=${idStructure}`)
        .then(response => response.json())
        .then(data => {
          setAdherents(data.adherents);
        })
        .catch(error => console.error('Erreur lors de la récupération des adhérents :', error));
    }
  }, []);

  useEffect(() => {
    if (selectedAdherent !== null) {
      fetch(`/api/abonnement/${selectedAdherent}`)
        .then(response => response.json())
        .then(data => {
          setAbonnement(data.abonnement);
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'abonnement :', error));
    }
  }, [selectedAdherent]);

  const toggleAbonnements = (adherentId) => {
    setSelectedAdherent((prevSelectedAdherent) =>
      prevSelectedAdherent === adherentId ? null : adherentId
    );
  };

  return (
    <div className="container mx-auto mt-8 bg-white p-4 rounded-3xl shadow-md">
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-2xl font-bold mb-4">Liste des Adhérents</h2>
          {adherents.map((adherent) => (
            <div
              key={adherent.id}
              className={`mb-4 cursor-pointer rounded-3xl ${selectedAdherent === adherent.id ? 'bg-blue-500' : 'bg-green-500'}`}
              onClick={() => toggleAbonnements(adherent.id)}
            >
              <h1 className={`text-lg font-bold ${selectedAdherent === adherent.id ? 'text-white' : 'text-white'} ml-2`}>{`${adherent.nom} ${adherent.prenom}`}</h1>
            </div>
          ))}
        </div>
        <div className="w-3/4 pl-4 ">
          {selectedAdherent !== null && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Abonnements de l'Adhérent</h2>
                {abonnement === null && (
                    <div className="mb-4 bg-red-500 rounded-3xl p-5 text-white">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Aucun abonnement</span>
                    </div>
                    </div>
                )}
              {abonnement && (
                <div key={abonnement.id_abonnement} className="mb-4 bg-green-500 rounded-3xl p-5 text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{abonnement.type}</span>
                    <span className="text-gray-500">{abonnement.montant} €</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{abonnement.compositions}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionAbonnementAbonnee;
