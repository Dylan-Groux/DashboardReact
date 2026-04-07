import { useUserActivitiesWithAuth } from "./_useActivitiesInformationWithAuth";

export type UserActivitiesKmState = {
  totalDistance: number;
  loading: boolean;
  error: string | null;
};

export function useActivitiesKm(
  startDate: Date,
  endDate: Date
): UserActivitiesKmState {
  const { userActivities, loading, error } = useUserActivitiesWithAuth(startDate, endDate);

  const totalDistance = userActivities
    ? userActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0)
    : 0;

  return {
    totalDistance,
    loading,
    error,
  };
}