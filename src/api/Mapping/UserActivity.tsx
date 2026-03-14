//TODO : Test unitaire de la fonction de mapping avec des données simulées pour s'assurer qu'elle fonctionne correctement avant de l'intégrer dans les composants
import type { UserActivity } from "./types/UserActivityTypes";
import type { UserActivityRawKm, UserActivityRawHR } from "./types/UserActivityTypes";
import { mapKilometres } from "./strategies/km/MapKilometres";
import { mapHeartRate } from "./strategies/bpm/MapHeartRate";

type MappingStrategy<T, R>= (data: T[], startDate: Date, endDate: Date) => R[];

const strategies = {
    kilometres: mapKilometres as MappingStrategy<UserActivityRawKm, UserActivity>,
    bpm: mapHeartRate as MappingStrategy<UserActivityRawHR, UserActivity>,
}

/**
 * Mappe les données d'activité utilisateur brutes en fonction du type spécifié (kilomètres ou BPM) et des dates de début et de fin.
 * 
 * @param type Le type de données à mapper.
 * @param data Les données brutes de l'utilisateur.
 * @param startDate La date de début pour le filtrage des données.
 * @param endDate La date de fin pour le filtrage des données.
 * @return Un tableau d'activités mappées.
 * @throws Error si aucune stratégie de mapping n'est trouvée pour le type spécifié.
 * 
 * @example
 * const result = mapUserActivity('kilometres', rawKmData, new Date('2024-01-01'), new Date('2024-01-31'));
 */
export function mapUserActivity<T extends 'kilometres' | 'bpm',>(
    type: T,
    data: 
        T extends 'kilometres' ? UserActivityRawKm[] : 
        T extends 'bpm' ? UserActivityRawHR[] : 
        // Ajout d'un cas si nécessaire ici.
        never,
    startDate: Date,
    endDate: Date
): UserActivity[] {
    const strategy = strategies[type] as MappingStrategy<
        T extends 'kilometres' ? UserActivityRawKm : 
        T extends 'bpm' ? UserActivityRawHR : 
        never,
        UserActivity
    >;
    if (!strategy) {
        throw new Error(`No mapping strategy found for type: ${type}`);
    }
    return strategy(data as any, startDate, endDate);
}