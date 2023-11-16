import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const ConnexionAdherent = () => {

  const nav = useNavigate();

  const handleClickLogin = () => {
    nav('/compte-adherent');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-b from-white via-transparent to-transparent h-full w-full absolute" />

      <div className="absolute top-8">
        <img src='../images/CocagneLogo.png' alt="Logo Jardins de Cocagnes" width="350" height="300" />
      </div>

      <div className="rounded-3xl bg-white p-8 transform sm:mr-96 sm:ml-96 relative z-10">
        <form action="" className="flex flex-col space-y-4 mb-10">
            <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Mail">Mail</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="mail" id="Mail" name="Mail" />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Mot de passe">Mot de passe</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="password" id="MotDePasse" name="Mot de passe" />
            </div>
        </form>


        <div className="flex items-center flex-col space-y-4">
          <button className="font-semibold w-72 h-14  bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out" onClick={handleClickLogin}>
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnexionAdherent;
