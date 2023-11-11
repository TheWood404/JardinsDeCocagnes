import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

function Calendrier() {
  const [events, setEvents] = useState([]);
  const [currentAction, setCurrentAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fermetureDates, setFermetureDates] = useState({ start: null, end: null });
  const calendarRef = useRef();

  const handleSelectDate = (info) => {
    const { start, end, resourceId } = info;
    if (currentAction) {
      if (currentAction === 'Fermeture') {
        setFermetureDates({ start, end });
        setIsModalOpen(true);
      } else {
        const newEvent = {
          start,
          end,
          title: currentAction,
        };
        setEvents([...events, newEvent]);
        setCurrentAction(null);
      }
    }
    // Envoyer la requête au serveur pour mettre à jour la base de données avec les nouvelles données
    // Par exemple, POST /api/update-calendar avec les données newEvent
  };

  const handleSelectEvent = (info) => {
    // Gérez la sélection d'un événement existant, par exemple, pour "modifier" ou "supprimer"
    // Affichez un formulaire de modification ou de confirmation de suppression
  };

  const handleUndo = () => {
    if (events.length > 0) {
      const newEvents = [...events];
      newEvents.pop();
      setEvents(newEvents);
    }
    // Envoyer la requête au serveur pour supprimer le dernier événement de la base de données
    // Par exemple, DELETE /api/delete-last-event
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    if (fermetureDates.start && fermetureDates.end) {
      const newEvent = {
        start: fermetureDates.start,
        end: fermetureDates.end,
        title: 'Fermeture',
      };
      setEvents([...events, newEvent]);
      // Envoyer la requête au serveur pour ajouter un événement de fermeture à la base de données
      // Par exemple, POST /api/add-fermeture avec les données newEvent
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.select(events);
    }
  }, [events]);

  return (
    <div className="flex">
      <div className="w-3/4 pr-4" style={{ width: '75%' }}>
        <div style={{ height: '600px' }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            select={handleSelectDate}
            selectMirror={true}
            editable={true}
          />
        </div>
      </div>
      <div className="w-1/4" style={{ width: '25%' }}>
        <div className="flex flex-col">
          <button
            onClick={() => setCurrentAction('Livraisons possibles')}
            className="bg-blue-500 text-white p-2 rounded mb-2"
          >
            Livraisons possibles
          </button>
          <button
            onClick={() => setCurrentAction('Livraison impossible')}
            className="bg-red-500 text-white p-2 rounded mb-2"
          >
            Livraison impossible
          </button>
          <button
            onClick={() => setCurrentAction('Fermeture')}
            className="bg-gray-500 text-white p-2 rounded mb-2"
          >
            Ajouter période de fermeture
          </button>
          <button onClick={handleUndo} className="bg-yellow-500 text-white p-2 rounded">
            Annuler
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-opacity-75 bg-black"
        shouldCloseOnOverlayClick={true}
      >
        <div className="bg-white p-4 rounded shadow-lg">
          <p>Contenu de la modale</p>
          <button onClick={handleModalSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
            Valider
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Calendrier;
