import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
import { formatNumber } from '../../utils/formatters.js';

const mockProjectsStatus = [
  {
    id: 'p1',
    title: 'Safe Pedestrian Crossings',
    description: 'Add zebra crossings and signals near schools and markets.',
    status: 'In Progress',
    progress: 65,
    budget: 2500000,
    spent: 1625000,
    completionDate: '2025-03-15',
    location: 'Downtown Area',
  },
  {
    id: 'p2',
    title: 'Neighborhood Green Corridors',
    description: 'Convert vacant lots into mini-parks and tree-lined paths.',
    status: 'In Progress',
    progress: 45,
    budget: 4800000,
    spent: 2160000,
    completionDate: '2025-04-30',
    location: 'East District',
  },
  {
    id: 'p3',
    title: 'Public Transit Enhancement',
    description: 'Upgrade bus stops with real-time tracking and weather protection.',
    status: 'Completed',
    progress: 100,
    budget: 3200000,
    spent: 3200000,
    completionDate: '2024-12-20',
    location: 'City Center',
  },
  {
    id: 'p4',
    title: 'Community Health Centers',
    description: 'Establish mobile clinics in underserved neighborhoods.',
    status: 'Proposed',
    progress: 10,
    budget: 1800000,
    spent: 180000,
    completionDate: '2025-06-30',
    location: 'West Side',
  },
  {
    id: 'p5',
    title: 'Smart Street Lighting',
    description: 'Install energy-efficient LED lights with motion sensors.',
    status: 'In Progress',
    progress: 80,
    budget: 5600000,
    spent: 4480000,
    completionDate: '2025-02-28',
    location: 'All Districts',
  },
  {
    id: 'p6',
    title: 'Water Supply Modernization',
    description: 'Replace old pipes and install smart meters for better management.',
    status: 'Planned',
    progress: 15,
    budget: 7200000,
    spent: 1080000,
    completionDate: '2025-09-15',
    location: 'North Zone',
  },
];

function getStatusColor(status) {
  switch (status) {
    case 'Completed':
      return '#10b981';
    case 'In Progress':
      return '#3b82f6';
    case 'Planned':
      return '#f59e0b';
    case 'Proposed':
      return '#8b5cf6';
    default:
      return '#6b7280';
  }
}

export default function ProjectTransparency() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setProjects(mockProjectsStatus);
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'Completed').length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
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
              <h1 style={{ margin: 0 }}>Project Transparency</h1>
              <p className="muted" style={{ marginTop: 4 }}>Track real-time progress of city development projects.</p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginBottom: 16,
            }}>
              <div className="card" style={{ background: '#f0f9ff', padding: 12 }}>
                <div className="muted" style={{ fontSize: '0.875rem', marginBottom: 4 }}>Total Projects</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.total}</div>
              </div>
              <div className="card" style={{ background: '#f0fdf4', padding: 12 }}>
                <div className="muted" style={{ fontSize: '0.875rem', marginBottom: 4 }}>Completed</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{stats.completed}</div>
              </div>
              <div className="card" style={{ background: '#eff6ff', padding: 12 }}>
                <div className="muted" style={{ fontSize: '0.875rem', marginBottom: 4 }}>In Progress</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{stats.inProgress}</div>
              </div>
              <div className="card" style={{ background: '#fef3c7', padding: 12 }}>
                <div className="muted" style={{ fontSize: '0.875rem', marginBottom: 4 }}>Budget Spent</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{formatNumber(Math.round(stats.totalSpent / 100000))}L</div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {['All', 'Completed', 'In Progress', 'Planned', 'Proposed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`btn ${filter === status ? 'btn-primary' : ''}`}
                  style={filter === status ? {} : { opacity: 0.6 }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div style={{ display: 'grid', gap: 12 }}>
              {filteredProjects.map(project => (
                <div key={project.id} className="card" style={{ borderLeft: `4px solid ${getStatusColor(project.status)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px 0' }}>{project.title}</h3>
                      <p className="muted" style={{ margin: '0 0 8px 0', fontSize: '0.875rem' }}>{project.description}</p>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                        <span className="tag">Location: {project.location}</span>
                        <span className="tag">Target: {new Date(project.completionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <span
                        className="tag"
                        style={{
                          background: getStatusColor(project.status),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          display: 'inline-block',
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginTop: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '0.875rem' }}>Progress</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{project.progress}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: getStatusColor(project.status),
                        transition: 'width 0.3s ease',
                      }}></div>
                    </div>
                  </div>

                  {/* Budget Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div className="muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>Budget Allocated</div>
                      <div style={{ fontWeight: 'bold' }}>₹{formatNumber(project.budget)}</div>
                    </div>
                    <div>
                      <div className="muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>Amount Spent</div>
                      <div style={{ fontWeight: 'bold' }}>₹{formatNumber(project.spent)}</div>
                    </div>
                    <div>
                      <div className="muted" style={{ fontSize: '0.75rem', marginBottom: 4 }}>Remaining</div>
                      <div style={{ fontWeight: 'bold', color: '#6b7280' }}>₹{formatNumber(project.budget - project.spent)}</div>
                    </div>
                  </div>
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
