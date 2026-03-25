import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer la photo de profil de l'utilisateur.
 * @returns la photo de profil de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserPicture = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userPicture = userInformation.profile.profilePicture;
    return userPicture;
};