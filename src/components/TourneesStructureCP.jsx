import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TourneesMap = () => {
  const [depotCoordinates, setDepotCoordinates] = useState([]);
  
  useEffect(() => {
    // Fetch depot coordinates from the server
    const fetchDepotCoordinates = async () => {
      try {
        const response = await axios.get('/api/coordonneespointdedepot');
        console.log('Réponse du serveur :', response.data);
        setDepotCoordinates(response.data.coordonnees);
      } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées des points de dépôt :', error);
      }
    };
  
    fetchDepotCoordinates();
  }, []);

  return (
    <MapContainer
      center={[48.283329, 6.95]}
      zoom={13}
      minZoom={3}
      maxZoom={19}
      maxBounds={[[-85.06, -180], [85.06, 180]]}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {depotCoordinates.map((coordonnee, index) => (
  <Marker key={index} position={[coordonnee.longitude, coordonnee.latitude]}>
    {/* You can customize the popup content if needed */}
  </Marker>
))}
    </MapContainer>
  );
};

export default TourneesMap;
