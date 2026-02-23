import React from 'react'
import './LoginPage.css'
import logo from '../../assets/images/login/logo.png'

const LoginPage: React.FC = () => {
  return (
    <div className='login-page'>
      <section className='left-section'>
          <img src={logo} alt="Logo" className='logo' />
        <div className='form-section'>
          <h1>Transformez <br />vos stats en résultats</h1>
          <h2>Se connecter</h2>
          <form className='login-form'>
            <div className="form-group">
              <h3>Email</h3>
              <input type="email" required />
            </div>
            <div className="form-group">
              <h3>Mot de passe</h3>
              <input type="password" required />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <a href="/forgot-password" className='forgot-password-link'>Mot de passe oublié ?</a>
        </div>
      </section>
      <section className='right-section'>
        <span className='info-bulle'>
          <h4>Analysez vos performances en un clin d'oeil, suivez vos progrès et atteignez vos objectifs.</h4>
        </span>
      </section>
    </div>
  )
}

export default LoginPage
