import { useAuth } from "../../../context/AuthContext";
import { useFetchUserActivities } from "./_useActivitiesInformations";

/**
 * Hook intermédiaire qui permet de retourner un objet User connecté en utilisant le token d'authentification stocké dans le contexte AuthContext.
 * @returns Un objet User Connecté 
 * @desc contenant les activités de l'utilisateur, un indicateur de chargement, une éventuelle erreur et une fonction pour rafraîchir les données
 */
export const useUserActivitiesWithAuth = (startDate: Date, endDate: Date) => {
    const { token } = useAuth();
    const { userActivities, loading, error, refresh } = useFetchUserActivities(token, startDate, endDate);
    return { userActivities, loading, error, refresh };
}