import { useUserTotalDistance } from "./useUserTotalDistance";
import { useUserTotalSessions } from "./useUserTotalSessions";
import { useUserTotalDuration } from "./useUserTotalDuration";

export type UserStatistics = {
    userTotalDistance: number | null;
    userTotalDuration: string | null;
    userTotalSessions: number | null;
}

/**
 * Hook qui regroupe l'ensemble des statistiques utilisateur
 * @returns User Statistics
 * @desc Ce hook utilise les hooks individuels pour récupérer les différentes statistiques de l'utilisateur.
 */
export const useUserStatistics = (): UserStatistics => {
    const userTotalDistance = useUserTotalDistance();
    const userTotalDuration = useUserTotalDuration();
    const userTotalSessions = useUserTotalSessions();

    return {
        userTotalDistance,
        userTotalDuration,
        userTotalSessions
    }
}