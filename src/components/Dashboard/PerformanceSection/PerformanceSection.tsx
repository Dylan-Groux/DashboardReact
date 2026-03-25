import React, { useEffect, useState } from 'react'
import './PerformanceSection.css'
import DateNavigator from '../DateNavigator/DateNavigator'
import ChartPerformance from '../ChartPerformance/ChartPerformance';
import { fetchChartKilometres } from '@api/FetchChartKilometres/fecthChartKilometres';
import ChartBPM from '../ChartBPM/ChartBPM';
import { fetchChartBPM } from '@api/FetchChartBPM/FetchChartBPM';
import { mapUserActivity } from '@api/Mapping/UserActivity';
import type { UserActivity, UserActivityRawHR, UserActivityRawKm } from '@api/Mapping/types/UserActivityTypes';

type PerformanceSectionProps = {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    startDateBPM: Date;
    setStartDateBPM: React.Dispatch<React.SetStateAction<Date>>;
    endDate: Date;
    endDateBPM: Date;
    periodLength: number;
    periodLengthBPM: number;
    token: string;
};

const PerformanceSection: React.FC<PerformanceSectionProps> = ({
    startDate,
    setStartDate,
    endDate,
    endDateBPM,
    startDateBPM,
    setStartDateBPM,
    token,
    periodLength,
    periodLengthBPM,
}) => {
    const [ChartData, setChartData] = useState<UserActivity[]>([]);
    const [ChartBPMData, setChartBPMData] = useState<UserActivity[]>([]);

    const totalKm = ChartData.reduce((sum, item) => sum + (item.uv ?? 0), 0);
    const moyenneKm = ChartData.length > 0 ? Math.ceil(totalKm / ChartData.length) : 0;

    const bpmValues = ChartBPMData
        .map(item => item.pointsaveragebpm)
        .filter((v): v is number => v !== null && v !== undefined && v !== 0);

    const averageBpm = bpmValues.length > 0
        ? Math.ceil(bpmValues.reduce((sum, v) => sum + v, 0) / bpmValues.length)
        : 0;

    if (!token) {
        return null;
    }

    useEffect(() => {
        if (!token) return;
        fetchChartKilometres(startDate, endDate, token)
            .then((rawData: UserActivityRawKm[]) => {
                const mapped = mapUserActivity('kilometres', rawData, startDate, endDate);
                setChartData(mapped);
            })
            .catch(err => console.error(err));
    }, [endDate, startDate, token]);

    useEffect(() => {
        if (!token) return;
        fetchChartBPM(startDateBPM, endDateBPM, token)
            .then((rawData: UserActivityRawHR[]) => {
                const mapped = mapUserActivity('bpm', rawData, startDateBPM, endDateBPM);
                setChartBPMData(mapped);
            })
            .catch(err => console.error(err));
    }, [endDateBPM, startDateBPM, token]);

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
                            data={ChartData.map(item => ({
                                name: item.name,
                                uv: item.uv ?? 0,
                            }))}
                            startDate={startDate}
                            endDate={endDate}
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
                            alignToMonday
                        />
                        <p>Fréquence cardiaque moyenne</p>
                    </div>
                    <div>
                        <ChartBPM 
                            startDate={startDateBPM} 
                            endDate={endDateBPM} 
                            data={ChartBPMData.map(item => ({
                                ...item,
                                pointsaveragebpm: item.pointsaveragebpm ?? 0,
                                minbpm: item.minbpm ?? 0,
                                maxbpm: item.maxbpm ?? 0,
                            }))}
                        />
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