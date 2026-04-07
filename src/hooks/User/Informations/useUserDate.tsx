import { useUserInformationWithAuth } from "./_useUserInformationWithAuth";
import type { UserInformation } from "@api/UserInformation/GetUserInformation";

/**
 * Hook individuel pour récupérer la date d'inscription de l'utilisateur.
 * @returns la date d'inscription de l'utilisateur ou null si les informations ne sont pas disponibles
 */
export const useUserDate = () => {
    const { userInformation } = useUserInformationWithAuth();
    if (!userInformation) return null;

    const userDate = formatMemberDate(userInformation);
    return userDate;
}

/**
 * Fonction utilitaire pour formater la date d'inscription de l'utilisateur à partir des informations utilisateur.
 */
export function formatMemberDate(userInformation: UserInformation): string {
    const date = new Date(userInformation.profile.createdAt);
    if (!date) {
        console.error('Date de création de l\'utilisateur non disponible');
        return 'Date non disponible';
    }
    const formatedDate = (' le ' + date.getDate() + ' ' + date.toLocaleString('fr-FR', { month: 'long' }) + ' ' + date.getFullYear());
    //console.log('Date de création formatée :', formatedDate);
    return formatedDate;
}