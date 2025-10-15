import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import useAuth from '../hooks/useAuth.js';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, role, logout, setRole } = useAuth();

  const btnStyle = { padding: '6px 10px', borderRadius: 999, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' };

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, backdropFilter: 'blur(6px)', background: 'color-mix(in hsl, var(--bg) 92%, transparent)' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontWeight: 800, background: 'linear-gradient(90deg, var(--brand), var(--brand-2))', WebkitBackgroundClip: 'text', color: 'transparent' }}>UrbanConnect</div>
      </Link>
      <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button onClick={toggleTheme} aria-label="Toggle theme" style={btnStyle}>{theme === 'light' ? '🌞' : '🌙'}</button>
        <select aria-label="Switch role" value={role} onChange={(e) => { setRole(e.target.value); window.localStorage.setItem('uc_role', e.target.value); }} style={{ ...btnStyle, padding: '6px 8px' }}>
          <option>Citizen</option>
          <option>Planner</option>
          <option>Admin</option>
        </select>
        {user ? (
          <>
            <span style={{ fontSize: 14, color: '#6b7280' }}>{user.name} ({role})</span>
            <button onClick={logout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <span style={{ fontSize: 14, color: '#6b7280' }}>Guest</span>
        )}
      </nav>
    </header>
  );
}

