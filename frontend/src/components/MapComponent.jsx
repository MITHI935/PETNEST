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

const CITY_COORDS = {
  'mumbai': [19.0760, 72.8777],
  'bangalore': [12.9716, 77.5946],
  'delhi': [28.6139, 77.2090],
  'pune': [18.5204, 73.8567],
  'hyderabad': [17.3850, 78.4867],
  'chennai': [13.0827, 80.2707],
  'kolkata': [22.5726, 88.3639],
  'guwahati': [26.1445, 91.7362],
};

const MapComponent = ({ items, type = 'vet' }) => {
  // Determine the map center based on the first item's location
  const getInitialCenter = () => {
    if (items.length > 0 && items[0].location) {
      const loc = items[0].location.toLowerCase().trim();
      // Check if the city is in our lookup table
      for (const [city, coords] of Object.entries(CITY_COORDS)) {
        if (loc.includes(city)) return coords;
      }
    }
    return CITY_COORDS['mumbai']; // Default fallback
  };

  const center = getInitialCenter();
  
  // Filter items and generate positions based on their city
  const markers = items.map((item) => {
    let baseCoords = center;
    
    // Find specific city coords for each marker if different from center
    if (item.location) {
      const loc = item.location.toLowerCase().trim();
      for (const [city, coords] of Object.entries(CITY_COORDS)) {
        if (loc.includes(city)) {
          baseCoords = coords;
          break;
        }
      }
    }

    // Generate random offset around the city's base coordinates
    const lat = item.latitude || (baseCoords[0] + (Math.random() - 0.5) * 0.05);
    const lng = item.longitude || (baseCoords[1] + (Math.random() - 0.5) * 0.05);
    
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
                <p className="text-xs text-gray-500 mb-1">{item.location}</p>
                {type === 'pet' && (
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                    {item.breed} • {item.age}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  {type === 'vet' ? (
                    <span className="text-primary-coral font-bold text-sm">★ {item.rating || 'N/A'}</span>
                  ) : (
                    <span className="text-primary-coral font-bold text-sm">₹{item.price === 0 ? 'FREE' : item.price}</span>
                  )}
                  <button className={`text-[10px] ${type === 'vet' ? 'bg-primary-teal' : 'bg-primary-coral'} text-white px-2 py-1 rounded-full font-bold shadow-sm hover:scale-105 transition-transform`}>
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
