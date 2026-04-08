import React, { useMemo, useState } from 'react'
import './index.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DashboardPage from '../components/Dashboard/DashboardPage';
import KilometresPerformanceSection from '../components/Dashboard/KilometresPerformanceSection';
import BPMPerformanceSection from '../components/Dashboard/BPMPerformanceSection';
import HebdoPerformanceSection from '../components/Dashboard/HebdoPerformanceSection';
import { getMonday } from '../utils/NormalizeDate';

const Dashboard: React.FC = () => {
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
      <section className="dashboard-performance-section">
        <h2>Vos dernières performances</h2>
        <div className="dashboard-performance-grid">
          <KilometresPerformanceSection
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            periodLength={periodLength}
          />
          <BPMPerformanceSection
            startDateBPM={startDateBPM}
            setStartDateBPM={setStartDateBPM}
            endDateBPM={endDateBPM}
            periodLengthBPM={periodLengthBPM}
          />
        </div>
      </section>
      <HebdoPerformanceSection 
        startDateBPM={startDateBPM} 
        endDateBPM={endDateBPM} 
      />
      <Footer />
    </div>
  )
}

export default Dashboard
