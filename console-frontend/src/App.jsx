import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTopOnPageChange from './components/ui/ScrollToTopOnPageChange';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import LeaderboardPage from './components/LeaderboardPage';
import LeaderboardTable from './components/LeaderboardTable';
import LeaderboardAnalytics from './components/LeaderboardAnalytics';
import TechGuide from './components/TechGuide';
import ResourcesPage from './components/ResourcesPage';
import AboutDeveloper from './components/AboutDeveloper';
import WebDevelopmentRoadmap from './components/webdev/WebDevelopmentRoadmap';
import CompetitiveProgrammingRoadmap from './components/competitive/CompetitiveProgrammingRoadmap';
import MachineLearningRoadmap from './components/ml/MachineLearningRoadmap';
import Web3Roadmap from './components/web3/Web3Roadmap';
import InformationSecurityRoadmap from './components/infosec/InformationSecurityRoadmap';
import CPPProgrammingRoadmap from './components/cpp/CPPProgrammingRoadmap';
import PythonProgrammingRoadmap from './components/python/PythonProgrammingRoadmap';
import AIMLRoadmap from './components/AIMLRoadmap';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { AuthProvider } from './context/AuthProvider';
import ProfileProtected from './components/ProfileProtected';
import LeaderboardProtected from './components/LeaderboardProtected';
import ContestPage from './components/ContestPage';
import SummerProjects from './components/SummerProjects';
import MobileExperienceModal from './components/ui/MobileExperienceModal';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTopOnPageChange />
          <MobileExperienceModal />
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/leaderboard"
                element={
                  <LeaderboardProtected>
                    <LeaderboardPage />
                  </LeaderboardProtected>
                }
              />
              <Route
                path="/contest"
                element={
                  <LeaderboardProtected>
                    <ContestPage />
                  </LeaderboardProtected>
                }
              />
              <Route path="/leaderboard-table" element={<LeaderboardTable />} />
              <Route path="/leaderboard-analytics" element={<LeaderboardAnalytics />} />
              <Route path="/tech-guide" element={<TechGuide />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/buildverse" element={<SummerProjects />} />
              <Route path="/about-developers" element={<AboutDeveloper />} />

              {/* Resource Detail Routes */}
              <Route path="/resources/web-development" element={<WebDevelopmentRoadmap />} />
              <Route path="/resources/competitive-programming" element={<CompetitiveProgrammingRoadmap />} />
              <Route path="/resources/machine-learning" element={<MachineLearningRoadmap />} />
              <Route path="/resources/ai-ml" element={<AIMLRoadmap />} />
              <Route path="/resources/web3" element={<Web3Roadmap />} />
              <Route path="/resources/information-security" element={<InformationSecurityRoadmap />} />
              <Route path="/resources/cpp-programming" element={<CPPProgrammingRoadmap />} />
              <Route path="/resources/python-programming" element={<PythonProgrammingRoadmap />} />

              {/* Auth Routes - Google Only */}
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Redirect old auth routes to login */}
              <Route path="/register" element={<Navigate to="/login" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/login" replace />} />
              <Route path="/verify-otp" element={<Navigate to="/login" replace />} />

              {/* Protected User Routes */}
              <Route
                path="/profile"
                element={
                  <ProfileProtected>
                    <Profile />
                  </ProfileProtected>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminLayout />} />

              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
