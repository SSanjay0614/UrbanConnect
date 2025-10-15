import { useMemo, useState } from 'react';

export default function useMap(initialMarkers = []) {
  const [markers, setMarkers] = useState(initialMarkers);

  const addMarker = (lat, lng, label) => {
    setMarkers((prev) => [...prev, { lat, lng, label }]);
  };

  const clearMarkers = () => setMarkers([]);

  return useMemo(() => ({ markers, addMarker, clearMarkers, setMarkers }), [markers]);
}

