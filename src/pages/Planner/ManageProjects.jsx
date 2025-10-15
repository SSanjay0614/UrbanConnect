import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import TopActions from '../../components/TopActions.jsx';
import { createProject, listPlannerProjects, updateProject } from '../../services/plannerService.js';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Proposed');
  const [category, setCategory] = useState('Mobility');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await listPlannerProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        setProjects([]);
      }
    })();
  }, []);

  const add = async () => {
    const created = await createProject({ title, budget: Number(budget), status, category, description });
    setProjects((p) => [created, ...p]);
    setTitle('');
    setBudget('');
    setStatus('Proposed');
    setCategory('Mobility');
    setDescription('');
  };

  const toggleStatus = async (p) => {
    const nextStatus = p.status === 'Proposed' ? 'In Progress' : 'Completed';
    const updated = await updateProject(p.id, { status: nextStatus });
    setProjects((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
  };

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={'Planner'} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <div>
              <h1 style={{ margin: 0 }}>Manage Projects</h1>
              <p className="muted" style={{ marginTop: 4 }}>Create and update project proposals.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); add(); }} className="card" style={{ display: 'grid', gap: 8 }}>
              <div className="grid-2">
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="muted">Title</span>
                  <input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="muted">Budget (₹)</span>
                  <input type="number" placeholder="e.g., 2500000" value={budget} onChange={(e) => setBudget(e.target.value)} />
                </label>
              </div>
              <div className="grid-2">
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="muted">Status</span>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Proposed</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span className="muted">Category</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Mobility</option>
                    <option>Sanitation</option>
                    <option>Safety</option>
                    <option>Parks</option>
                    <option>Health</option>
                  </select>
                </label>
              </div>
              <label style={{ display: 'grid', gap: 6 }}>
                <span className="muted">Description</span>
                <textarea rows={4} placeholder="Describe the project goals and scope" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <button className="btn btn-primary" type="submit">Create Project</button>
            </form>
            <div className="grid-2">
              {projects.map((p) => (
                <div key={p.id} className="card" style={{ display: 'grid', gap: 6 }}>
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>{p.description || 'No description provided.'}</p>
                  <p style={{ margin: 0 }}>Budget: ₹{p.budget?.toLocaleString?.() || p.budget} • Status: {p.status} • Category: {p.category || '-'}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={() => toggleStatus(p)}>Advance Status</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

