import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer la distance totale parcourue par l'utilisateur.
 * @returns la distance totale parcourue par l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserTotalDistance = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const totalDistance = Math.floor(Number(userInformation.statistics.totalDistance));
    return totalDistance;
}