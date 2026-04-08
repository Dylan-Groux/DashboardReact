import { fetchChartHebdo } from '@api/FetchChartHebdo';
import ChartHebdo from '../ChartHebdo'
import './index.css'
import { useEffect, useState } from 'react';
import { mapUserActivity } from '@api/Mapping/UserActivity';
import type { UserActivity, UserActivityRawHebdo } from '@api/Mapping/types/UserActivityTypes';
import { useActivitiesDuration } from '../../../hooks/User/Activities/useActivitiesDuration';
import { useActivitiesKm } from '../../../hooks/User/Activities/useActivitiesKm';
import { useApiClient } from '../../../context/ApiClientContext';
import { useError } from '../../../context/ErrorContext';

type HebdoPerformanceSectionProps = {
    startDateBPM: Date;
    endDateBPM: Date;
};

const HebdoPerformanceSection: React.FC<HebdoPerformanceSectionProps> = ({ startDateBPM, endDateBPM }) => {
  const { get, hasToken } = useApiClient();
  const { showError } = useError();
    const [ChartData, setChartData] = useState<UserActivity[]>([]);
    const objectifHebdo = 6;
    const totalHebdoActivties = ChartData.reduce((sum, item) => sum + (item.pointdayactivity ?? 0), 0);
    const totalHebdoActivitiesNeeded = Math.max(0, objectifHebdo - totalHebdoActivties);
    const userActivitiesThisWeek = useActivitiesDuration(startDateBPM, endDateBPM);
    const userDistanceThisWeek = useActivitiesKm(startDateBPM, endDateBPM);

    useEffect(() => {
      if (!hasToken) return;
      fetchChartHebdo(startDateBPM, endDateBPM, get)
            .then((rawData: UserActivityRawHebdo[]) => {
                const mapped = mapUserActivity('hebdo', rawData, startDateBPM, endDateBPM);
                setChartData(mapped);
            })
            .catch(() => {
              showError({
                title: 'Erreur de chargement',
                message: 'Impossible de charger les statistiques hebdomadaires.',
                code: 'HEBDO_FETCH',
              });
            });
        }, [endDateBPM, get, hasToken, showError, startDateBPM]);

    if (!hasToken) {
        return null;
    }

  return (
    <div className='hebdo-section'>
      <div className='header-hebdo-section'>
        <h2>Cette semaine</h2>
        <p>Du 23/06/2025 au 29/06/2025</p>
      </div>
      <div className='body-hebdo-section'>
        <div className='hebdo-chart'>
            <span className='hebdo-title'>{totalHebdoActivties}x <p>sur objectif de {objectifHebdo}</p></span>
            <p className='hebdo-desc'>courses hebdomadaires réalisées</p>
            <div className='chart'>
              <div className='total-activities-done'>
                <div className='total-activities-flex'>
                  <span className="legend-dot-done dot"></span>
                  <span>{totalHebdoActivties} réalisées</span>
                </div>
              </div>
              <ChartHebdo
                objectif={objectifHebdo}
                totalHebdoActivities={totalHebdoActivties}
              />
              <div className='total-activities-needed'>
                <div className='total-activities-flex'>
                  <span className="legend-dot-needed dot"></span>
                  <span>{totalHebdoActivitiesNeeded} restantes</span>
                </div>
              </div>
            </div>
        </div>
        <div className='user-activity'>
            <h3 className='user-activity-title'>Durée d'activité</h3>
            <span>{userActivitiesThisWeek.totalDuration?.toFixed(0)}<p>minutes</p></span>
        </div>
        <div className='user-distance'>
            <h3 className='user-distance-title'>Distance</h3>
            <span>{userDistanceThisWeek.totalDistance?.toFixed(1)}<p>kilomètres</p></span>
        </div>
      </div>
    </div>
  )
}

export default HebdoPerformanceSection
