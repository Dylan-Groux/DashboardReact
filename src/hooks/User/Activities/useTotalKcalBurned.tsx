
import { useMemo } from "react";
import { useUserInformationWithAuth } from "../Informations/_useUserInformationWithAuth";
import { useUserActivitiesWithAuth } from "./_useActivitiesInformationWithAuth";

export type UserTotalKcalBurnedState = {
    totalKcalBurned: number;
}

export function useTotalKcalBurned(
): UserTotalKcalBurnedState {
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

    const totalKcalBurned = (userActivities ?? []).reduce(
        (sum, activity) => sum + activity.caloriesBurned,
        0
    );
    return { totalKcalBurned };
}