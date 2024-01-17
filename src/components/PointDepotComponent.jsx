import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const PointDepotComponent = () => {

    const toggleEditingPointDepot = (pointDepot) => {
        setEditingPointDepot(pointDepot);
      };
    
      const modifierPointDepot = async () => {
            //appel la fonction qui affiche un message de confirmation de modification
    if (editingPointDepot) {
        alert("Modification du point de dépôt effectuée avec succès");
    }
        console.log('Modifying Point Depot:', editingPointDepot);
      
        try {
            const response = await axios.put(`http://localhost:3001/api/update-point-depot-modif/${editingPointDepot.id}`, editingPointDepot);
          
            if (response.status === 200) {
              console.log('Point de depot modifié avec succès', response.data);
              // Reset the editing state
              setEditingPointDepot(null);
              // Fetch updated points de dépôt
              fetchPointsDepot();
            } else {
              console.error('Erreur lors de la modification du point de dépôt. Unexpected response status:', response.status);
            }
          } catch (error) {
            console.error('Erreur lors de la modification du point de dépôt', error);
          
            if (error.response) {
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
          
              // Add specific handling for 404 status code
              if (error.response.status === 404) {
                console.error('Point de dépôt non trouvé. Vérifiez que l\'ID est correct.');
              }
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error setting up the request:', error.message);
            }
          }
          
          
          
      };
      

      

      const toggleCreatingNewPoint = () => {
        setCreatingNewPoint(!creatingNewPoint);
        setEditingPointDepot(null); // Reset the editing state
      };
      
      

    const [editingPointDepot, setEditingPointDepot] = useState(null);

    const [creatingNewPoint, setCreatingNewPoint] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedPointDepot, setSelectedPointDepot] = useState(null);
  const [pointsDepot, setPointsDepot] = useState([]);
  const [nouveauPointDepot, setNouveauPointDepot] = useState({
    nom: '',
    adresse: '',
    code_postal: '',
    ville: '',
    numero_de_telephone: '',
    mail: '',
    site_web: '',
    personne_referente: '',
    jour_de_livraison: '',
    creneau_horaire_livraison: '',
    creneaux_horraires_livraisons: '',
    creneaux_horaires_recuperations_des_paniers: '',
    description_du_lieu: '',
    commentaires: '',
    id_tournee: '',
    no_ordre_livraison: '',
    nom_personne_referente: '',
    mail_personne_referente: '',
    tel_personne_referente: '',
    photo_lieu: '',
    presentation_lieu: '',
  });

  const fetchPointsDepot = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-points-depot');
      setPointsDepot(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des points de dépôt', error);
    }
  };

  const creerPointDepot = async () => {
    try {
      await axios.post('http://localhost:3001/api/create-point-depot', nouveauPointDepot);
      setNouveauPointDepot({
        nom: '',
        adresse: '',
        code_postal: '',
        ville: '',
        numero_de_telephone: '',
        mail: '',
        site_web: '',
        personne_referente: '',
        jour_de_livraison: '',
        creneau_horaire_livraison: '',
        creneaux_horraires_livraisons: '',
        creneaux_horaires_recuperations_des_paniers: '',
        description_du_lieu: '',
        commentaires: '',
        id_tournee: '',
        no_ordre_livraison: '',
        nom_personne_referente: '',
        mail_personne_referente: '',
        tel_personne_referente: '',
        photo_lieu: '',
        presentation_lieu: '',
      });
      fetchPointsDepot();
    } catch (error) {
      console.error('Erreur lors de la création du point de dépôt', error);
    }
  };

  const supprimerPointDepot = async (pointDepotId) => {
    try {
      await axios.delete(`http://localhost:3001/api/delete-point-depot/${pointDepotId}`);
      fetchPointsDepot();
    } catch (error) {
      console.error('Erreur lors de la suppression du point de dépôt', error);
    }
  };

  useEffect(() => {
    console.log("Editing Point Depot Changed:", editingPointDepot);
    fetchPointsDepot();
  }, [editingPointDepot]);
  
  

  return (
    <div className="bg-white mt-16 p-5">
      <div className="container mx-auto p-8">

      {editingPointDepot && (
          <form
          className="mb-4 p-4 border border-gray-300 rounded rounded-3xl bg-gray-200"
          onSubmit={(e) => {
            e.preventDefault();
            modifierPointDepot();
          }}
        >
            <div className="grid grid-cols-2 gap-4 ounded-3xl">
              <div>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  value={editingPointDepot.nom}
                  onChange={(e) => setEditingPointDepot({ ...editingPointDepot, nom: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="code_postal">Code Postal</label>
                <input
                  type="text"
                  id="code_postal"
                  value={editingPointDepot.code_postal}
                  onChange={(e) => setEditingPointDepot({ ...editingPointDepot, code_postal: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                  required
                />
              </div>
                <div>
                    <label htmlFor="ville">Ville</label>
                    <input
                    type="text"
                    id="ville"
                    value={editingPointDepot.ville}
                    onChange={(e) => setEditingPointDepot({ ...editingPointDepot, ville: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="adresse">Adresse</label>
                    <input
                    type="text"
                    id="adresse"
                    value={editingPointDepot.adresse}
                    onChange={(e) => setEditingPointDepot({ ...editingPointDepot, adresse: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="numero_de_telephone">Numéro de téléphone</label>
                    <input
                    type="text"
                    id="numero_de_telephone"
                    value={editingPointDepot.numero_de_telephone}
                    onChange={(e) => setEditingPointDepot({ ...editingPointDepot, numero_de_telephone: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input
                    type="text"
                    id="mail"
                    value={editingPointDepot.mail}
                    onChange={(e) => setEditingPointDepot({ ...editingPointDepot, mail: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
                <div>
                    <label htmlFor="site_web">Site Web</label>
                    <input
                    type="text"
                    id="site_web"   
                    value={editingPointDepot.site_web}
                    onChange={(e) => setEditingPointDepot({ ...editingPointDepot, site_web: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
                <div>
  <label htmlFor="coordonnees">Coordonnees</label>
  <div className="flex">
    <input
      type="number"
      id="coordonneesX"
      placeholder="Latitude"
      value={editingPointDepot.coordonnees.x}
      onChange={(e) =>
        setEditingPointDepot({
          ...editingPointDepot,
          coordonnees: { x: parseFloat(e.target.value), y: editingPointDepot.coordonnees.y }
        })
      }
      className="border border-gray-300 p-2 w-full rounded-3xl"
      step="any"
      required
    />
    <input
      type="number"
      id="coordonneesY"
      placeholder="Longitude"
      value={editingPointDepot.coordonnees.y}
      onChange={(e) =>
        setEditingPointDepot({
          ...editingPointDepot,
          coordonnees: { x: editingPointDepot.coordonnees.x, y: parseFloat(e.target.value) }
        })
      }
      className="border border-gray-300 p-2 w-full rounded-3xl"
      step="any"
      required
    />
  </div>
</div>


                
              {/* Include other input fields as needed */}
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded rounded-3xl">
    Enregistrer
  </button>
  <button type="button" onClick={() => setEditingPointDepot(null)} className="mt-2 ml-2 bg-gray-500 text-white p-2 rounded rounded-3xl">
    Annuler
  </button>
</form>
        )}

        <h1 className="text-3xl font-bold mb-4 bg-grey-500">Ajouter un point de Dépôt</h1>

        <button className="mb-4 mt-2 bg-blue-500 text-white p-2 rounded rounded-3xl" onClick={toggleCreatingNewPoint}>
          {creatingNewPoint ? 'Annuler la création' : 'Créer un nouveau point de dépôt'}
        </button>

        {creatingNewPoint && (
          <form
            className="mb-4 p-4 border border-gray-300 rounded rounded-3xl bg-gray-200"
            onSubmit={(e) => {
              e.preventDefault();
              creerPointDepot();
            }}
          >
            <div className="grid grid-cols-2 gap-4 ounded-3xl">
              <div>
                <label htmlFor="nom">Nom</label>
                {/* Include all other input fields here */}
                <label htmlFor="code_postal">Code Postal</label>
                <input
                  type="text"
                  id="code_postal"
                  value={nouveauPointDepot.code_postal}
                  onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, code_postal: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="ville">Ville</label>
                <input
                  type="text"
                  id="ville"
                  value={nouveauPointDepot.ville}
                  onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, ville: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                  required
                />
              </div>
              {/* Include other input fields as needed */}
                <div>
                    <label htmlFor="adresse">Adresse</label>
                    <input
                    type="text"
                    id="adresse"
                    value={nouveauPointDepot.adresse}
                    onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, adresse: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="numero_de_telephone">Numéro de téléphone</label>
                    <input
                    type="text"
                    id="numero_de_telephone"
                    value={nouveauPointDepot.numero_de_telephone}
                    onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, numero_de_telephone: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input
                    type="text"
                    id="mail"
                    value={nouveauPointDepot.mail}
                    onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, mail: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
                <div>
                    <label htmlFor="site_web">Site Web</label>
                    <input
                    type="text"
                    id="site_web"
                    value={nouveauPointDepot.site_web}
                    onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, site_web: e.target.value })}
                    className="border border-gray-300 p-2 w-full rounded-3xl"
                    required
                    />

                </div>
              <div>
                <label htmlFor="photo_lieu">Photo Lieu</label>
                <input
                  type="text"
                  id="photo_lieu"
                  value={nouveauPointDepot.photo_lieu}
                  onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, photo_lieu: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                />
              </div>
              <div>
                <label htmlFor="presentation_lieu">Présentation Lieu</label>
                <input
                  type="text"
                  id="presentation_lieu"
                  value={nouveauPointDepot.presentation_lieu}
                  onChange={(e) => setNouveauPointDepot({ ...nouveauPointDepot, presentation_lieu: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-3xl"
                />
              </div>
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded rounded-3xl">
              Créer
            </button>
          </form>
        )}

        <div className="h-[600px] overflow-y-auto ">
          <h1 className="text-3xl font-bold mb-4">Points de Dépôt disponibles</h1>

          <ul>
          {pointsDepot.map((pointDepot) => (
  <li
    key={pointDepot.id}
    className="text-white border border-gray-300 p-4 mb-4 flex justify-between items-center bg-gradient-to-r from-green-500 to-green-400 rounded-3xl"
  >
<div className="bg-white p-4 rounded-3xl shadow-md">
  <p className="text-2xl font-bold mb-2 text-black">{pointDepot.nom}</p>
  <p className="text-gray-600 mb-2">{pointDepot.adresse}, {pointDepot.code_postal} {pointDepot.ville}</p>
  <p className="text-gray-600 mb-2">Téléphone: {pointDepot.numero_de_telephone}</p>
  <p className="text-gray-600 mb-2">Mail: {pointDepot.mail}</p>
  {/* Ajoutez d'autres détails au besoin */}
</div>

    <div>
  <button onClick={() => toggleEditingPointDepot(pointDepot)} className="text-white bg-blue-500 rounded-full p-2 m-2 w-10 h-10">
    <FontAwesomeIcon icon={faPencilAlt}  />
  </button>
  <button onClick={() => supprimerPointDepot(pointDepot.id)} className="text-white bg-red-500 rounded-full p-2 m-2 ml-3 mr-3  w-10 h-10">
    <FontAwesomeIcon icon={faTrash}  />
  </button>
</div>


  </li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default PointDepotComponent;