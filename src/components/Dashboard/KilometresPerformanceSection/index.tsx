import React, { useEffect, useState } from 'react';
import './index.css';
import DateNavigator from '../DateNavigator/DateNavigator';
import ChartPerformance from '../ChartPerformance/ChartPerformance';
import { fetchChartKilometres } from '@api/FetchChartKilometres/fecthChartKilometres';
import { mapUserActivity } from '@api/Mapping/UserActivity';
import type { UserActivity, UserActivityRawKm } from '@api/Mapping/types/UserActivityTypes';
import { useApiClient } from '../../../context/ApiClientContext';

type KilometresPerformanceSectionProps = {
  startDate: Date;
  endDate: Date;
  periodLength: number;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};

const KilometresPerformanceSection: React.FC<KilometresPerformanceSectionProps> = ({
  startDate,
  endDate,
  periodLength,
  setStartDate,
}) => {
  const { get, hasToken } = useApiClient();
  const [chartData, setChartData] = useState<UserActivity[]>([]);

  const totalKm = chartData.reduce((sum, item) => sum + (item.uv ?? 0), 0);
  const averageKm = chartData.length > 0 ? Math.ceil(totalKm / chartData.length) : 0;

  useEffect(() => {
    if (!hasToken) return;

    fetchChartKilometres(startDate, endDate, get)
      .then((rawData: UserActivityRawKm[]) => {
        const mapped = mapUserActivity('kilometres', rawData, startDate, endDate);
        setChartData(mapped);
      })
      .catch(err => console.error(err));
  }, [endDate, get, hasToken, startDate]);

  if (!hasToken) {
    return null;
  }

  return (
    <div className='dashboard-performance-card'>
      <div className='dashboard-performance-card-header'>
        <h3 className='dashboard-performance-title dashboard-performance-title-km'>{averageKm.toFixed(0)}km en moyenne</h3>
        <DateNavigator
          periodLength={periodLength}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <p>Total des kilomètres des 4 dernières semaines</p>
      </div>
      <div>
        <ChartPerformance
          data={chartData.map(item => ({
            name: item.name,
            uv: item.uv ?? 0,
          }))}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="dashboard-performance-legend dashboard-performance-legend-km">
        <span className="dashboard-performance-dot dashboard-performance-dot-km"></span>
        <span className="dashboard-performance-legend-text">Km</span>
      </div>
    </div>
  );
};

export default KilometresPerformanceSection;