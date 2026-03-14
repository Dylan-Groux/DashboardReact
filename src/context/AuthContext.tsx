import { getUser } from "@api/UserInformation/GetUserInformation";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    email : string | null;
    password: string | null;
    token: string | null;
    userId: string | null;
    login : (username: string, password: string) => Promise<void>;
    logout : () => void;
    isLoading: boolean;
}

type AuthUserCredential = {
    token: string;
    userId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username: string, password: string) => {
        setEmail(username);
        setPassword(password);
        setIsLoading(true);
        try {
            const { token, userId } = await fetchAuthToken(username, password);
            setToken(token);
            setUserId(userId);
        } catch (err) {
            setToken(null);
            setUserId(null);
        } finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        setEmail(null);
        setPassword(null);
        setToken(null);
        setUserId(null);
    };
    return (
        <AuthContext.Provider value={{ email, password, token, userId, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export async function fetchAuthToken(email: string, password: string): Promise<AuthUserCredential> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        console.error("[fetchAuthToken] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }

    try {
        const responses = await getUser(email, password);
        const token = responses.token;
        const userId = responses.userId;
        return { token, userId };
    }
    catch (err) {
        console.error('[fetchAuthToken] Erreur réseau lors du fetch:', err);
        throw err;
    }
}