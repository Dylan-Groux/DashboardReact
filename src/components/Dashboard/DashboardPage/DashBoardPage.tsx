

import React, { useEffect, useState } from 'react';
import { getUserPicture } from '../../../api/UserInformation/GetUserInformation';
import './DashBoardPage.css';


const DashboardPage: React.FC = () => {
  const defaultProfilePicture = '/src/assets/sophie.png'; // URL d'une image par défaut
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  useEffect(() => {
    getUserPicture()
      .then(url => {
        setProfilePicture(url);
        console.log('URL de l\'image de l\'utilisateur :', url);
      })
      .catch(() => setProfilePicture(null));
  }, []);

  return (
    <div className='user-card'>
      <div className='user-card-info'>
        <img
          className='user-image'
          src={profilePicture || defaultProfilePicture}
          alt="Sophie"
        />
        <div className='user-member-name'>
          <h1>Sophie Martin</h1>
          <p>Membre depuis le 14 juin 2023</p>
        </div>
      </div>
      <div className='user-parcours'>
        <span>Distance totale parcourue</span>
        <div className='user-card-stats'>
          <p>120 km</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage
