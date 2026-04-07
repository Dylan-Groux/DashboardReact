import { useUserTotalDistance } from "./useUserTotalDistance";
import { useUserTotalSessions } from "./useUserTotalSessions";
import { useUserTotalDuration } from "./useUserTotalDuration";
import { useTotalDayOffline, type UserTotalDayOfflineState } from "../Activities/useTotalDayOffline";
import { useTotalKcalBurned, type UserTotalKcalBurnedState } from "../Activities/useTotalKcalBurned";

export type UserStatistics = {
    userTotalDistance: number | null;
    userTotalDuration: Array<string | number> | null;
    userTotalSessions: number | null;
    userTotalDayOffline: UserTotalDayOfflineState | null;
    userTotalKcalBurned: UserTotalKcalBurnedState | null;
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
    const userTotalDayOffline = useTotalDayOffline();
    const userTotalKcalBurned = useTotalKcalBurned();

    return {
        userTotalDistance,
        userTotalDuration,
        userTotalSessions,
        userTotalDayOffline,
        userTotalKcalBurned
    }
}