// AdherentInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdherentInfo = () => {
  const [adherent, setAdherent] = useState({
    adresse: '',
    code_postal: '',
    id_structure: '',
    mail: '',
    mdp_espace_client: '',
    nom: '',
    num_identification: '',
    num_telephone: '',
    prenom: '',
    ville: '',
    point_depot_favori_id: null,
  });

  const [pointsDeDepot, setPointsDeDepot] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const idAdherent = localStorage.getItem('idAdherent');

    //faire une requete qui prend le point_depot_favori_id et qui retourne le nom du point de depot
    axios.get(`/api/point-de-depot/${pointsDeDepot.id}`)
        .then(response => {
            setPointsDeDepot(response.data);

            //point_depot_favori_id prend le nom du point de depot
            
        }
        )
        .catch(error => {
            console.error('Erreur lors de la récupération des informations de l\'adhérent', error);
        }
        );


    // Récupérer les informations de l'adhérent depuis le serveur
    axios.get(`/api/adherent/info/${idAdherent}`)
      .then(response => {
        setAdherent(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de l\'adhérent', error);
      });

    // Récupérer la liste des points de dépôt depuis le serveur
    axios.get('/api/points-depot')
      .then(response => {
        setPointsDeDepot(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des points de dépôt', error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const idAdherent = localStorage.getItem('idAdherent');

    // Envoyer les modifications au serveur
    axios.put(`/api/adherent/info/${idAdherent}`, adherent)
      .then(response => {
        setIsEditing(false);
        console.log('Informations mises à jour avec succès');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des informations de l\'adhérent', error);
      });
  };

  const handleChange = (e) => {
    setAdherent({
      ...adherent,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-10 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Votre Compte</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(adherent).map((key) => (
          key !== 'id_structure' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-600">{getTitle(key)}</label>
              {key === 'point_depot_favori_id' && isEditing ? (
                <select
                  name={key}
                  value={adherent[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value={null}>Sélectionner un point de dépôt</option>
                  {pointsDeDepot.map((pointDeDepot) => (
                    <option key={pointDeDepot.id} value={pointDeDepot.id}>
                      {pointDeDepot.nom} - {pointDeDepot.adresse}, {pointDeDepot.ville}
                    </option>
                  ))}
                </select>
              ) : key === 'mdp_espace_client' ? (
                isEditing ? (
                  <input
                    type="text"  // Change type to "text" in edit mode
                    name={key}
                    value={adherent[key]}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                ) : (
                  <p className="mt-1 p-2 border rounded-md bg-gray-100">********</p>
                )
              ) : isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={adherent[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              ) : (
                <p className="mt-1 p-2 border rounded-md bg-gray-100">{adherent[key]}</p>
              )}
            </div>
          )
        ))}
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="col-span-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Enregistrer
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="col-span-3 mt-4 px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
  
  function getTitle(key) {
    // You can customize titles based on the keys
    switch (key) {
      case 'point_depot_favori_id':
        return 'Point de dépôt favori';
      case 'mdp_espace_client':
        return 'Mot de passe';
      // Add more cases as needed
      default:
        return key.replace('_', ' ');
    }
  }
}

export default AdherentInfo;