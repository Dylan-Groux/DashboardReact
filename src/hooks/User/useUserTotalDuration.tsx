import type { UserInformation } from "@api/UserInformation/GetUserInformation";
import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer la durée totale des sessions de l'utilisateur.
 * @returns la durée totale des sessions de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserTotalDuration = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userTotalDuration = formattedTotalDuration(userInformation);
    return userTotalDuration;
}

/**
 * Fonction utilitaire pour formater la durée totale des sessions de l'utilisateur à partir des informations utilisateur.
 */
export const formattedTotalDuration = (userInformation: UserInformation) => {
    const totalDuration = userInformation.statistics.totalDuration;
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);

    const formattedDuration = `${hours}h ${minutes}m`;
    
    return formattedDuration;
}