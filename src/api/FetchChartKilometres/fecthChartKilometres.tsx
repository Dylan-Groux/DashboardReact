import { mapUserActivity, type UserActivityRaw } from "@api/Mapping/UserActivity";

/**
 * @type {ListeOfUserActivityKilometres}
 * Type pour la liste des activités de l'utilisateur en kilomètres, utilisée pour les graphiques de performance.
 * Chaque objet de la liste contient un nom (ex: "S1" pour semaine 1) et une valeur uv représentant les kilomètres totaux pour cette période.
 */
export type ListeOfUserActivityKilometres = { 
    name: string, 
    uv: number 
}[];

/**
 * @param startDate 
 * @param endDate 
 * @returns Liste de type ListeOfUserActivityKilometres
 * Permet de renvoyer la liste des kilometres sur une période données. 
 */
export async function fetchChartKilometres(
    startDate: Date, 
    endDate: Date
): Promise<ListeOfUserActivityKilometres> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Error('L\'URL de l\'API n\'est pas définie dans les variables d\'environnement');
    }
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/user-activity?startWeek=${startDate.toISOString()}&endWeek=${endDate.toISOString()}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    const data: UserActivityRaw[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    const result = mapUserActivity('kilometres', data, startDate, endDate);
    if (result.length === 0) {
        console.warn('Aucune donnée de kilomètres trouvée pour la période spécifiée');
    }

    return result;
}