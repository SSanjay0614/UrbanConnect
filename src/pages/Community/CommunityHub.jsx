import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
import { formatNumber } from '../../utils/formatters.js';

export default function CommunityHub() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIdeas([
        { id: 'c1', title: 'Street Art Festival', description: 'Revitalize public spaces with local artists', votes: 15 },
        { id: 'c2', title: 'Community Tool Library', description: 'Share tools for DIY and repairs', votes: 9 },
      ]);
      setIsLoading(false);
    }, 200);
  }, []);

  const totalVotes = useMemo(() => ideas.reduce((s, i) => s + (i.votes || 0), 0), [ideas]);

  const onCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newIdea = { id: `c${Date.now()}`, title: title.trim(), description: description.trim(), votes: 0 };
    setIdeas((prev) => [newIdea, ...prev]);
    setTitle('');
    setDescription('');
  };

  const onUpvote = (id) => setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, votes: (i.votes || 0) + 1 } : i)));

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={useAuth().role} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Community Space</h1>
          <p className="muted" style={{ marginTop: 4 }}>Propose community-led ideas, discuss and upvote.</p>
        </div>
        <form onSubmit={onCreate} className="card" style={{ display: 'grid', gap: 8 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="muted">Idea Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Neighborhood composting program" />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span className="muted">Description</span>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What problem does this solve?" />
          </label>
          <button className="btn btn-primary" type="submit">Create Idea</button>
        </form>
        {isLoading ? <div className="muted">Loading…</div> : null}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="muted">Total votes: {formatNumber(totalVotes)}</div>
        </div>
        <div className="grid-2">
          {ideas.map((i) => (
            <div key={i.id} className="card" style={{ display: 'grid', gap: 6 }}>
              <h3 style={{ margin: 0 }}>{i.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{i.description}</p>
              <button className="btn" onClick={() => onUpvote(i.id)}>Upvote ({i.votes || 0})</button>
              <details>
                <summary className="btn-text">Discussion</summary>
                <p className="muted">Discussion thread coming soon…</p>
              </details>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}


