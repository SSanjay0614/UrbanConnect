import { useState } from 'react';
import { ROLES } from '../../utils/constants.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: ROLES.Citizen });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder: call backend
    alert('Registered (demo). Please login.');
  };

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto' }}>
      <h1>Register</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <select name="role" value={form.role} onChange={onChange}>
          <option value={ROLES.Citizen}>Citizen</option>
          <option value={ROLES.Planner}>Planner</option>
        </select>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

