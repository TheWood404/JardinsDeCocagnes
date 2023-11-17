import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StructureRegisterCP = ({ setUtilisateurConnecte }) => {


  const [nom_commercial, setNomCommercial] = useState('');
  const [ville, setVille] = useState('');
  const [raison_sociale, setRaisonSociale] = useState('');
  const [siege_social, setSiegeSocial] = useState('');
  const [adresse_de_gestion, setAdresseDeGestion] = useState('');
  const [coordonnees_commerciales, setCoordonneescommerciales] = useState('');
  const [num_identification, setNumIdentification] = useState('');
  const nav = useNavigate();

  const handleClickRegister = async () => {
    try {

      const response = await axios.post('/api/registerstructure', { nom_commercial: nom_commercial, ville: ville, raison_sociale: raison_sociale, siege_social: siege_social, adresse_de_gestion: adresse_de_gestion, coordonnees_commerciales: coordonnees_commerciales, num_identification: num_identification});
      console.log(response.data);
      if (response.data.success) {
        console.log('Ok');
        nav('/connexion-responsable');
      } 
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gradient-to-b from-white via-transparent to-transparent h-full w-full absolute" />

      <div className="absolute top-8">
        <img src='../images/CocagneLogo.png' alt="Logo Jardins de Cocagnes" width="350" height="300" />
      </div>

      <div className="rounded-3xl bg-white p-8 transform sm:mr-96 sm:ml-96 relative z-10 w-[800px] h-[500px] overflow-scroll">
        <div className="flex sm:flex flex-wrap">
          <div className="flex flex-col flex-1 pr-4">
            <form className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Nom Commerciale">Nom Commerciale</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="nom_commercial" name="nom_commercial" value={nom_commercial} onChange={(e) => setNomCommercial(e.target.value)}/>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Ville">Ville</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="ville" name="ville" value={ville} onChange={(e) => setVille(e.target.value)}/>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Raison sociale">Raison sociale</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="raison_sociale" name="raison_sociale" value={raison_sociale} onChange={(e) => setRaisonSociale(e.target.value)}/>
              </div>
            </form>
          </div>

          <div className="flex flex-col flex-1 pl-4">
          <form className="flex flex-col space-y-4">

            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Siege Sociale">Siege Sociale</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Siege Sociale" name="Siege Sociale" value={siege_social} onChange={(e) => setSiegeSocial(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Adresse de Gestion">Adresse de Gestion</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="adresse_de_gestion" name="adresse_de_gestion" value={adresse_de_gestion} onChange={(e) => setAdresseDeGestion(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Coordonnées Commerciales">Coordonnées Commerciales</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="coordonnees_commerciales" name="coordonnees_commerciales" value={coordonnees_commerciales} onChange={(e) => setCoordonneescommerciales(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Numéro d'identification">Numéro d'identification</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="num_identification" name="num_identification" value={num_identification} onChange={(e) => setNumIdentification(e.target.value)}/>
            </div>
            </form>
          </div>
         
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="font-semibold w-72 h-14 bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out" onClick={handleClickRegister} >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StructureRegisterCP;
