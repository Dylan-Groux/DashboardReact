import type { UserActivityRawHR } from "../../types/UserActivityTypes";
import { normalizeDate, parseApiDate, isSameDay, isDateInInclusiveRange } from "../../../../utils/NormalizeDate";
import type { UserActivity, HeartRateArray } from "../../types/UserActivityTypes";

export function mapHeartRate(data: UserActivityRawHR[], startDate: Date, endDate: Date): UserActivity[] {
    const days = [];
    let dayStart = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    const daylibelle = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    while (dayStart <= normalizedEndDate) {
        days.push(new Date(dayStart));
        dayStart.setDate(dayStart.getDate() + 1);
    }

    const rangedData = data.filter((item) =>
        isDateInInclusiveRange(parseApiDate(item.date), startDate, endDate)
    );

    return days.map((day) => {
        const dayActivities = rangedData.filter((item) =>
            isSameDay(parseApiDate(item.date), day)
        );

        let minBpm = null;
        if (dayActivities.length > 0) {
            minBpm = getMinBpm(getArrayHeartRates(dayActivities)) ?? null;
        }

        let maxBpm = null;
        if (dayActivities.length > 0) {
            maxBpm = getMaxBpm(getArrayHeartRates(dayActivities)) ?? null;
        }

        let averageBpm = 0;
        if (dayActivities.length > 0) {
            averageBpm = getAverageBpm(getArrayHeartRates(dayActivities));
        }

        return {
            name: daylibelle[day.getDay()],
            pointsaveragebpm: averageBpm,
            minbpm: minBpm && minBpm > 110 ? minBpm : null,
            maxbpm: maxBpm && maxBpm > 110 ? maxBpm : null,
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