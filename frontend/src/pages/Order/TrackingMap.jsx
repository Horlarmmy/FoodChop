import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TrackingMap = ({ currentLocation, deliveryLocation, orderStatus }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (currentLocation && deliveryLocation && mapContainerRef.current) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 13,
      });

      // Add user's location marker
      new mapboxgl.Marker({ color: '#4CAF50' })
        .setLngLat([currentLocation.longitude, currentLocation.latitude])
        .addTo(map);

      // Add delivery location marker
      new mapboxgl.Marker({ color: '#FF5722' })
        .setLngLat([deliveryLocation.longitude, deliveryLocation.latitude])
        .addTo(map);

      // Add a line between the user's location and the delivery location
      new mapboxgl.GeoJSONSource({
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [currentLocation.longitude, currentLocation.latitude],
              [deliveryLocation.longitude, deliveryLocation.latitude],
            ],
          },
        },
      }).addTo(map);

      new mapboxgl.Layer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FF5722',
          'line-width': 4,
        },
      }).addTo(map);

      // Add status markers
      orderStatus.forEach((status) => {
        new mapboxgl.Marker({ color: status.color })
          .setLngLat([status.longitude, status.latitude])
          .addTo(map);
      });

      return () => map.remove();
    }
  }, [currentLocation, deliveryLocation, orderStatus, mapContainerRef]);

  return (
    <div ref={mapContainerRef} style={{ height: '400px' }}></div>
  );
};

export default TrackingMap;