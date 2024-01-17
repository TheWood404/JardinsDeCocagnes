import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

const RoutingMachineWrapper = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    let control = null;

    if (map && waypoints.length === 2) {
      control = L.Routing.control({
        waypoints: waypoints,
      });

      control.addTo(map);
    }

    return () => {
      if (control) {
        setTimeout(() => {
          console.log('Removing Routing Control from map...');
          map.removeControl(control);
          console.log('Routing Control removed from map');
        }, 3000);
      }
    };
  }, [map, waypoints]);

  return null;
};

export default RoutingMachineWrapper;
