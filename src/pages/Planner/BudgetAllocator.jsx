import { useState } from 'react';
import BudgetPieChart from '../../components/Charts/BudgetPieChart.jsx';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import TopActions from '../../components/TopActions.jsx';

export default function BudgetAllocator() {
  const [alloc, setAlloc] = useState({ Mobility: 30, Parks: 20, Sanitation: 20, Safety: 15, Health: 15 });

  const total = Object.values(alloc).reduce((s, v) => s + Number(v || 0), 0);
  const data = Object.entries(alloc).map(([name, value]) => ({ name, value: Number(value) }));

  const onChange = (k, v) => setAlloc((a) => ({ ...a, [k]: Number(v) }));

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={'Planner'} />
          <div className="card" style={{ display: 'grid', gap: 12 }}>
            <h1 style={{ margin: 0 }}>Participatory Budget Allocator</h1>
            <p>Total: {total}% (aim for 100%)</p>
            <div className="grid-2">
              <div className="card" style={{ display: 'grid', gap: 8 }}>
                {Object.keys(alloc).map((k) => (
                  <label key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span>{k}</span>
                    <input type="number" value={alloc[k]} onChange={(e) => onChange(k, e.target.value)} />
                  </label>
                ))}
              </div>
              <div className="card"><BudgetPieChart data={data} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

