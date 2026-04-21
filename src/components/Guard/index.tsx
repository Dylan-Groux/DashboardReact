import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type AuthGuardProps = {
  children?: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default AuthGuard;