import { useState } from 'react';
import useAuth from '../../hooks/useAuth.js';
import { ROLES } from '../../utils/constants.js';

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(ROLES.Citizen);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password, selectedRole });
  };

  return (
    <div style={{ maxWidth: 360, margin: '3rem auto' }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value={ROLES.Citizen}>Citizen</option>
          <option value={ROLES.Planner}>Planner</option>
        </select>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Signing in…' : 'Login'}</button>
      </form>
    </div>
  );
}

