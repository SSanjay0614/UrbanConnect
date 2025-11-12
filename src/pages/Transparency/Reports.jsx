import { useState } from 'react';
import { analyzeText, summarize, trends } from '../../services/analyticsService.js';

export default function Reports() {
  const [input, setInput] = useState('Potholes near school are dangerous. The city should fix them quickly. Public park is very dirty and unkempt. Buses are often late.');
  const [output, setOutput] = useState(null);

  const runSentiment = async () => setOutput(await analyzeText(input));
  const runSummary = async () => setOutput(await summarize([input]));
  const runTrends = async () => setOutput(await trends());

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>AI Reports</h1>
      <textarea rows={5} value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '100%' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={runSentiment}>Sentiment</button>
        <button onClick={runSummary}>Summarize</button>
        <button onClick={runTrends}>Trends</button>
      </div>
      <pre style={{ background: '#0b122008', padding: 12, marginTop: 12 }}>{output ? JSON.stringify(output, null, 2) : '1) Potholes near school 2) Public park cleaning 3) Bus on schedule'}</pre>
    </div>
  );
}

