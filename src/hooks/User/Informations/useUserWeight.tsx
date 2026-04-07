import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer le poids de l'utilisateur.
 * @returns le poids de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserWeight = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userWeight = `${userInformation.profile.weight}kg`;
    return userWeight;
}