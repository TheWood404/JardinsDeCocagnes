import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import RoutingMachineWrapper from './RoutingMachineWrapper';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TourneesMap = () => {
  const [depotCoordinates, setDepotCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedDepots, setSelectedDepots] = useState([]);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    const fetchDataAndSetDepotCoordinates = async () => {
      try {
        const response = await axios.get('/api/coordonneespointdedepot');
        console.log('Réponse du serveur :', response.data);

        if (response.data.coordonnees.length > 0) {
          setDepotCoordinates(response.data.coordonnees);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des coordonnées des points de dépôt :',
          error
        );
        setLoading(false);
      }
    };

    fetchDataAndSetDepotCoordinates();
  }, []);

  useEffect(() => {
    console.log('mapRef.current:', mapRef.current);
    console.log('routingControl:', routingControl);
    console.log('selectedDepots use effect:', selectedDepots);
    if (mapRef.current && selectedDepots.length === 2 && !routingControl) {
      console.log('Creating Routing Control...');
      const waypoints = selectedDepots.map((index) => {
        const coordonnee = depotCoordinates[index];
        return L.latLng(coordonnee.longitude, coordonnee.latitude);
      });

      const control = L.Routing.control({ waypoints });
      setRoutingControl(control);
      console.log('Routing Control created');

      const mapElement = mapRef.current.leafletElement;
      if (mapElement && mapElement.getSize) {
        console.log('Adding Routing Control to map...');
        control.addTo(mapElement);
        console.log('Routing Control added to map');
      } else {
        console.error('Map element or getSize method is undefined');
      }
    }
  }, [selectedDepots, routingControl, depotCoordinates]);

  const handleMapCreate = (map) => {
    console.log('Map created:', map);
    mapRef.current = map;
  };

  const handleMarkerClick = (index) => {
    setSelectedDepots((prevSelectedDepots) => {
      if (prevSelectedDepots.includes(index)) {
        return prevSelectedDepots.filter((i) => i !== index);
      } else {
        return [...prevSelectedDepots.slice(-1), index];
      }
    });
  };
  

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
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
              eventHandlers={{
                click: (e) => {
                  handleMarkerClick(index);
                },
              }}
            >
              <Popup>
                <p>Depot {index + 1}</p>
                <p>Latitude: {coordonnee.longitude}</p>
                <p>Longitude: {coordonnee.latitude}</p>
              </Popup>
            </Marker>
          ))}

          {console.log('Selected depots 1:', selectedDepots)}
          {console.log('Rendering RoutingMachineWrapper')}
          {selectedDepots.length === 2 && !routingControl && (
            <RoutingMachineWrapper waypoints={selectedDepots.map((index) => {
              const coordonnee = depotCoordinates[index];
              return L.latLng(coordonnee.longitude, coordonnee.latitude);
            })} />
          )}
        </MapContainer>
      )}
    </>
  );
};

export default TourneesMap;
