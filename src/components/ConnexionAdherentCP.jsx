import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ConnexionAdherent = ({ setUtilisateurConnecte }) => {

  const [mail, setMail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [connexionReussie, setConnexionReussie] = useState(null);
  const nav = useNavigate();


  const handleClickLogin = async () => {
    try { 
      const response = await axios.post('/api/connexion', { mail, mdp_espace_client: motDePasse });
  
      if (response.data.success && response.data.userExists) {
        setConnexionReussie(true);
        console.log("setUtilisateurConnecte:", setUtilisateurConnecte); // Ajoutez cette ligne
        setUtilisateurConnecte(true); // Mettez à jour l'état de l'utilisateur connecté
        //stocker l'id_structure de l'adhérent dans le local storage
        localStorage.setItem('idStructureAdherent', response.data.structId);

        //stocker l'id_adherent de l'adhérent dans le local storage
        localStorage.setItem('idAdherent', response.data.userId);
        //afficher dans la console l'id_adherent de l'adhérent
        console.log("idAdherent:", response.data.userId);

   
        //concole log de l'id_structure de l'adhérent
        console.log("idStructureAdherent:", response.data.structId);
        nav('/compte-adherent');
      } else {
        setConnexionReussie(false);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setConnexionReussie(false);
    }
  };
  

  //fonction de deconnexion
  const handleClickLogout = async () => {
    try {
      const response = await axios.get('/api/deconnexion');

      if (response.data.success) {
        setConnexionReussie(false);
        nav('/');
      } else {
        setConnexionReussie(true);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      setConnexionReussie(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-b from-white via-transparent to-transparent h-full w-full absolute" />

      <div className="absolute top-8">
        <img src="../images/CocagneLogo.png" alt="Logo Jardins de Cocagnes" width="350" height="300" />
      </div>

      <div className="rounded-3xl bg-white p-8 transform sm:mr-96 sm:ml-96 relative z-10">
        <form className="flex flex-col space-y-4 mb-10">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="Mail">
              Mail
            </label>
            <input
              className="rounded-3xl border border-gray-400 p-2"
              type="email"
              id="Mail"
              name="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="Mot de passe">
              Mot de passe
            </label>
            <input
              className="rounded-3xl border border-gray-400 p-2"
              type="password"
              id="Mot de passe"
              name="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center flex-col space-y-4">
          <button
            className="font-semibold w-72 h-14 bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out"
            onClick={handleClickLogin}
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnexionAdherent;