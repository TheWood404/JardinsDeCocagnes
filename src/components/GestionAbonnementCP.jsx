import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function GestionAbonnement() {
  const [nomAbonnement, setNomAbonnement] = useState("");
  const [montant, setMontant] = useState("");
  const [produits, setProduits] = useState([]);
  const [typeProduit, setTypeProduit] = useState("");
  const [produitsSelectionnes, setProduitsSelectionnes] = useState([]);
  const [structureId, setStructureId] = useState(localStorage.getItem('idStructure'));
  const [enregistrementReussi, setEnregistrementReussi] = useState(false); // Nouvel état
  const [enregistrementEchoue, setEnregistrementEchoue] = useState(false); // Nouvel état

  const handleMontantChange = (e) => {
    const inputValue = e.target.value;
    if (/^[1-9]\d{0,2}$|^1000$/.test(inputValue) || inputValue === '') {
      setMontant(inputValue);
    }
  };

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('/api/produits');
        setProduits(response.data.produits);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };

    fetchProduits();
  }, []);

  const handleAjouterProduit = () => {
    if (typeProduit) {
      setProduitsSelectionnes([...produitsSelectionnes, { id: Date.now(), nom: typeProduit }]);
    }
  };

  const handleEnregistrerAbonnement = async () => {
    if (!nomAbonnement || !montant || produitsSelectionnes.length === 0) {
      console.error('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    try {
      const response = await axios.post('/api/addabonnements', {
        type: nomAbonnement,
        montant,
        compositions: produitsSelectionnes.map((produit) => produit.nom).join(', '),
        structureId,
      });

      setEnregistrementReussi(true);
      setEnregistrementEchoue(false);

      console.log(response.data);
    } catch (error) {
      setEnregistrementReussi(false);
      setEnregistrementEchoue(true);
      console.error('Erreur lors de la création de l\'abonnement :', error);
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-3xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ajouter un abonnement</h1>

        <div className="mb-4">
          <label htmlFor="nomAbonnement" className="block text-sm font-medium text-gray-600">
            Nom de l'abonnement
          </label>
          <input
            type="text"
            id="nomAbonnement"
            className="mt-1 p-2 border rounded-3xl w-full"
            value={nomAbonnement}
            onChange={(e) => setNomAbonnement(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="montant" className="block text-sm font-medium text-gray-600">
          Montant de l'abonnement (en Euro, entre 1 et 1000)
        </label>
        <input
          type="text"
          id="montant"
          className="mt-1 p-2 border rounded-3xl w-full"
          value={montant}
          onChange={handleMontantChange}
        />
      </div>
      <label htmlFor="typeProduit" className="block text-sm font-medium text-gray-600 flex-grow-0">
            Type de produit
        </label>
      <div className="mb-4 flex items-center">
       
        <select
            id="typeProduit"
            className="mt-1 p-2 border rounded-3xl flex-grow"
            value={typeProduit}
            onChange={(e) => setTypeProduit(e.target.value)}
        >
            <option value="">Sélectionnez un produit</option>
            {produits.map((produit) => (
            <option key={produit.id} value={produit.nom}>
                {produit.nom}
            </option>
            ))}
        </select>
        <button
            type="button"
            className="ml-2 bg-blue-500 text-white p-2 rounded-full focus:outline-none"
            onClick={handleAjouterProduit}
        >
            <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Produits sélectionnés</label>
          <div className="flex items-center space-x-2">
            {produitsSelectionnes.map((produit, index) => (
              <span key={produit.id} className="bg-green-500 text-white p-2 rounded-3xl">
                {produit.nom}
              </span>
            ))}
          </div>
         
        </div>
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded-3xl w-full"
          onClick={handleEnregistrerAbonnement}
        >
          Enregistrer Abonnement
        </button>

        {enregistrementReussi && (
          <div className="text-green-500 mt-2">
            L'abonnement a été enregistré avec succès!
          </div>
        )}

        {enregistrementEchoue && (
          <div className="text-red-500 mt-2">
            Une erreur s'est produite lors de l'enregistrement de l'abonnement.
          </div>
        )}
      </div>
    </div>
  );
}


export default GestionAbonnement;
