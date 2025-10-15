import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';
import FeedbackChart from '../../components/Charts/FeedbackChart.jsx';
import BudgetPieChart from '../../components/Charts/BudgetPieChart.jsx';
import ProjectIcon from '../../assets/icons/ProjectIcon.jsx';
import ReportIcon from '../../assets/icons/ReportIcon.jsx';
import BudgetIcon from '../../assets/icons/BudgetIcon.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import Card from '../../components/Card.jsx';
import useAuth from '../../hooks/useAuth.js';
import TopActions from '../../components/TopActions.jsx';

export default function HomePage() {
  const navigate = useNavigate();
  const { role } = useAuth();
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <section className="hero-section" style={{ position: 'relative' }}>
          <div className="container" style={{ display: 'grid', gap: 12 }}>
            <h1 className="hero-title">
              {role === 'Planner' ? 'Plan with data. Engage with citizens.' : role === 'Admin' ? 'Administer city projects with transparency.' : 'Co-create a smarter, fairer city'}
            </h1>
            <p className="hero-subtitle">
              {role === 'Planner' ? 'Prioritize projects, allocate budgets, and review insights.' : role === 'Admin' ? 'Create projects, review feedback, and oversee progress.' : 'Join planning with real-time feedback, transparent budgets, and inclusive decisions.'}
            </p>
            <TopActions role={role} />
          </div>
        </section>

        <section className="stats-section">
          <div className="container grid-3">
            <StatsCard
              title="Active Projects"
              value="23"
              icon={<ProjectIcon />}
            />
            <StatsCard
              title="Citizen Reports"
              value="1,234"
              icon={<ReportIcon />}
            />
            <StatsCard
              title="Budget Allocated"
              value="₹4.2Cr"
              icon={<BudgetIcon />}
            />
          </div>
        </section>

        <section className="dashboard-section">
          <div className="container grid-2">
            <Card>
              <div className="card-header">
                <h2 className="card-title">Feedback Trends</h2>
                <select className="select-period">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              <FeedbackChart />
            </Card>
            
            <Card>
              <div className="card-header">
                <h2 className="card-title">Budget Distribution</h2>
                <Link className="btn-text" to="/planner/budget">View Details</Link>
              </div>
              <BudgetPieChart />
            </Card>
          </div>
        </section>

        

        <section className="cta-section">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0 }}>Make your voice count</h2>
              <p className="muted" style={{ marginTop: 4 }}>Share feedback on current projects or propose new ideas.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={() => navigate('/feedback')}>Give Feedback</button>
              <button className="btn" onClick={() => navigate('/vote')}>Explore Projects</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

