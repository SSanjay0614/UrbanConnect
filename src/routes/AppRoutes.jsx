import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage.jsx';
import FeedbackForm from '../pages/Citizen/FeedbackForm.jsx';
import MapReport from '../pages/Citizen/MapReport.jsx';
import VoteProjects from '../pages/Citizen/VoteProjects.jsx';
import Dashboard from '../pages/Planner/Dashboard.jsx';
import ManageProjects from '../pages/Planner/ManageProjects.jsx';
import BudgetAllocator from '../pages/Planner/BudgetAllocator.jsx';
import ProjectStatus from '../pages/Transparency/ProjectStatus.jsx';
import Reports from '../pages/Transparency/Reports.jsx';
import CommunityHub from '../pages/Community/CommunityHub.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/map" element={<MapReport />} />
        <Route path="/vote" element={<VoteProjects />} />
        <Route path="/community" element={<CommunityHub />} />
        {/* Planner routes */}
        <Route path="/planner" element={<Dashboard />} />
        <Route path="/planner/dashboard" element={<Dashboard />} />
        <Route path="/planner/projects" element={<ManageProjects />} />
        <Route path="/planner/budget" element={<BudgetAllocator />} />
        {/* Transparency */}
        <Route path="/transparency/status" element={<ProjectStatus />} />
        <Route path="/transparency/reports" element={<Reports />} />
        {/* Admin placeholder routes */}
        <Route path="/admin/create-project" element={<ManageProjects />} />
        <Route path="/admin/review-feedback" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

