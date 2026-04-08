import { useEffect } from 'react';
import { useError } from '../../context/ErrorContext';

const NotFoundRedirect = () => {
  const { showError } = useError();

  useEffect(() => {
    showError({
      title: 'Page introuvable',
      message: 'L URL saisie est invalide ou cette page n existe pas.',
      code: '404',
    });
  }, [showError]);

  return null;
};

export default NotFoundRedirect;