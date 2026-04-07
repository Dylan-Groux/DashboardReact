import { getUserActivities, type UserActivities } from "@api/UserInformation/GetUserActivities";
import { useEffect, useState } from "react";
import { useApiClient } from "../../../context/ApiClientContext";
import { useAuth } from "../../../context/AuthContext";

/**
 * Hook personnalisé pour récupérer les informations de l'utilisateur en fonction du token d'authentification.
 * @param token Le token d'authentification de l'utilisateur
 * @returns Un objet contenant les informations de l'utilisateur, un indicateur de chargement, une éventuelle erreur et une fonction pour rafraîchir les données
 * @description Ce hook utilise le token d'authentification pour appeler l'API et récupérer les informations de l'utilisateur. Il gère également les états de chargement et d'erreur.
 */
export const useFetchUserActivities = (startDate: Date, endDate: Date) => {
    const { get } = useApiClient();
    const { token } = useAuth();
    const [userActivities, setUserActivities] = useState<UserActivities[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserActivities = async () => {
        if (!token) {
            setUserActivities(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const info = await getUserActivities(get, startDate, endDate);
            setUserActivities(info);
            setError(null);
        } catch (err) {
            setUserActivities(null);
            setError("Erreur lors de la récupération des informations utilisateur");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserActivities();
    }, [token, startDate, endDate]);

    return { userActivities, loading, error, refresh: fetchUserActivities };
};