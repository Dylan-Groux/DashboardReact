import React from 'react'
import sophieimg from '../../../assets/sophie.png'
import './DashBoardPage.css'

const DashboardPage: React.FC = () => {
  return (
    <div className='user-card'>
      <div className='user-card-info'>
        <img className='user-image' src={sophieimg} alt="Sophie" />
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
  )
}

export default DashboardPage
