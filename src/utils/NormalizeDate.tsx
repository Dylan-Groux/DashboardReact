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