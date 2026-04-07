
import './DashBoardPage.css';
import { useUser } from '../../../context/UserContext';


const DashboardPage: React.FC = () => {
  const defaultProfilePicture = '/src/assets/sophie.png'; // URL d'une image par défaut
  const { userProfile, userStatistics } = useUser();
  const { userPicture, userDate, userName} = userProfile || {};
  const { userTotalDistance } = userStatistics || {};
  
  return (
    <div className='user-card'>
      <div className='user-card-info'>
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
      <div className='user-parcours'>
        <span>Distance totale parcourue</span>
        <div className='user-card-stats'>
          <img src='/src/assets/OUTLINE.png' alt='OULINE' />
          <p>
            {userTotalDistance !== null
            ? `${userTotalDistance} km` 
            : '0 km'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage