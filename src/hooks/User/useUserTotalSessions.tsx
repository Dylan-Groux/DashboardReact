import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer le nombre total de sessions de l'utilisateur.
 * @returns le nombre total de sessions de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserTotalSessions = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userTotalSessions = userInformation.statistics.totalSessions;
    return userTotalSessions;
}