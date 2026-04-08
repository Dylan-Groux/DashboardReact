import { Link, useLocation } from 'react-router-dom';
import './index.css';
import { useError } from '../../context/ErrorContext';
import { useAuth } from '../../context/AuthContext';

const ErrorPage = () => {
  const location = useLocation();
  const { error, clearError } = useError();
  const { userId } = useAuth();

  const routeState = location.state as { title?: string; message?: string; code?: string } | null;
  const title = error?.title ?? routeState?.title ?? 'Page introuvable';
  const message = error?.message ?? routeState?.message ?? 'La page demandee est introuvable ou une erreur est survenue dans l application.';
  const code = error?.code ?? routeState?.code ?? '404';
  const fallbackPath = userId ? `/dashboard/${userId}` : '/';

  return (
    <main className='error-page'>
      <div className='error-page-glow error-page-glow-left'></div>
      <div className='error-page-glow error-page-glow-right'></div>
      <section className='error-page-card'>
        <span className='error-page-code'>{code}</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className='error-page-actions'>
          <Link to='/' className='error-page-button error-page-button-primary' onClick={clearError}>
            Retour a l accueil
          </Link>
          <Link to={fallbackPath} className='error-page-button error-page-button-secondary' onClick={clearError}>
            Retour a l application
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;