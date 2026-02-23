import React from 'react';
import Headersection from '../components/Header/HeaderSection';
import Footer from '../components/Footer/Footer';
import LoginPage from '../components/LoginPage/index';

const Login: React.FC = () => {
  return (
    <>
      <Headersection />
      <LoginPage />
      <Footer />
    </>
  );
};

export default Login;
