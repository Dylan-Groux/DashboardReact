import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer le nom complet de l'utilisateur.
 * @returns le nom complet de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserName = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userName = `${userInformation.profile.firstName} ${userInformation.profile.lastName}`;
    return userName;
};
