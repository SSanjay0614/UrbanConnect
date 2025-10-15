import FeedbackChart from '../../components/Charts/FeedbackChart.jsx';
import BudgetPieChart from '../../components/Charts/BudgetPieChart.jsx';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import TopActions from '../../components/TopActions.jsx';

export default function Dashboard() {
  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <div className="container" style={{ flexGrow: 1 }}>
          <TopActions role={'Planner'} />
          
          {/* Main Card Wrapper */}
          <div className="card" style={{ display: 'grid', gap: 12, maxWidth: '1200px', margin: '0 auto' }}> 
            <h1 style={{ margin: 0 }}>Planner Dashboard</h1>
            
            {/* Chart Grid Wrapper */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 16
            }}>
            
              {/* Chart Card 1: Added padding and increased minHeight slightly */}
              <div 
                className="card" 
                style={{ 
                  minHeight: '350px', // Use 400px or more for comfortable viewing
                  padding: '50px',    // KEY FIX: Add padding inside the card to push the chart away from the top edge
                  overflow: 'hidden'  // Still good to keep this to prevent outer layout shifting
                }}
              >
                <FeedbackChart />
              </div>
              
              {/* Chart Card 2: Added padding and increased minHeight slightly */}
              <div 
                className="card" 
                style={{ 
                  minHeight: '350px', 
                  padding: '50px',    // KEY FIX: Add padding inside the card
                  overflow: 'hidden'
                }}
              >
                <BudgetPieChart />
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}