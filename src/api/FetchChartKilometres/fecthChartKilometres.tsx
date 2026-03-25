import type { UserActivityRawKm } from "@api/Mapping/types/UserActivityTypes";

/**
 * @param startDate 
 * @param endDate 
 * @returns Liste de type UserActivityRawKm[]
 * Permet de renvoyer la liste des kilometres sur une période données. 
 */
export async function fetchChartKilometres(
    startDate: Date, 
    endDate: Date,
    token: string
): Promise<UserActivityRawKm[]> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Error('L\'URL de l\'API n\'est pas définie dans les variables d\'environnement');
    }
    const response = await fetch(`${apiUrl}/user-activity?startWeek=${startDate.toISOString()}&endWeek=${endDate.toISOString()}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    const data: UserActivityRawKm[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    return data;
}