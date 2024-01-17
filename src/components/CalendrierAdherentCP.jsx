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
          
          // Avant de faire la requête POST, récupérez l'ID du jour depuis le backend
          const idResponse = await axios.get(`/api/get-id-for-day?day=${selectedDay}`);
          const idSelectedDay = idResponse.data.id;
      
          const response = await axios.post('/api/valider-jour', {
            idAdherent,
            selectedDay: idSelectedDay, // Envoyez l'ID du jour, pas le nom du jour
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
      <div>
        <h2>Calendrier de l'adhérent</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {joursLivrables.map((jour, index) => (
                <li key={index} onClick={() => handleDayClick(jour)} className={selectedDay === jour ? 'selected' : ''}>
                  {jour}
                </li>
              ))}
            </ul>
            {selectedDay && confirming && (
              <div>
                <p>Voulez-vous vraiment valider le jour {selectedDay} ?</p>
                <button onClick={handleConfirmValidation}>Confirmer</button>
                <button onClick={handleCancelConfirmation}>Annuler</button>
              </div>
            )}
            {selectedDayId && (
              <p>ID du jour sélectionné : {selectedDayId}</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default CalendrierAdherentCP;
  