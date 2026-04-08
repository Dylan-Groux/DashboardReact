import React from 'react'
import './Footer.css'
import minilogo from '../../assets/icons/mini-logo.png'
import '../../App.css'

const Footer: React.FC = () => {
  return (
    <footer>
      <nav className='footer'>
        <div className="footer-row">
          <span>©Sportsee Tout droits réservés</span>
          <div className="right">
            <a href="/terms">Conditions générales</a>
            <a href="/contact">Contact</a>
            <img src={minilogo} alt="Logo" />
          </div>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
