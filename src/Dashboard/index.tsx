import React, { useMemo, useState } from 'react'
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import DashboardPage from '../components/Dashboard/DashboardPage/DashBoardPage';
import PerformanceSection from '../components/Dashboard/PerformanceSection/PerformanceSection';
import HebdoPerformanceSection from '../components/Dashboard/HebdoPerformanceSection';
import { useAuth } from '../context/AuthContext';
import { getMonday } from '../utils/NormalizeDate';

const Dashboard: React.FC = () => {
  const token = useAuth().token;
  if (!token) {
    return null;
  }
  const [startDate, setStartDate] = useState(new Date());
  const [startDateBPM, setStartDateBPM] = useState(getMonday(new Date()));
  const periodLength = 28;
  const periodLengthBPM = 7;
  const endDate = useMemo(
      () => new Date(startDate.getTime() + (periodLength - 1) * 24 * 60 * 60 * 1000),
      [periodLength, startDate]
  );
  const endDateBPM = useMemo(
      () => new Date(startDateBPM.getTime() + (periodLengthBPM - 1) * 24 * 60 * 60 * 1000),
      [periodLengthBPM, startDateBPM]
  );


  return (
    <div className="dashboard-wrapper">
      <Header />
      <DashboardPage />
      <PerformanceSection
        startDate={startDate}
        setStartDate={setStartDate}
        startDateBPM={startDateBPM}
        setStartDateBPM={setStartDateBPM}
        endDate={endDate}
        endDateBPM={endDateBPM}
        periodLength={periodLength}
        periodLengthBPM={periodLengthBPM}
        token={token}
      />
      <HebdoPerformanceSection 
        startDateBPM={startDateBPM} 
        endDateBPM={endDateBPM} 
        token={token} 
      />
      <Footer />
    </div>
  )
}

export default Dashboard
