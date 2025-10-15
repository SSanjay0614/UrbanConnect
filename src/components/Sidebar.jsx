import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function Sidebar() {
  const { role } = useAuth();
  const citizenLinks = [
    { to: '/', label: 'Home' },
    { to: '/community', label: 'Community' },
    { to: '/feedback', label: 'Submit Feedback' },
    { to: '/map', label: 'Map Report' },
    { to: '/vote', label: 'Vote Projects' },
    { to: '/transparency/status', label: 'Project Status' },
    { to: '/transparency/reports', label: 'Reports' },
  ];

  const plannerLinks = role === 'Planner' ? [
    { to: '/planner/dashboard', label: 'Planner Dashboard' },
    { to: '/planner/projects', label: 'Manage Projects' },
    { to: '/planner/budget', label: 'Budget Allocator' },
  ] : [];

  const adminLinks = role === 'Admin' ? [
    { to: '/admin/create-project', label: 'Create Project' },
    { to: '/admin/review-feedback', label: 'Review Feedback' },
  ] : [];

  return (
    <aside style={{ width: 240, borderRight: '1px solid #e5e7eb', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 4 }}>
        <li style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Citizen</li>
        {citizenLinks.map((l) => (
          <li key={l.label}>
            <NavLink to={l.to} style={({ isActive }) => ({
              display: 'block', padding: '6px 8px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--fg)' : '#374151', background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent'
            })}>{l.label}</NavLink>
          </li>
        ))}
        {plannerLinks.length ? (<li style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Planner</li>) : null}
        {plannerLinks.map((l) => (
          <li key={l.label}>
            <NavLink to={l.to} style={({ isActive }) => ({
              display: 'block', padding: '6px 8px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--fg)' : '#374151', background: isActive ? 'rgba(16,185,129,0.14)' : 'transparent'
            })}>{l.label}</NavLink>
          </li>
        ))}
        {adminLinks.length ? (<li style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Admin</li>) : null}
        {adminLinks.map((l) => (
          <li key={l.label}>
            <NavLink to={l.to} style={({ isActive }) => ({
              display: 'block', padding: '6px 8px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--fg)' : '#374151', background: isActive ? 'rgba(234,88,12,0.14)' : 'transparent'
            })}>{l.label}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

