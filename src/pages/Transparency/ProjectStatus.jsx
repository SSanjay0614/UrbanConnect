import { useEffect, useState } from 'react';
import { listPlannerProjects } from '../../services/plannerService.js';

export default function ProjectStatus() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto' }}>
      <h1>Project Status</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Title</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>{p.title}</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--border)' }}>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

