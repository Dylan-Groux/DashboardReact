import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";

/**
 * Hook individuel pour récupérer le genre de l'utilisateur.
 * @returns le genre de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserGender = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;
    const firstName = userInformation.profile.firstName;
    if (firstName === "Emma" || firstName === "Sophie") return 'Femme';
    if (firstName === "Marc" ) return 'Homme';
    return "Inconnu";
}