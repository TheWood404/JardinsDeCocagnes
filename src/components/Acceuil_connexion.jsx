import React from 'react';

const AccueilConnexion = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-b from-white via-transparent to-transparent h-full w-full absolute" />

      <div className="absolute top-8">
        <img src='../images/CocagneLogo.png' alt="Logo Jardins de Cocagnes" width="350" height="300" />
      </div>

      <div className="rounded-3xl bg-white p-8 transform sm:mr-96 sm:ml-96 relative z-10">
        <div className="bg-green-200 rounded-3xl p-8 text-black font-normal mb-4">
          Vous êtes actuellement sur la page du portail de connexion du réseau des Jardins de Cacagnes. <br /><br />
          Bienvenue dans notre espace en ligne qui vous permet d'accéder à différents espaces. Rejoignez-nous pour cultiver la passion du jardinage ensemble et faire pousser de belles amitiés verdoyantes.
        </div>
        <div className="flex items-center flex-col space-y-4">
          <button className="font-semibold w-72 h-14 bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out">
            Je suis adhérent
          </button>
          <button className="font-semibold w-72 h-14  bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out">
            Je suis responsable
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccueilConnexion;
