import React from 'react'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import DashboardPage from '../components/Dashboard/DashboardPage/DashBoardPage';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <DashboardPage />
      <Footer />
    </div>
  )
}

export default Dashboard
