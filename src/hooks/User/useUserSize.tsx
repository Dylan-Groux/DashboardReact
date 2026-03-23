import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";
import type { UserInformation } from "@api/UserInformation/GetUserInformation";

/**
 * Hook individuel pour récupérer la taille de l'utilisateur.
 * @returns la taille de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserSize = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userSize = formattedUserSize(userInformation);
    return userSize;
}

/**
 * Fonction utilitaire pour formater la taille de l'utilisateur à partir des informations utilisateur.
 */
export const formattedUserSize = (userInformation: UserInformation) : string => {
    let userNumberSize = userInformation.profile.height;
    if (!userNumberSize) {
        console.log("Taille de l'utilisateur non disponible");
        return "Taille non disponible";
    }

    const meter = Math.floor(userNumberSize / 100);
    const centimeters = userNumberSize % 100;
    const userSize = `${meter}m${centimeters}`;

    return userSize;
}