// Types TypeScript pour garantir la cohérence des données à travers l'application
// Gestion des erreurs et des cas où
//TODO : Test unitaire de la fonction de mapping avec des données simulées pour s'assurer qu'elle fonctionne correctement avant de l'intégrer dans les composants

type MappingStrategy = (data: UserActivityRaw[], startDate: Date, endDate: Date) => UserActivityMapped[];

const strategies: Record<string, MappingStrategy> = {
    kilometres: mapKilometres,
}

export interface UserActivityRaw {
    date: string; // Date de l'activité au format ISO
    distance: number; // Distance parcourue en kilomètres
}

export interface UserActivityMapped {
    name: string; // Nom de la période (ex: "S1" pour semaine 1)
    uv: number; // Valeur totale des kilomètres pour cette période
}

/**
 * @param date 
 * @returns Date normalisée à 00:00:00 pour faciliter les comparaisons de dates sans tenir compte de l'heure.
 * Utile pour le mapping des activités utilisateur
 */
export function normalizeDate(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function mapUserActivity(type: string, data: UserActivityRaw[], startDate: Date, endDate: Date): UserActivityMapped[] {
    const strategy = strategies[type];
    if (!strategy) {
        throw new Error(`No mapping strategy found for type: ${type}`);
    }
    return strategy(data, startDate, endDate);
}

export function mapKilometres(data: UserActivityRaw[], startDate: Date, endDate: Date): UserActivityMapped[] {
    const weeks = [];
    let weekStart = new Date(startDate);
    while(weekStart <= endDate) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekEnd > endDate) weekEnd.setTime(endDate.getTime());
        weeks.push({ start: new Date(weekStart), end: new Date(weekEnd) });
        weekStart.setDate(weekStart.getDate() + 7);
    }

    return weeks.map((week, idx) => {
        const weekActivities = data.filter((item: UserActivityRaw) => {
            const d = normalizeDate(new Date(item.date));
            const start = normalizeDate(week.start);
            const end = normalizeDate(week.end);
            return d >= start && d <= end;
        });

    const totalKm = weekActivities.reduce((sum: number, item: UserActivityRaw) => sum + (typeof item.distance === 'number' ? item.distance : 0), 0);
        return {
            name: `S${idx + 1}`,
            uv: Number(totalKm.toFixed(2)),
        };
    });
}