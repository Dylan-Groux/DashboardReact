import type { UserActivityRawKm} from "../../types/UserActivityTypes";
import { normalizeDate } from "../../../../utils/NormalizeDate";
import type { UserActivityMapped } from "../../types/UserActivityTypes";
/**
 * 
 * @param data 
 * @param startDate 
 * @param endDate 
 * @returns Liste des kilomètres mapper par semaine.
 */
export function mapKilometres(data: UserActivityRawKm[], startDate: Date, endDate: Date): UserActivityMapped[] {
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
        const weekActivities = data.filter((item: UserActivityRawKm) => {
            const d = normalizeDate(new Date(item.date));
            const start = normalizeDate(week.start);
            const end = normalizeDate(week.end);
            return d >= start && d <= end;
        });

        const totalKm = weekActivities.reduce((sum: number, item: UserActivityRawKm) => sum + (typeof item.distance === 'number' ? item.distance : 0), 0);
        return {
            name: `S${idx + 1}`,
            uv: Number(totalKm.toFixed(2)),
            start: week.start,
            end: week.end,
        };
    });
}
