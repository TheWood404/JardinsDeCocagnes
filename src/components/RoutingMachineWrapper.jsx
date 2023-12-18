import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

const RoutingMachineWrapper = ({ waypoints }) => {
  const map = useMap();
  let control = null; // Ajout d'une référence pour stocker le contrôle de routage

  useEffect(() => {
    if (map && waypoints.length >= 2) {
      // Créez le contrôle de routage et ajoutez-le à la carte
      control = L.Routing.control({
        waypoints: waypoints,
      });

      control.addTo(map);

      return () => {
        // Nettoyez le contrôle de routage lors du démontage du composant
        if (control) {
          map.removeControl(control);
        }
      };
    }
  }, [map, waypoints]);

  return null;
};

export default RoutingMachineWrapper;
