import { mapUserActivity } from "@api/Mapping/UserActivity";
import type { UserActivityRawHR } from "@api/Mapping/types/UserActivityTypes";

/**
 * @type {ListeOfUserActivityBPM}
 * Type pour la liste des activités de l'utilisateur en BPM, utilisée pour les graphiques de performance.
 * Chaque objet de la liste contient un nom (ex: "S1" pour semaine 1) et des valeurs représentant les BPM pour cette période.
 */
export type ListeOfUserActivityBPM = { 
    name: string;
    pointsaveragebpm?: number | null; 
    minbpm?: number | null; 
    maxbpm?: number | null;
}[];

/**
 * @param startDateBPM
 * @param endDateBPM 
 * @returns Liste de type ListeOfUserActivityBPM
 * Permet de renvoyer la liste des BPM sur une période données. 
 */
export async function fetchChartBPM(
    startDateBPM: Date, 
    endDateBPM: Date,
    token: string
): Promise<ListeOfUserActivityBPM> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Error('L\'URL de l\'API n\'est pas définie dans les variables d\'environnement');
    }
    const response = await fetch(`${apiUrl}/user-activity?startWeek=${startDateBPM.toISOString()}&endWeek=${endDateBPM.toISOString()}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    const data: UserActivityRawHR[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    const result = mapUserActivity('bpm', data, startDateBPM, endDateBPM);
    if (result.length === 0) {
        console.warn('Aucune donnée de BPM trouvée pour la période spécifiée');
    }


    return result;
}