import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendar = () => {
    const [deliverableDays, setDeliverableDays] = useState([]);
    const [newDeliverableDate, setNewDeliverableDate] = useState('');
    const [nonDeliverableDays, setNonDeliverableDays] = useState([]);
    const [newNonDeliverableDate, setNewNonDeliverableDate] = useState('');


  
    // Récupère en localstorage l'id de la structure
    const idStructure = localStorage.getItem('idStructureResponsable');
    console.log(idStructure);
  
    useEffect(() => {
      // Faites une requête HTTP pour récupérer les jours livrables depuis votre endpoint
      axios
        .get(`http://localhost:3001/jours-livrables?id_structure=${idStructure}`)
        .then(response => {
          setDeliverableDays(response.data); // Mettez à jour l'état avec les jours livrables
        })
        .catch(error =>
          console.error('Erreur lors de la récupération des jours livrables', error)
        );
    }, [idStructure]); // Ajoutez idStructure en tant que dépendance
    

  useEffect(() => {
    // Faites une requête HTTP pour récupérer les jours non livrables depuis votre endpoint
    axios
      .get(`http://localhost:3001/jours-non-livrables?id_structure=${idStructure}`)
      .then(response => {
        setNonDeliverableDays(response.data); // Mettez à jour l'état avec les jours non livrables
      })
      .catch(error =>
        console.error('Erreur lors de la récupération des jours non livrables', error)
      );
  }, [idStructure]); // Ajoutez idStructure en tant que dépendance

  
    const addDeliverableDay = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/ajouter-jour-livrable',
          {
            id_structure: idStructure, // Utilisez l'ID de la structure connectée
            jour_semaine: newDeliverableDate,
          }
        );
  
        console.log('Réponse de la requête POST :', response);
  
        // Rafraîchissez les jours livrables après l'ajout
        const responseGet = await axios.get(
          `http://localhost:3001/jours-livrables?id_structure=${idStructure}`
        );
        console.log('Réponse de la requête GET après l\'ajout :', responseGet);
  
        setDeliverableDays(responseGet.data);
  
        // Réinitialisez le champ de saisie pour le prochain ajout
        setNewDeliverableDate('');
      } catch (error) {
        console.error(
          'Erreur lors de l\'ajout du jour livrable',
          error.response?.data?.error || error.message
        );
        // Gérer les erreurs ici
      }
    };

    const addNonDeliverableDay = async () => {
        try {
          const response = await axios.post('http://localhost:3001/ajouter-jour-non-livrable', {
            id_structure: idStructure,
            jour_semaine: newNonDeliverableDate,
          });
    
          console.log('Réponse de la requête POST pour jour non livrable :', response);
    
          // Rafraîchissez les jours non livrables après l'ajout
          const responseGet = await axios.get(
            `http://localhost:3001/jours-non-livrables?id_structure=${idStructure}`
          );
          console.log('Réponse de la requête GET pour jours non livrables après l\'ajout :', responseGet);
    
          setNonDeliverableDays(responseGet.data);
    
          // Réinitialisez le champ de saisie pour le prochain ajout
          setNewNonDeliverableDate('');
        } catch (error) {
          console.error(
            'Erreur lors de l\'ajout du jour non livrable',
            error.response?.data?.error || error.message
          );
          // Gérer les erreurs ici
        }
      };
      
      

      const getFilteredDays = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
        const endDate = new Date(currentYear, 11, 31); // December 31st of the current year
      
        const filteredDays = [];
      
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 6) {
            // 2: Tuesday, 3: Wednesday, 5: Friday
            filteredDays.push(date.toISOString().split('T')[0]);
          }
        }
      
        return filteredDays;
      };
      
      const events = [
        ...getFilteredDays().map(date => ({
          title: 'Livrable',
          start: date,
        })),
        ...deliverableDays
          .filter(day => day.id_structure.toString() === idStructure)
          .map(day => ({
            title: 'Livrable',
            start: day.jour_semaine,
            backgroundColor: 'green',
          })),
        ...nonDeliverableDays
          .filter(day => day.id_structure.toString() === idStructure)
          .map(day => ({
            title: 'Non livrable',
            start: day.jour_semaine,
            backgroundColor: 'red',
          })),
      ];

      const [selectedDeliverable, setSelectedDeliverable] = useState('');
    const [selectedNonDeliverable, setSelectedNonDeliverable] = useState('');

    const deleteDeliverableDay = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/supprimer-jour-livrable/${selectedDeliverable}`);
            console.log('Réponse de la requête DELETE pour jour livrable :', response);

            // Rafraîchissez les jours livrables après la suppression
            const responseGet = await axios.get(`http://localhost:3001/jours-livrables?id_structure=${idStructure}`);
            console.log('Réponse de la requête GET après la suppression :', responseGet);

            setDeliverableDays(responseGet.data);

            // Réinitialisez la sélection
            setSelectedDeliverable('');
        } catch (error) {
            console.error('Erreur lors de la suppression du jour livrable', error.response?.data?.error || error.message);
            // Gérer les erreurs ici
        }
    };

    const deleteNonDeliverableDay = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/supprimer-jour-non-livrable/${selectedNonDeliverable}`);
            console.log('Réponse de la requête DELETE pour jour non livrable :', response);

            // Rafraîchissez les jours non livrables après la suppression
            const responseGet = await axios.get(`http://localhost:3001/jours-non-livrables?id_structure=${idStructure}`);
            console.log('Réponse de la requête GET après la suppression :', responseGet);

            setNonDeliverableDays(responseGet.data);

            // Réinitialisez la sélection
            setSelectedNonDeliverable('');
        } catch (error) {
            console.error('Erreur lors de la suppression du jour non livrable', error.response?.data?.error || error.message);
            // Gérer les erreurs ici
        }
    };

    return (
        <div className="container mx-auto p-4">
        <div className="my-4 flex mr-2 items-center bg-gray-200 p-2 rounded-xl">
          <div className="my-4 flex mr-2 items-center bg-gray-200 p-2 rounded-xl">
            <div className="space-x-2  mr-2 ">
              <label className="block mb-2">Nouveau jour livrable :</label>
              <input
                className="border px-2 py-1 rounded-3xl"
                type="date"
                value={newDeliverableDate}
                onChange={(e) => setNewDeliverableDate(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-1 rounded-3xl"
                onClick={addDeliverableDay}
              >
                Ajouter 
              </button>
            </div>
      
            <div className="space-x-2  mr-2">
              <label className="block mb-2">Nouveau jour non livrable :</label>
              <input
                className="border px-2 py-1 rounded-3xl"
                type="date"
                value={newNonDeliverableDate}
                onChange={(e) => setNewNonDeliverableDate(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-4 py-1 rounded-3xl"
                onClick={addNonDeliverableDay}
              >
                Ajouter
              </button>
            </div>
          </div>

            <div className="my-4 flex mr-2 items-center bg-gray-200 p-2 rounded-xl">
            <div className="my-4  mr-2">
                <label className="block mb-2">Jour livrable à supprimer :</label>
                <select
                className="border px-2 py-1 rounded-3xl mr-2"
                value={selectedDeliverable}
                onChange={(e) => setSelectedDeliverable(e.target.value)}
                >
                <option value="">Sélectionner</option>
                {deliverableDays
                    .filter((day) => day.id_structure.toString() === idStructure)
                    .map((day) => (
                    <option key={day.id} value={day.id}>
                        {day.jour_semaine}
                    </option>
                    ))}
                </select>
                <button
                className="bg-red-500 text-white px-4 py-1 rounded-3xl"
                onClick={deleteDeliverableDay}
                >
                Supprimer 
                </button>
            </div>
        
            <div className="my-4  mr-2">
                <label className="block mb-2">Jour non livrable à supprimer :</label>
                <select
                className="border px-2 py-1 rounded-3xl mr-2"
                value={selectedNonDeliverable}
                onChange={(e) => setSelectedNonDeliverable(e.target.value)}
                >
                <option value="">Sélectionner</option>
                {nonDeliverableDays
                    .filter((day) => day.id_structure.toString() === idStructure)
                    .map((day) => (
                    <option key={day.id} value={day.id}>
                        {day.jour_semaine}
                    </option>
                    ))}
                </select>
                <button
                className="bg-red-500 text-white px-4 py-1 rounded-3xl"
                onClick={deleteNonDeliverableDay}
                >
                Supprimer 
                </button>
            </div>
            </div>
            </div>
      
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
        </div>
      );
                }      

export default Calendar;
