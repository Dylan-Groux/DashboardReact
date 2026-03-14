import { getUserInformations, type UserInformation } from "@api/UserInformation/GetUserInformation";
import { useAuth } from "./AuthContext";
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
    userInformation: UserInformation | null;
    memberDate: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
    const { token } = useAuth();
    const [memberDate, setMemberDate] = useState<string | null>(null);

     React.useEffect(() => {
        if (token) {
            getUserInformations(token)
                .then(info => {
                    setUserInformation(info);
                    setMemberDate(formatMemberDate(info));
                })
                .catch(() => {
                    setUserInformation(null);
                    setMemberDate(null);
                });
        } else {
            setUserInformation(null);
            setMemberDate(null);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ userInformation, memberDate }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

export function formatMemberDate(userInformation: UserInformation): string {
    const date = new Date(userInformation.profile.createdAt);
    const formatedDate = ('Membre depuis le ' + date.getDate() + ' ' + date.toLocaleString('fr-FR', { month: 'long' }) + ' ' + date.getFullYear());
    console.log('Date de création formatée :', formatedDate);
    return formatedDate;
}