
import type { ApiClientType } from "../../context/ApiClientContext";

 /* @type UserInformation
 * @description Représente la réponse API concernant les informations d'un utilisateur, incluant son profil et ses statistiques d'activité.
 * @property {Object} profile - Contient les informations de profil de l'utilisateur.
 * @property {string} profile.firstName - Le prénom de l'utilisateur.
 */
export type UserInformation = {
profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    profilePicture: string;
  },
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  }
}

/**
 * 
 * @param get 
 * @returns Une réponse API de type UserInformation
 * @description Permet de retourner les informations d'un utilisateur à partir de son token d'authentification
 */
export async function getUserInformations(get: ApiClientType['get']): Promise<UserInformation> {
    return get<UserInformation>('/user-info');
}