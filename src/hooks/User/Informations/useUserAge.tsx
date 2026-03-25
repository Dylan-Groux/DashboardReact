import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer l'âge de l'utilisateur.
 * @returns l'âge de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserAge = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userAge = userInformation.profile.age;
    return userAge;
}