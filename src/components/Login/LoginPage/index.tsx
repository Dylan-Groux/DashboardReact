import React from 'react'
import './LoginPage.css'
import logo from '../../../assets/icons/logo.png'
import LoginForm from '../LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <section className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        <div className="form-section">
          <h1>Transformez <br />vos stats en résultats</h1>
          <h2>Se connecter</h2>
          <LoginForm />
          <a href="/forgot-password" className="forgot-password-link">Mot de passe oublié ?</a>
        </div>
      </section>
      <section className="right-section">
        <h2 className="W3C-visually-hidden">Image et informations</h2>
        <span className="info-bulle">
          <span>Analysez vos performances en un clin d'oeil, suivez vos progrès et atteignez vos objectifs.</span>
        </span>
      </section>
    </div>
  );
}

export default LoginPage
