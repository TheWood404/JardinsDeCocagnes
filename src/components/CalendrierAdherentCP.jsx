import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ... (votre import et autres états restent inchangés)

const CalendrierAdherentCP = () => {
    const [joursLivrables, setJoursLivrables] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedDayId, setSelectedDayId] = useState(null);
  
    useEffect(() => {
      const idAdherent = localStorage.getItem('idAdherent');
  
      if (!idAdherent) {
        console.error('ID de l\'adhérent non trouvé dans le localStorage.');
        setLoading(false);
        return;
      }
  
      const fetchCalendrier = async () => {
        try {
          const response = await axios.get(`/api/calendrier-adherent?idAdherent=${idAdherent}`);
          console.log('Réponse du serveur :', response);
          setJoursLivrables(response.data.joursLivrables);
        } catch (error) {
          console.error('Erreur lors de la récupération des données du calendrier de l\'adhérent:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCalendrier();
    }, []);
  
    const handleDayClick = (day) => {
        setSelectedDay(day);
        setConfirming(true);
      };
  
    const handleCancelConfirmation = () => {
      setConfirming(false);
    };
  
    const handleConfirmValidation = async () => {
        try {
          const idAdherent = localStorage.getItem('idAdherent');
          const idStructureAdherent = localStorage.getItem('idStructureAdherent');
          
          // Avant de faire la requête POST, récupérez l'ID du jour depuis le backend
          const idResponse = await axios.get(`/api/get-id-for-day?day=${selectedDay}`);
          const idSelectedDay = idResponse.data.id;
      
          const response = await axios.post('/api/valider-jour', {
            idAdherent,
            selectedDay: idSelectedDay,
            idStructureAdherent // Envoyez l'ID du jour, pas le nom du jour
          });
      
          console.log('selectedDay', selectedDay);
          console.log('idSelectedDay', idSelectedDay);
          console.log('Réponse du serveur :', response.data);
      
          setSelectedDayId(idSelectedDay);
        } catch (error) {
          console.error('Erreur lors de la validation du jour:', error);
        } finally {
          setConfirming(false);
        }
      };
      
  
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Calendrier de l'adhérent</h2>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              <ul className="list-disc pl-4">
                {joursLivrables.map((jour, index) => (
                  <li
                    key={index}
                    onClick={() => handleDayClick(jour)}
                    className={`cursor-pointer ${
                      selectedDay === jour ? 'text-blue-500 font-semibold' : ''
                    }`}
                  >
                    {jour}
                  </li>
                ))}
              </ul>
      
              {selectedDay && confirming && (
                <div className="mt-4">
                  <p>Voulez-vous vraiment valider le jour {selectedDay} ?</p>
                  <button
                    className="bg-green-500 text-white px-4 py-1 mr-2 rounded"
                    onClick={handleConfirmValidation}
                  >
                    Confirmer
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                    onClick={handleCancelConfirmation}
                  >
                    Annuler
                  </button>
                </div>
              )}
      
              {selectedDayId && (
                <p className="mt-4">ID du jour sélectionné : {selectedDayId}</p>
              )}
            </div>
          )}
        </div>
      );
              }      
  
  export default CalendrierAdherentCP;
  