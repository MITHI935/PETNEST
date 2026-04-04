import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const customMarker = new L.Icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
});

const MapComponent = ({ items, type = 'vet' }) => {
  // Default center (Mumbai)
  const center = [19.0760, 72.8777];
  
  // Filter items that have lat/lng or mock them if they don't for demo
  const markers = items.map((item, index) => {
    // If no coordinates, generate some around the center for demo purposes
    // In a real app, these would come from the database
    const lat = item.latitude || (center[0] + (Math.random() - 0.5) * 0.1);
    const lng = item.longitude || (center[1] + (Math.random() - 0.5) * 0.1);
    
    return {
      ...item,
      position: [lat, lng]
    };
  });

  return (
    <div className="h-[600px] w-full rounded-[40px] overflow-hidden border-4 border-white shadow-2xl z-0">
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((item) => (
          <Marker key={item.id} position={item.position} icon={customMarker}>
            <Popup className="custom-popup">
              <div className="p-2">
                {item.image_url && (
                  <img src={item.image_url} alt="" className="w-full h-20 object-cover rounded-lg mb-2" />
                )}
                <h3 className="font-bold text-gray-900">{item.clinic_name || item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-coral font-bold text-sm">★ {item.rating || 'N/A'}</span>
                  <button className="text-[10px] bg-primary-teal text-white px-2 py-1 rounded-full font-bold">
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
