import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function FeedbackChart({ data = [] }) {
  const safeData = data.length
    ? data
    : [
        { date: 'Mon', positive: 12, negative: 3 },
        { date: 'Tue', positive: 18, negative: 4 },
        { date: 'Wed', positive: 9, negative: 6 },
        { date: 'Thu', positive: 15, negative: 5 },
        { date: 'Fri', positive: 22, negative: 7 },
      ];

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={safeData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

