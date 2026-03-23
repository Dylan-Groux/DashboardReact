
import React, { createContext, useContext } from "react";
import { useUserProfile, type UserProfile } from "../hooks/User/_useUserProfile";
import { useUserStatistics, type UserStatistics } from "../hooks/User/_useUserStatistics";

type UserContextType = {
    userProfile: UserProfile | null;
    userStatistics: UserStatistics | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userProfile = useUserProfile();
    const userStatistics = useUserStatistics();

    return (
        <UserContext.Provider value={{ userProfile, userStatistics }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};