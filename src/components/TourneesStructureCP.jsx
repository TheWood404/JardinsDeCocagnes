// Import des modules nécessaires
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import RoutingMachineWrapper from './RoutingMachineWrapper';

// Suppression du style par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

// Configuration des options par défaut pour les icônes de marqueurs
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TourneesMap = () => {
  // États pour stocker les données nécessaires
  const [depotCoordinates, setDepotCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [routingControl, setRoutingControl] = useState(null);
  const [depotALivrer, setDepotALivrer] = useState({});
  const [selectedTournee, setSelectedTournee] = useState(null);
  const [joursLivrables, setJoursLivrables] = useState({});

  // Récupération des coordonnées des points de dépôt depuis l'API
  useEffect(() => {
    const fetchDataAndSetDepotData = async () => {
      try {
        // Remplacez cette valeur par celle appropriée en fonction de votre application
        const idAdhStructure = localStorage.getItem("idStructureResponsable"); // Remplacez par l'ID de la structure
  
        const responseCoordonnees = await axios.get('/api/coordonneespointdedepot');
        const responseDepotsALivrer = await axios.get(`/api/depots-a-livrer/${idAdhStructure}`);
  
        console.log('Réponse du serveur (coordonneespointdedepot):', responseCoordonnees.data);
        console.log('Réponse du serveur (depot a livrer):', responseDepotsALivrer.data);
  
        if (responseCoordonnees.data.coordonnees.length > 0) {
          setDepotCoordinates(responseCoordonnees.data.coordonnees);
        }
  
        if (responseDepotsALivrer.data.success) {
          setDepotALivrer(responseDepotsALivrer.data.depotsALivrer);
  
          // Définir la première tournée comme sélectionnée par défaut
          const firstTourneeKey = Object.keys(responseDepotsALivrer.data.depotsALivrer)[0];
          if (firstTourneeKey !== undefined) {
            setSelectedTournee(parseInt(firstTourneeKey, 10));
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataAndSetDepotData();
  }, []);
  

  // Fonction pour créer le contrôle de routage si prêt
  const createRoutingControlIfReady = () => {
    if (
      mapRef.current &&
      depotALivrer.length > 0 &&
      selectedTournee !== null &&
      !routingControl
    ) {
      const tournee = depotALivrer[selectedTournee];
      const waypoints = tournee.map((depot) => {
        const coordonnee = depotCoordinates[depot];
        return L.latLng(coordonnee.longitude, coordonnee.latitude);
      });

      // Créer le contrôle de routage pour la tournée sélectionnée
      const control = L.Routing.control({ 
        waypoints, 
        routeWhileDragging: true,
        lineOptions: {
          styles: [
            {
              color: 'white', // Utiliser la couleur récupérée de la base de données
              opacity: 1,
              weight: 4
            }
          ]
        }
      });
      setRoutingControl([control]);

      const mapElement = mapRef.current.leafletElement;
      if (mapElement && mapElement.getSize) {
        // Ajouter le contrôle de routage à la carte pour la tournée sélectionnée
        control.addTo(mapElement);

        const markers = tournee.map((index) => {
          const coordonnee = depotCoordinates[index];
          const marker = L.marker(
            [coordonnee.longitude, coordonnee.latitude],
            { icon: createCustomMarkerIcon('#FF0000') }
          );
  
          // Ajouter le marqueur à la carte
          marker.addTo(mapElement);
  
          return marker;
        });

        setRoutingControl((prevControl) => [
          ...prevControl,
          ...markers
        ]);
      }
    }
  };

  const createCustomMarkerIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`
    });
  };

  const resolveJoursLivrables = async () => {
    const joursLivrablesMap = {};
    for (const key of Object.keys(depotALivrer)) {
      const jourName = await getJourNameById(parseInt(key, 10));
      joursLivrablesMap[key] = jourName;
    }
    setJoursLivrables(joursLivrablesMap);
  };

  // Effet pour créer ou détruire le contrôle de routage en fonction des changements
  useEffect(() => {
    createRoutingControlIfReady();
    resolveJoursLivrables();
    // Nettoyage des contrôles de routage lors du démontage du composant
    return () => {
      if (routingControl) {
        routingControl.forEach((control) => {
          console.log('Suppression du contrôle de routage de la carte...');
          if (mapRef.current && mapRef.current.leafletElement) {
            mapRef.current.leafletElement.removeControl(control);
          }
          console.log('Contrôle de routage supprimé de la carte');
        });
      }
    };
  }, [depotALivrer, routingControl, depotCoordinates, selectedTournee]);

  const getJourNameById = async (jourId) => {
    try {
      // Faites une requête à votre API ou à votre serveur pour récupérer le nom du jour
      const response = await axios.get(`/api/jours-livrables/${jourId}`);
      
      if (response.data.success) {
        console.log('Réponse du serveur (jour):', response.data.jourLivrable.jour_semaine);
        return response.data.jourLivrable.jour_semaine;
      } else {
        console.error('Erreur lors de la récupération du nom du jour.');
        return 'Jour Inconnu';
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      return 'Jour Inconnu';
    }
  };
  

  // Gestionnaire pour la création de la carte
  const handleMapCreate = (map) => {
    console.log('Map created:', map);
    mapRef.current = map;

    // Déclencher la création du contrôle de routage lorsque la carte est prête
    createRoutingControlIfReady();
  };

  const handleTourneeChange = (event) => {
    setSelectedTournee(parseInt(event.target.value, 10));
  };

  // Rendu du composant
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
        <div style={{ position: 'absolute', top: '17vh', left: '5vw', zIndex: 1000, background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {/* Ajout du panneau de sélection de la tournée */}
          <label>Sélectionnez la tournée : </label>
          <select value={selectedTournee} onChange={handleTourneeChange}>
              {Object.keys(depotALivrer).map((key, index) => (
                <option key={index} value={key}>
                  {joursLivrables[key]}
                </option>
              ))}
            </select>
        </div>
        <MapContainer
          center={[48.283329, 6.95]}
          zoom={13}
          minZoom={3}
          maxZoom={19}
          maxBounds={[[-85.06, -180], [85.06, 180]]}
          scrollWheelZoom={true}
          style={{ height: '100vh' }}
          whenReady={handleMapCreate}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />

          {depotCoordinates.map((coordonnee, index) => (
            <Marker
              key={index}
              position={[coordonnee.longitude, coordonnee.latitude]}
            >
              <Popup>
                <p>Depot {index + 1}</p>
                <p>Latitude: {coordonnee.longitude}</p>
                <p>Longitude: {coordonnee.latitude}</p>
              </Popup>
            </Marker>
          ))}

          {console.log('Rendering RoutingMachineWrapper')}
          {selectedTournee !== null && (
            <RoutingMachineWrapper
              waypoints={depotALivrer[selectedTournee].map((index) => {
                const coordonnee = depotCoordinates[index];
                return L.latLng(
                  coordonnee.longitude,
                  coordonnee.latitude
                );
              })}
              />
          )}
        </MapContainer>
        </>
      )}
    </>
  );
};

export default TourneesMap;
