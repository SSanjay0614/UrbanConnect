import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
import { formatNumber, truncate } from '../../utils/formatters.js';
import { mockProjects } from '../../utils/mockData.js';

export default function VoteProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock list sourced from shared data
    setIsLoading(true);
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 300);
  }, []);

  const onVote = async (id) => {
    // Mock vote + optimistic update
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, votes: (p.votes || 0) + 1 } : p)));
  };

  const totalVotes = useMemo(() => projects.reduce((sum, p) => sum + (p.votes || 0), 0), [projects]);

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={useAuth().role} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Vote Projects</h1>
          <p className="muted" style={{ marginTop: 4 }}>Support proposals that matter to you.</p>
        </div>
        {isLoading ? <div className="muted">Loading…</div> : null}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="muted">Total votes: {formatNumber(totalVotes)}</div>
          <Link to="/feedback" className="btn">Give Feedback</Link>
        </div>
        <div className="grid-2">
          {projects.map((p) => (
            <div key={p.id} className="card">
              <h3 style={{ margin: '4px 0' }}>{p.title}</h3>
              <p className="muted" style={{ margin: '4px 0' }}>{truncate(p.description)}</p>
              <p style={{ margin: '4px 0' }}>Budget: ₹{formatNumber(p.budget)} • Status: {p.status}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '6px 0' }}>
                <span className="tag">Accessibility: {p.inclusivity?.accessibility}/5</span>
                <span className="tag">Safety: {p.inclusivity?.safety}/5</span>
                <span className="tag">Equity: {p.inclusivity?.equity}/5</span>
              </div>
              <button className="btn btn-primary" onClick={() => onVote(p.id)}>Upvote ({p.votes || 0})</button>
              <details style={{ marginTop: 8 }}>
                <summary className="btn-text">More details</summary>
                <p className="muted" style={{ marginTop: 6 }}>{p.description}</p>
                <label style={{ display: 'grid', gap: 6, marginTop: 8 }}>
                  <span className="muted">Your opinion</span>
                  <textarea rows={3} placeholder="Share your thoughts or concerns about this project"></textarea>
                </label>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button className="btn">Agree</button>
                  <button className="btn">Neutral</button>
                  <button className="btn">Disagree</button>
                </div>
              </details>
            </div>
          ))}
        </div>
            <a href="/" className="btn">Back</a>
          </div>
        </div>
      </div>
    </div>
  );
}

