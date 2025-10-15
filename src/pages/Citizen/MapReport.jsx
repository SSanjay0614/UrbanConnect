import { useState } from 'react';
import MapView from '../../components/MapView.jsx';
import useMap from '../../hooks/useMap.js';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
// Mock report (no backend)

export default function MapReport() {
  const { markers, addMarker, clearMarkers, setMarkers } = useMap([]);
  const [label, setLabel] = useState('Reported issue');
  const [status, setStatus] = useState('idle');

  const addDemoMarker = () => addMarker(12.9716, 77.5946, label);
  const onMapClick = (latlng) => addMarker(latlng.lat, latlng.lng, label);
  const onMarkerDrag = (index, latlng) => {
    setMarkers((prev) => prev.map((m, i) => (i === index ? { ...m, lat: latlng.lat, lng: latlng.lng } : m)));
  };

  const onSubmit = async () => {
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 500));
      console.log('Mock report:', { markers });
      clearMarkers();
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={useAuth().role} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div>
              <h1 style={{ margin: 0 }}>Report an Issue</h1>
              <p className="muted" style={{ marginTop: 4 }}>Add a marker and submit the report.</p>
            </div>
            <div className="grid-2">
              <div className="card" style={{ padding: 0 }}>
                <MapView markers={markers} onMapClick={onMapClick} onMarkerDrag={onMarkerDrag} />
              </div>
              <div className="card" style={{ display: 'grid', gap: 12 }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="muted">Marker label</span>
                  <input placeholder="Pothole near school" value={label} onChange={(e) => setLabel(e.target.value)} />
                </label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn" onClick={addDemoMarker}>Add Marker</button>
                  <button className="btn" onClick={clearMarkers}>Clear</button>
                  <button className="btn btn-primary" onClick={onSubmit} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting…' : 'Submit Report'}
                  </button>
                  <a href="/" className="btn" role="button">Back</a>
                </div>
                {status === 'success' ? <div className="muted">Thanks for your report!</div> : null}
                {status === 'error' ? <div className="muted">Submission failed. Try again.</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

