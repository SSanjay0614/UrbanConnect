import { Pie, PieChart, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function BudgetPieChart({ data = [] }) {
  const safeData = data.length
    ? data
    : [
        { name: 'Mobility', value: 35 },
        { name: 'Parks', value: 20 },
        { name: 'Sanitation', value: 15 },
        { name: 'Safety', value: 18 },
        { name: 'Health', value: 12 },
      ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={safeData} dataKey="value" nameKey="name" label outerRadius={80}>
            {safeData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

