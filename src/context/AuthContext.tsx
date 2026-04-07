import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    email : string | null;
    token: string | null;
    userId: string | null;
    setAuthSession: (session: { email: string; token: string; userId: string }) => void;
    logout : () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const setAuthSession = ({ email, token, userId }: { email: string; token: string; userId: string }) => {
        setEmail(email);
        setToken(token);
        setUserId(userId);
        setIsLoading(false);
    };

    const logout = () => {
        setEmail(null);
        setToken(null);
        setUserId(null);
    };
    return (
        <AuthContext.Provider value={{ email, token, userId, setAuthSession, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
