import React from 'react';

const StructureRegisterCP = () => {
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
                <label className="font-semibold" htmlFor="ID de la structure">ID de la structure</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="ID de la structure" name="ID de la structure" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Nom Commerciale">Nom Commerciale</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Nom Commerciale" name="Nom Commerciale" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Ville">Ville</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Ville" name="Ville" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="Raison sociale">Raison sociale</label>
                <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Raison sociale" name="Raison sociale" />
              </div>
            </form>
          </div>

          <div className="flex flex-col flex-1 pl-4">
          <form className="flex flex-col space-y-4">

            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Siege Sociale">Siege Sociale</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Siege Sociale" name="Siege Sociale" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Adresse de Gestion">Adresse de Gestion</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Adresse de Gestion" name="Adresse de Gestion" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Coordonnées Commerciales">Coordonnées Commerciales</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Coordonnées Commerciales" name="Coordonnées Commerciales" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="Numéro d'identification">Numéro d'identification</label>
              <input className="rounded-3xl border border-gray-400 p-2" type="text" id="Numéro d'identification" name="Numéro d'identification" />
            </div>
            </form>
          </div>
         
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="font-semibold w-72 h-14 bg-green-400 rounded-3xl p-2 text-black hover:bg-green-600 transition duration-300 ease-in-out" >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StructureRegisterCP;
