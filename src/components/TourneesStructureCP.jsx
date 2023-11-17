import React from 'react';
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet'
import L from 'leaflet'
import arcades from './arcades.json'


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const polyline = [
  [130.5, 31.5],
  [139.51, 35.1]
]

const TourneesMap = () => {
  return (
    <MapContainer
      center={[48.283329, 6.95]}
      zoom={13}
      minZoom={3}
      maxZoom={19}
      maxBounds={[[-85.06, -180], [85.06, 180]]}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}>

      <TileLayer 
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" 
      />
  
      {arcades.features
        .map((arcade, index) => 
          (
            <Marker
              key={arcade.properties['@id']}
              position={[arcade.geometry.coordinates[1], arcade.geometry.coordinates[0]]}
            >

            <Popup>
              {arcade.properties.name}
              <br />
              {arcade.properties['name:en']}
            </Popup>
            
            </Marker>
          )
        )
      }

      <Polyline positions={polyline} />
    </MapContainer>
  );
};

export default TourneesMap;