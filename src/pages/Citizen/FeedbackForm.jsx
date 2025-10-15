import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
import { mockProjects } from '../../utils/mockData.js';
// Mock submission (no backend)

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [projectId, setProjectId] = useState('general');
  const [rating, setRating] = useState(3);
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 500));
      console.log('Mock submit:', { text, category, projectId, rating, anonymous });
      setText('');
      setProjectId('general');
      setRating(3);
      setAnonymous(false);
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
        <div className="container" style={{ maxWidth: 720 }}>
          <TopActions role={useAuth().role} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Submit Feedback</h1>
          <p className="muted" style={{ marginTop: 4 }}>Share feedback about existing projects or general city improvements.</p>
        </div>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="muted">Project</span>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              <option value="general">General (no specific project)</option>
              {mockProjects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="muted">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>General</option>
              <option>Mobility</option>
              <option>Sanitation</option>
              <option>Safety</option>
              <option>Parks</option>
            </select>
          </label>
          <div className="grid-2">
            <label style={{ display: 'grid', gap: 6 }}>
              <span className="muted">Project Rating</span>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              <span className="muted">Submit anonymously</span>
            </label>
          </div>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="muted">Your feedback</span>
            <textarea placeholder="Share your thoughts about the selected project or a general idea…" rows={6} value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Submit'}</button>
            <Link to="/" className="btn">Cancel</Link>
          </div>
          {status === 'success' ? <div className="muted">Thanks for your feedback! Your input helps improve city projects.</div> : null}
          {status === 'error' ? <div className="muted">Something went wrong. Try again.</div> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

