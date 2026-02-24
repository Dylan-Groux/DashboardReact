import React from 'react';
import logo from '../../assets/icons/logo.png'
import './Header.css'
import { useParams } from 'react-router-dom';

const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <header>
      <nav className='navbar'>
        <img src={logo} alt="Logo" />
        <ul>
          <li><a href={`/dashboard/${id}`}>Dashboard</a></li>
          <li><a href={`/profil/${id}`}>Mon Profil</a></li>
          <li> | </li>
          <li><a href="/logout" className='logout'>Se déconnecter</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
