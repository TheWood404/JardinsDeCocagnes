import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConnexionResponsable = ({ setStructureConnecte }) => {

  const [id, setID] = useState('');
  const [numId, setNumId] = useState('');
  const [connexionReussie, setConnexionReussie] = useState(null);
  const nav = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('/api/connexionstructure', { id, num_identification: numId });

      if (response.data.success && response.data.userExists) {
        setConnexionReussie(true);
        console.log("setStructureConnecte:", setStructureConnecte); // Ajoutez cette ligne
        setStructureConnecte(true); // Mettez à jour l'état de l'utilisateur connecté
        //stocker l'id de la structure dans le local storage
        localStorage.setItem('idStructure', response.data.userId);
        //afficher dans la console l'id de la structure
        console.log("idStructure:", response.data.userId);
        nav('/compte-structure');
      } else {
        setConnexionReussie(false);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setConnexionReussie(false);
    } 
  };

  const handleRegisterClick = () => {
    // Naviguez vers la page correspondante au clic sur "Ma structure n'est pas enregistré"
    nav('/structure-register'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-b from-white via-transparent to-transparent h-full w-full absolute" />

      <div className="absolute top-8">
        <img src='../images/CocagneLogo.png' alt="Logo Jardins de Cocagnes" width="350" height="300" />
      </div>

      <div className="rounded-3xl bg-white p-8 transform sm:mr-96 sm:ml-96 relative z-10">
        <form className="flex flex-col space-y-4 mb-10">
            <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="ID de la structure">ID de la structure</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="password" id="ID" name="ID" value={id} onChange={(e) => setID(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Numéro d'identification">Numéro d'identification</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="password" id="numId" name="numId" value={numId} onChange={(e) => setNumId(e.target.value)}/>
            </div>
        </form>

        <div className="flex items-center flex-col space-y-4">
          <button className="font-semibold w-72 h-14  bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out" onClick={handleLoginClick} >
            Connexion
          </button>
          <div className='underline decoration-1	underline-offset-4 text-green-600 cursor-pointer	' onClick={handleRegisterClick}>Ma structure n'est pas enregistré</div>
        </div>
      </div>
    </div>
  );
};

export default ConnexionResponsable;
