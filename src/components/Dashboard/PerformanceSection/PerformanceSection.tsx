import React, { useEffect, useState } from 'react'
import './PerformanceSection.css'
import DateNavigator from '../DateNavigator/DateNavigator'
import ChartPerformance from '../ChartPerformance/ChartPerformance';
import { fetchChartKilometres } from '@api/FetchChartKilometres/FecthChartKilometres';
import ChartBPM from '../ChartBPM/ChartBPM';
import { fetchChartBPM } from '@api/FetchChartBPM/FetchChartBPM';
import { useAuth } from '../../../context/AuthContext';

const PerformanceSection: React.FC = () => {
    const periodLength = 28;
    const periodLengthBPM = 6;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const initialStartDateKm = new Date(today);
    initialStartDateKm.setDate(today.getDate() - periodLength);

    const initialStartDateBPM = new Date(today);
    initialStartDateBPM.setDate(today.getDate() - periodLengthBPM);

    const [startDate, setStartDate] = useState(initialStartDateKm);
    const [startDateBPM, setStartDateBPM] = useState(initialStartDateBPM);
    const endDate = new Date(startDate.getTime() + (periodLength - 1) * 24 * 60 * 60 * 1000);
    const endDateBPM = new Date(startDateBPM.getTime() + (periodLengthBPM - 1) * 24 * 60 * 60 * 1000);
    const [ChartData, setChartData] = useState<{ name: string; uv: number }[]>([]);
    const [ChartBPMData, setChartBPMData] = useState<{ name: string; pointsaveragebpm: number; minbpm: number; maxbpm: number }[]>([]);
    const totalKm = ChartData.reduce((sum, item) => sum + (item.uv ?? 0), 0);
    const moyenneKm = ChartData.length > 0 ? Math.ceil(totalKm / ChartData.length) : 0;
    const bpmValues = ChartBPMData.map(item => item.pointsaveragebpm).filter(v => v !== null && v !== undefined && v !== 0);
    const averageBpm = bpmValues.length > 0 ? Math.ceil(bpmValues.reduce((sum, v) => sum + v, 0) / bpmValues.length) : 0;
    const { token } = useAuth();
    if (!token) {
        return null;
    }

    useEffect(() => {
    fetchChartKilometres(
        startDate,
        endDate,
        token
        )
            .then(data => {
                setChartData(
                    data.map(item => ({
                        name: item.name,
                        uv: item.uv ?? 0,
                    }))
                );
            })
            .catch(err => console.error(err));
    }, [startDate, periodLength]);

    useEffect(() => {
        fetchChartBPM(
            startDateBPM,
            endDateBPM,
            token
            )
            .then(data => {
                setChartBPMData(
                    data.map(item => ({
                        name: item.name,
                        pointsaveragebpm: item.pointsaveragebpm ?? 0,
                        minbpm: item.minbpm ?? 0,
                        maxbpm: item.maxbpm ?? 0,
                    }))
                );
            })
            .catch(err => console.error(err));
    }, [startDateBPM, periodLengthBPM]);

  return (
    <div className='performance-section'>
        <h2>Vos dernières performances</h2>
        <div className='performance-cards'>
            <div className='performance-card'>
                <div className='header-performance-card'>
                    <h3 className='title-km'>{moyenneKm.toFixed(0)}km en moyenne</h3>
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
                <div className="chart-legend-km">
                    <span className="legend-dot-km dot"></span>
                    <span className="legend-text-km">Km</span>
                </div>
            </div>
            <div className='performance-card'>
                <div className='header-performance-card'>
                    <h3 className='title-bpm'>{averageBpm} BPM</h3>
                    <DateNavigator 
                        periodLength={periodLengthBPM} 
                        startDate={startDateBPM}
                        setStartDate={setStartDateBPM}
                    />
                    <p>Fréquence cardiaque moyenne</p>
                </div>
                <div>
                    <ChartBPM  startDate={startDateBPM} endDate={endDateBPM} data={ChartBPMData} />
                </div>
                <div className="chart-legend-bpm">
                    <span className="legend-dot-bpm dot"></span>
                    <span className="legend-text-bpm">Min</span>
                    <span className="legend-dot-bpm dot" style={{ backgroundColor: '#FFB6B6' }}></span>
                    <span className="legend-text-bpm">Max</span>
                    <span className="legend-dot-bpm dot" style={{ backgroundColor: '#2D5BFF' }}></span>
                    <span className="legend-text-bpm">Max BPM</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PerformanceSection
