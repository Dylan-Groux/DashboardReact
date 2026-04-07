import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthGuard: React.FC = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;