import React, { useEffect, useState } from 'react';
import './index.css';
import DateNavigator from '../DateNavigator';
import ChartBPM from '../ChartBPM';
import { fetchChartBPM } from '@api/FetchChartBPM/FetchChartBPM';
import { mapUserActivity } from '@api/Mapping/UserActivity';
import type { UserActivity, UserActivityRawHR } from '@api/Mapping/types/UserActivityTypes';
import { useApiClient } from '../../../context/ApiClientContext';

type BPMPerformanceSectionProps = {
  startDateBPM: Date;
  endDateBPM: Date;
  periodLengthBPM: number;
  setStartDateBPM: React.Dispatch<React.SetStateAction<Date>>;
};

const BPMPerformanceSection: React.FC<BPMPerformanceSectionProps> = ({
  startDateBPM,
  endDateBPM,
  periodLengthBPM,
  setStartDateBPM,
}) => {
  const { get, hasToken } = useApiClient();
  const [chartBPMData, setChartBPMData] = useState<UserActivity[]>([]);

  const bpmValues = chartBPMData
    .map(item => item.pointsaveragebpm)
    .filter((value): value is number => value !== null && value !== undefined && value !== 0);

  const averageBpm = bpmValues.length > 0
    ? Math.ceil(bpmValues.reduce((sum, value) => sum + value, 0) / bpmValues.length)
    : 0;

  useEffect(() => {
    if (!hasToken) return;

    fetchChartBPM(startDateBPM, endDateBPM, get)
      .then((rawData: UserActivityRawHR[]) => {
        const mapped = mapUserActivity('bpm', rawData, startDateBPM, endDateBPM);
        setChartBPMData(mapped);
      })
      .catch(err => console.error(err));
  }, [endDateBPM, get, hasToken, startDateBPM]);

  if (!hasToken) {
    return null;
  }

  return (
    <div className='dashboard-performance-card'>
      <div className='dashboard-performance-card-header'>
        <h3 className='dashboard-performance-title dashboard-performance-title-bpm'>{averageBpm} BPM</h3>
        <DateNavigator
          periodLength={periodLengthBPM}
          startDate={startDateBPM}
          setStartDate={setStartDateBPM}
          alignToMonday
        />
        <p>Fréquence cardiaque moyenne</p>
      </div>
      <div>
        <ChartBPM
          startDate={startDateBPM}
          endDate={endDateBPM}
          data={chartBPMData.map(item => ({
            ...item,
            pointsaveragebpm: item.pointsaveragebpm ?? 0,
            minbpm: item.minbpm ?? 0,
            maxbpm: item.maxbpm ?? 0,
          }))}
        />
      </div>
      <div className="dashboard-performance-legend dashboard-performance-legend-bpm">
        <span className="dashboard-performance-dot dashboard-performance-dot-bpm"></span>
        <span className="dashboard-performance-legend-text dashboard-performance-legend-spaced">Min</span>
        <span className="dashboard-performance-dot dashboard-performance-dot-bpm-light"></span>
        <span className="dashboard-performance-legend-text dashboard-performance-legend-spaced">Max</span>
        <span className="dashboard-performance-dot dashboard-performance-dot-bpm-strong"></span>
        <span className="dashboard-performance-legend-text">Max BPM</span>
      </div>
    </div>
  );
};

export default BPMPerformanceSection;