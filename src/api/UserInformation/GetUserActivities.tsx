
import type { ApiClientType } from "../../context/ApiClientContext";
import { formatApiDate } from "../../utils/NormalizeDate";

 /* @type UserInformation
 * @description Représente la réponse API concernant les informations d'un utilisateur, incluant son profil et ses statistiques d'activité.
 * @property {Object} profile - Contient les informations de profil de l'utilisateur.
 * @property {string} profile.firstName - Le prénom de l'utilisateur.
 */
export type UserActivities = {
    date: string;
    distance: number;
    duration: number;
    heartRate: {
        min: number;
        max: number;
        average: number;
    };
    caloriesBurned: number;
}

/**
 * 
 * @param get 
 * @returns Une réponse API de type UserInformation
 * @description Permet de retourner les informations d'un utilisateur à partir de son token d'authentification
 */
export async function getUserActivities(
    get: ApiClientType['get'],
    startDate: Date,
    endDate: Date,
): Promise<UserActivities[]> {
    const startWeek = formatApiDate(startDate);
    const endWeek = formatApiDate(endDate);

    return get<UserActivities[]>(`/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`);
}