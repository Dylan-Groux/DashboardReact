import React from 'react'
import './index.css';
import { useUser } from '../../context/UserContext';

const Profile: React.FC = () => {
      const defaultProfilePicture = '/src/assets/sophie.png'; // URL d'une image par défaut
      const { userProfile, userStatistics } = useUser();
      const { userPicture, userDate, userName, userGender, userSize, userWeight, userAge } = userProfile || {};
      const { userTotalDistance, userTotalSessions, userTotalDuration, userTotalDayOffline, userTotalKcalBurned } = userStatistics || {};

  return (
    <div className="profile-root">
        <div className='left-section-profile'>
            <div className='profile-header-grid'>
                <img
                className='user-image'
                src={userPicture || defaultProfilePicture}
                alt={userName || 'Utilisateur'}
                />
                <div className='user-member-name'>
                <h1>{userName || 'Utilisateur'}</h1>
                <p>Membre depuis {userDate}</p>
                </div>
            </div>
            <div className='profile-stats'>
                <h1>Votre profil</h1>
                <span className='line'></span>
                <p>Age : {userAge}</p>
                <p>Genre : {userGender}</p>
                <p>Taille : {userSize}</p>
                <p>Poids : {userWeight}</p>
            </div>
        </div>
        <div className='right-section-profile'>
            <div className='grid-section'>
                <div className='grid-section-title'>
                    <h2>Vos statistiques</h2>
                    <p>depuis {userDate}</p>
                </div>
                <div className='cards'>
                    <div className='flex-cards-desc'>
                    <h3>Temps total couru</h3>
                        <p>{userTotalDuration?.[1]}<span className='cards-desc'> {userTotalDuration?.[2]}min</span></p>
                    </div>
                </div>
                <div className='cards'>
                    <div className='flex-cards-desc'>
                    <h3>Calories brûlées</h3>
                        <p>{userTotalKcalBurned?.totalKcalBurned} <span className='cards-desc'>kcal</span></p>
                    </div>
                </div>
                <div className='cards'>
                    <div className='flex-cards-desc'>
                    <h3>Distance totale parcourue</h3>
                        <p>{userTotalDistance} <span className='cards-desc'>km</span></p>
                    </div>
                </div>
                <div className='cards'>
                    <div className='flex-cards-desc'>
                    <h3>Nombre de jour de repos</h3>
                        <p>{userTotalDayOffline?.totalDayOffline} <span className='cards-desc'>jours</span></p>
                    </div>
                </div>
                <div className='cards'>
                    <div className='flex-cards-desc'>
                    <h3>Nombre de sessions</h3>
                        <p>{userTotalSessions} <span className='cards-desc'>sessions</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
