import { useAuth } from "./AuthContext";
import { Navigate } from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default RequireAuth;