import React from 'react'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import DashboardPage from '../components/Dashboard/DashboardPage/DashBoardPage';
import PerformanceSection from '../components/Dashboard/PerformanceSection/PerformanceSection';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <DashboardPage />
      <PerformanceSection />
      <Footer />
    </div>
  )
}

export default Dashboard
