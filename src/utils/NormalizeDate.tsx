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

export function getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;

    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getMondayIndex(date: Date): number {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
}

export function toAPIDateString(date: Date): string {
    if (typeof date === 'string') {
        return new Date(date).toISOString().slice(0, 10);
    }

    return date.toISOString().slice(0, 10);
}

export function parseApiDate(dateString: string): Date {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    return new Date(dateString);
}

export function formatApiDate(date: Date): string {
    const normalized = normalizeDate(date);
    const year = normalized.getFullYear();
    const month = String(normalized.getMonth() + 1).padStart(2, '0');
    const day = String(normalized.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function isSameDay(left: Date, right: Date): boolean {
    return normalizeDate(left).getTime() === normalizeDate(right).getTime();
}

export function isDateInInclusiveRange(date: Date, startDate: Date, endDate: Date): boolean {
    const current = normalizeDate(date).getTime();
    const start = normalizeDate(startDate).getTime();
    const end = normalizeDate(endDate).getTime();
    return current >= start && current <= end;
}
