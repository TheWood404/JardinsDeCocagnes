import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConnexionResponsable = () => {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Naviguez vers la page correspondante au clic sur "Ma structure n'est pas enregistré"
    navigate('/structure-register'); 
  }

  const handleLoginClick = () => {
    // Naviguez vers la page correspondante au clic sur "Connexion"
    navigate('/compte-structure'); 
  }

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
                <input className="rounded-3xl border border-gray-400 p-2" type="password" id="ID de la structure" name="ID de la structure" />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Numéro d'identification">Numéro d'identification</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="password" id="Numéro d'identification" name="Numéro d'identification" />
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
