import { useNavigate } from 'react-router-dom';

export default function TopActions({ role = 'Citizen' }) {
  const navigate = useNavigate();
  const isCitizen = role === 'Citizen';
  const isPlanner = role === 'Planner';
  const isAdmin = role === 'Admin';

  return (
    <div className="hero-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {isCitizen ? (
        <>
          <button className="btn btn-primary" onClick={() => navigate('/feedback')}>Submit Feedback</button>
          <button className="btn" onClick={() => navigate('/vote')}>Explore Projects</button>
          <button className="btn" onClick={() => navigate('/transparency')}>Project Transparency</button>
          <button className="btn" onClick={() => navigate('/map')}>Report on Map</button>
          <button className="btn" onClick={() => navigate('/community')}>Community Space</button>
        </>
      ) : null}
      {isPlanner ? (
        <>
          <button className="btn btn-primary" onClick={() => navigate('/planner/projects')}>Manage Projects</button>
          <button className="btn" onClick={() => navigate('/planner/budget')}>Allocate Budget</button>
          <button className="btn" onClick={() => navigate('/planner/reports')}>AI Reports</button>
        </>
      ) : null}
      {isAdmin ? (
        <>
          <button className="btn btn-primary" onClick={() => navigate('/admin/create-project')}>Create Project</button>
          <button className="btn" onClick={() => navigate('/admin/review-feedback')}>Review Feedback</button>
          <button className="btn" onClick={() => navigate('/planner/dashboard')}>Planner Dashboard</button>
        </>
      ) : null}
    </div>
  );
}


