import React from 'react';
import logo from '../../assets/icons/logo.png'
import './Header.css'
import { useNavigate, useParams } from 'react-router-dom';

const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <header>
      <nav className='navbar'>
        <img src={logo} alt="Logo" />
        <ul>
          <li><a onClick={() => navigate(`/dashboard/${id}`)}>Dashboard</a></li>
          <li><a onClick={() => navigate(`/profil/${id}`)}>Mon Profil</a></li>
          <li> | </li>
          <li><a onClick={() => navigate('/logout')} className='logout'>Se déconnecter</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
