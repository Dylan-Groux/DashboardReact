
import { useMemo } from "react";
import { useUserInformationWithAuth } from "../Informations/_useUserInformationWithAuth";
import { useUserActivitiesWithAuth } from "./_useActivitiesInformationWithAuth";

export type UserTotalDayOfflineState = {
    totalDayOffline: number;
}

export function useTotalDayOffline(
): UserTotalDayOfflineState {
    const userInformation = useUserInformationWithAuth().userInformation;


    const createdAt = userInformation?.profile.createdAt;
    const startDate = useMemo(
        () => (createdAt ? new Date(createdAt) : new Date()),
        [createdAt]
    );
    // endDate = aujourd'hui, mais stabilisé à la date du jour (pas l'heure)
    const todayKey = new Date().toISOString().slice(0, 10);
    const endDate = useMemo(
        () => new Date(todayKey),
        [todayKey]
    );

    const { userActivities } = useUserActivitiesWithAuth(startDate, endDate);

    const allDays: string[] = [];
    let current = new Date(startDate);
    while (current <= endDate) {
        allDays.push(current.toISOString().slice(0, 10)); // Format YYYY-MM-DD
        current.setDate(current.getDate() + 1);
    }

    // Créer un Set des jours avec activités pour une recherche rapide
    const daysWithActivity = new Set(
        userActivities?.map((activity) => activity.date) || []
    );

    // Compter les jours sans activités
    const totalDayOffline = allDays.filter(
        (day) => !daysWithActivity.has(day)
    ).length;

    return { totalDayOffline };
}