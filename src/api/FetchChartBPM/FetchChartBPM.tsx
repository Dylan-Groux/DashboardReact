import type { UserActivityRawHR } from "@api/Mapping/types/UserActivityTypes";
import type { ApiClientType } from "../../context/ApiClientContext";
import { formatApiDate } from "../../utils/NormalizeDate";

/**
 * @param startDateBPM
 * @param endDateBPM 
 * @returns Liste de type UserActivityRawHR[]
 * Permet de renvoyer la liste des BPM sur une période données. 
 */
export async function fetchChartBPM(
    startDateBPM: Date, 
    endDateBPM: Date,
    get: ApiClientType['get']
): Promise<UserActivityRawHR[]> {
    const startDateBPMApiString = formatApiDate(startDateBPM);
    const endDateBPMApiString = formatApiDate(endDateBPM);

    console.log('[DEBUG-FETCH-BPM] Fetching BPM data with:', {
        startDateBPM: startDateBPMApiString,
        endDateBPM: endDateBPMApiString,
    });
    const data = await get<UserActivityRawHR[]>(`/user-activity?startWeek=${startDateBPMApiString}&endWeek=${endDateBPMApiString}`);

    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    console.log('[DEBUG-FETCH-BPM]', {
        startDateBPM: startDateBPMApiString,
        endDateBPM: endDateBPMApiString,
        receivedData: data,
    });
    return data;
}