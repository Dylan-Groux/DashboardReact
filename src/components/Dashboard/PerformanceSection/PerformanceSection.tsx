import React, { useEffect, useState } from 'react'
import './PerformanceSection.css'
import DateNavigator from '../DateNavigator/DateNavigator'
import ChartPerformance from '../ChartPerformance/ChartPerformance';
import { fetchChartKilometres } from '@api/FetchChartKilometres/fecthChartKilometres';

const PerformanceSection: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const periodLength = 28;
    const endDate = new Date(startDate.getTime() + (periodLength - 1) * 24 * 60 * 60 * 1000);
    const [ChartData, setChartData] = useState<{ name: string; uv: number }[]>([]);
    const totalKm = ChartData.reduce((sum, item) => sum + item.uv, 0);
    const moyenneKm = ChartData.length > 0 ? Math.ceil(totalKm / ChartData.length) : 0;

    useEffect(() => {
    fetchChartKilometres(
        startDate,
        endDate
        )
            .then(data => {
                setChartData(data);
            })
            .catch(err => console.error(err));
    }, [startDate, periodLength]);

  return (
    <div className='performance-section'>
        <h2>Vos dernières performances</h2>
        <div className='performance-cards'>
            <div className='performance-card'>
                <div className='header-performance-card'>
                    <h3>{moyenneKm.toFixed(0)}km en moyenne</h3>
                    <DateNavigator 
                        periodLength={periodLength} 
                        startDate={startDate}
                        setStartDate={setStartDate}
                    />
                    <p>Total des kilomètres des 4 dernières semaines</p>
                </div>
                <div>
                    <ChartPerformance
                        data={ChartData}
                        startDate={startDate}
                        endDate={new Date(startDate.getTime() + (periodLength - 1) * 24 * 60 * 60 * 1000)}
                    />
                </div>
                <div className="chart-legend">
                    <span className="legend-dot"></span>
                    <span className="legend-text">Km</span>
                </div>
            </div>
            <div className='performance-card'>
                <div className='header-performance-card'>
                    <h3>18km en moyenne</h3>
                    <DateNavigator 
                        periodLength={7} 
                        startDate={startDate}
                        setStartDate={setStartDate}
                    />
                    <p>Total des kilomètres des 4 dernières semaines</p>
                </div>
                <div>
                    {/*<ChartPerformance
                        startDate={startDate}
                        endDate={new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000)}
                    />*/}
                </div>
                <div className="chart-legend">
                    <span className="legend-dot"></span>
                    <span className="legend-text">Km</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerformanceSection
