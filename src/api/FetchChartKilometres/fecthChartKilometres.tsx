import type { UserActivityRawKm } from "@api/Mapping/types/UserActivityTypes";
import type { ApiClientType } from "../../context/ApiClientContext";

/**
 * @param startDate 
 * @param endDate 
 * @returns Liste de type UserActivityRawKm[]
 * Permet de renvoyer la liste des kilometres sur une période données. 
 */
export async function fetchChartKilometres(
    startDate: Date, 
    endDate: Date,
    get: ApiClientType['get']
): Promise<UserActivityRawKm[]> {
    const data = await get<UserActivityRawKm[]>(`/user-activity?startWeek=${startDate.toISOString()}&endWeek=${endDate.toISOString()}`);
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    return data;
}