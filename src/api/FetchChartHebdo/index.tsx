import type { UserActivityRawHebdo} from "@api/Mapping/types/UserActivityTypes";
import type { ApiClientType } from "../../context/ApiClientContext";
import { formatApiDate } from "../../utils/NormalizeDate";

/**
 * @param startDateBPM
 * @param endDateBPM 
 * @returns Liste de type ListeOfUserActivityHebdo
 * Permet de renvoyer la liste des BPM sur une période données. 
 */
export async function fetchChartHebdo(
    startDateBPM: Date, 
    endDateBPM: Date,
    get: ApiClientType['get']
): Promise<UserActivityRawHebdo[]> {
    const startDateBPMApiString = formatApiDate(startDateBPM);
    const endDateBPMApiString = formatApiDate(endDateBPM);

    const data = await get<UserActivityRawHebdo[]>(`/user-activity?startWeek=${startDateBPMApiString}&endWeek=${endDateBPMApiString}`);
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    return data;
}