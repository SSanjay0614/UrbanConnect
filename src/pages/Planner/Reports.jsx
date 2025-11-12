import { useState } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';
import { analyzeText, summarize, trends } from '../../services/analyticsService.js';

export default function Reports() {
  const [input, setInput] = useState('Potholes near school are dangerous. The city should fix them quickly. Public park is very dirty and unkempt. Buses are often late.');
  const [output, setOutput] = useState(null);
  const [activeTab, setActiveTab] = useState('sentiment');

  const runSentiment = async () => {
    setActiveTab('sentiment');
    setOutput(await analyzeText(input));
  };
  
  const runSummary = async () => {
    setActiveTab('summary');
    setOutput(await summarize([input]));
  };
  
  const runTrends = async () => {
    setActiveTab('trends');
    setOutput(await trends());
  };

  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container">
          <TopActions role={useAuth().role} />
          <div className="card" style={{ display: 'grid', gap: 12, maxWidth: '1000px' }}>
            <div>
              <h1 style={{ margin: 0 }}>AI Reports & Analytics</h1>
              <p className="muted" style={{ marginTop: 4 }}>Analyze citizen feedback, generate insights, and identify trends.</p>
            </div>

            {/* Input Section */}
            <div style={{ padding: 12, background: '#f9fafb', borderRadius: '6px', marginTop: 8 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>
                <span style={{ fontWeight: '500', marginBottom: 6, display: 'block' }}>Input Text</span>
                <textarea
                  rows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }}
                  placeholder="Enter text to analyze..."
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button
                onClick={runSentiment}
                className={`btn ${activeTab === 'sentiment' ? 'btn-primary' : ''}`}
                style={activeTab === 'sentiment' ? {} : { opacity: 0.7 }}
              >
                📊 Sentiment Analysis
              </button>
              <button
                onClick={runSummary}
                className={`btn ${activeTab === 'summary' ? 'btn-primary' : ''}`}
                style={activeTab === 'summary' ? {} : { opacity: 0.7 }}
              >
                📝 Summarize
              </button>
              <button
                onClick={runTrends}
                className={`btn ${activeTab === 'trends' ? 'btn-primary' : ''}`}
                style={activeTab === 'trends' ? {} : { opacity: 0.7 }}
              >
                📈 Trends
              </button>
            </div>

            {/* Output Section */}
            <div style={{ marginTop: 16 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>
                {activeTab === 'sentiment' && '📊 Sentiment Analysis Results'}
                {activeTab === 'summary' && '📝 Summary Results'}
                {activeTab === 'trends' && '📈 Trends Results'}
              </h3>
              <pre
                style={{
                  background: '#0b122008',
                  padding: 12,
                  borderRadius: '6px',
                  overflow: 'auto',
                  maxHeight: '400px',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  border: '1px solid var(--border)',
                }}
              >
                {output
                  ? JSON.stringify(output, null, 2)
                  : '1) Potholes near school - Infrastructure Issue\n2) Public park cleaning - Maintenance Issue\n3) Bus on schedule - Transportation Issue'}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <a href="/planner/dashboard" className="btn">Back to Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
