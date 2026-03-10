import type { UserActivityRawHR} from "../../types/UserActivityTypes";
import { normalizeDate } from "../../../../utils/NormalizeDate";
import type { UserActivityMapped, HeartRateArray } from "../../types/UserActivityTypes";

export function mapHeartRate(data: UserActivityRawHR[], startDate: Date, endDate: Date): UserActivityMapped[] {
    const days = [];
    let dayStart = new Date(startDate);
    let firstMonday = new Date(startDate);
    let weekStart = new Date(firstMonday);
    const daylibelle = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    while (firstMonday.getDay() !== 1) {
        firstMonday.setDate(firstMonday.getDate() + 1);
    }

    while (weekStart <= endDate) {
        let weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (weekEnd > endDate) weekEnd = new Date(endDate);
        days.push({ start: new Date(weekStart), end: new Date(weekEnd) });
        weekStart.setDate(weekStart.getDate() + 7);
    }
    
    while(dayStart <= endDate) {
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);
        if (dayEnd > endDate) dayEnd.setTime(endDate.getTime());
        days.push({ start: new Date(dayStart), end: new Date(dayEnd) });
        dayStart.setDate(dayStart.getDate() + 1);
    }

    return days.map((day, idx) => {
        const dayActivities = data.filter((item: UserActivityRawHR) => {
            const d = normalizeDate(new Date(item.date));
            const start = normalizeDate(day.start);
            const end = normalizeDate(day.end);
            return d >= start && d < end;
        });

        // Min BPM
        let minBpm = null;
        if (dayActivities.length > 0) {
            minBpm = getMinBpm(getArrayHeartRates(dayActivities)) ?? null;
        }

        // Max BPM
        let maxBpm = null;
        if (dayActivities.length > 0) {
            maxBpm = getMaxBpm(getArrayHeartRates(dayActivities)) ?? null;
        }

        // Average BPM
        let averageBpm = 0;
        if (dayActivities.length > 0) {
            averageBpm = getAverageBpm(getArrayHeartRates(dayActivities));
        }

        return {
            name: daylibelle[idx % 7],
            pointsaveragebpm: averageBpm ?? 0,
            minbpm: minBpm ?? 0,
            maxbpm: maxBpm ?? 0,
        };
    });
}

export function getArrayHeartRates(data: UserActivityRawHR[]): HeartRateArray {
    return data.reduce((acc, item) => {
        const heartRates = Array.isArray(item.heartRate) ? item.heartRate : item.heartRate ? [item.heartRate] : [];
        return acc.concat(heartRates);
    }, [] as HeartRateArray);
}

export function getMinBpm(data: HeartRateArray): number | null 
{
    const min = Math.min(...data.map(item => item.min));
    return min === Infinity ? null : min;
}

export function getMaxBpm(data: HeartRateArray): number | null
{
    const max = Math.max(...data.map(item => item.max));
    return max === -Infinity ? null : max;
}

export function getAverageBpm(data: HeartRateArray): number
{
    if (data.length === 0) return 0;
    const sum = data.reduce((total, item) => total + item.average, 0);
    return Number((sum / data.length).toFixed(2));
}