import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP } from '../utils/constants.js';
import L from 'leaflet';

// Configure default marker icons (fixes missing icons under bundlers like Vite)
delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line no-underscore-dangle
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ClickHandler({ onMapClick }) {
  useMapEvent('click', (e) => {
    if (onMapClick) onMapClick(e.latlng);
  });
  return null;
}

export default function MapView({ markers = [], onMapClick, onMarkerDrag }) {
  return (
    <div style={{ height: 360, width: '100%' }}>
      <MapContainer center={[MAP.defaultCenter.lat, MAP.defaultCenter.lng]} zoom={MAP.defaultZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <ClickHandler onMapClick={onMapClick} />
        {markers.map((m, idx) => (
          <Marker key={`${idx}-${m.lat}-${m.lng}`} position={[m.lat, m.lng]} draggable eventHandlers={{ dragend: (e) => {
            const ll = e.target.getLatLng();
            if (onMarkerDrag) onMarkerDrag(idx, { lat: ll.lat, lng: ll.lng });
          } }}>
            {m.label ? <Popup>{m.label}</Popup> : null}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

