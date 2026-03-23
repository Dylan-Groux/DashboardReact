import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    email : string | null;
    password: string | null;
    token: string | null;
    userId: string | null;
    setAuthSession: (session: { email: string; password: string; token: string; userId: string }) => void;
    logout : () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const setAuthSession = ({ email, password, token, userId }: { email: string; password: string; token: string; userId: string }) => {
        setEmail(email);
        setPassword(password);
        setToken(token);
        setUserId(userId);
        setIsLoading(false);
    };

    const logout = () => {
        setEmail(null);
        setPassword(null);
        setToken(null);
        setUserId(null);
    };
    return (
        <AuthContext.Provider value={{ email, password, token, userId, setAuthSession, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
