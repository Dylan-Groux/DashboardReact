import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type AppError = {
  title: string;
  message: string;
  code?: string;
};

type ErrorContextType = {
  error: AppError | null;
  showError: (nextError: AppError) => void;
  clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<AppError | null>(null);

  const showError = useCallback((nextError: AppError) => {
    setError(nextError);
    navigate('/error', { replace: true, state: nextError });
  }, [navigate]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    error,
    showError,
    clearError,
  }), [clearError, error, showError]);

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
};