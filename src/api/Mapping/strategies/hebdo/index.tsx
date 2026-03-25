import type { UserActivity } from "@api/Mapping/types/UserActivityTypes";
import type { UserActivityRawHebdo } from "@api/Mapping/types/UserActivityTypes";
import { normalizeDate, parseApiDate, isSameDay, isDateInInclusiveRange } from "../../../../utils/NormalizeDate";

export function mapUserActivityHebdo(data: UserActivityRawHebdo[], startDate: Date, endDate: Date): UserActivity[] {
    const days = [];
    let dayStart = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);

    const daylibelle = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    while (dayStart <= normalizedEndDate) {
        days.push(new Date(dayStart));
        dayStart.setDate(dayStart.getDate() + 1);
    }

    const rangedData = data.filter((item) =>
        isDateInInclusiveRange(parseApiDate(item.date), startDate, endDate)
    );

    return days.map((day) => {
        const dayIndex = day.getDay() === 0 ? 6 : day.getDay() - 1;

        const hasActivity = rangedData.some((item) =>
            isSameDay(parseApiDate(item.date), day)
        );

        return {
            name: daylibelle[dayIndex],
            pointdayactivity: hasActivity ? 1 : 0,
        };
    });
}