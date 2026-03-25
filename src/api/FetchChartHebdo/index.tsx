import type { UserActivityRawHebdo} from "@api/Mapping/types/UserActivityTypes";
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
    token: string
): Promise<UserActivityRawHebdo[]> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Error('L\'URL de l\'API n\'est pas définie dans les variables d\'environnement');
    }
    
    const startDateBPMApiString = formatApiDate(startDateBPM);
    const endDateBPMApiString = formatApiDate(endDateBPM);

    const response = await fetch(`${apiUrl}/user-activity?startWeek=${startDateBPMApiString}&endWeek=${endDateBPMApiString}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }
    const data: UserActivityRawHebdo[] = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Données reçues dans un format inattendu');
    } else if (data.length > 0 && typeof data[0].date === 'undefined') {
        throw new Error('Données reçues ne contiennent pas de champ date');
    }

    return data;
}