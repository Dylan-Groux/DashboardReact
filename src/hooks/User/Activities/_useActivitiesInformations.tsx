import { getUserActivities, type UserActivities } from "@api/UserInformation/GetUserActivities";
import { useContext, useEffect, useState } from "react";    
import { ApiUrlContext } from "../../../context/ApiUrlContext";

/**
 * Hook personnalisé pour récupérer les informations de l'utilisateur en fonction du token d'authentification.
 * @param token Le token d'authentification de l'utilisateur
 * @returns Un objet contenant les informations de l'utilisateur, un indicateur de chargement, une éventuelle erreur et une fonction pour rafraîchir les données
 * @description Ce hook utilise le token d'authentification pour appeler l'API et récupérer les informations de l'utilisateur. Il gère également les états de chargement et d'erreur.
 */
export const useFetchUserActivities = (token: string | null, startDate: Date, endDate: Date) => {
    const apiUrl = useContext(ApiUrlContext);
    const [userInformation, setUserInformation] = useState<UserActivities[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserActivities = async () => {
        if (!token) {
            setUserInformation(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            if (!apiUrl) throw new Error("apiUrl non défini dans ApiUrlContext");
            const info = await getUserActivities(token, startDate, endDate);
            setUserInformation(info);
            setError(null);
        } catch (err) {
            setUserInformation(null);
            setError("Erreur lors de la récupération des informations utilisateur");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserActivities();
    }, [token, apiUrl, startDate, endDate]);

    return { userInformation, loading, error, refresh: fetchUserActivities };
};