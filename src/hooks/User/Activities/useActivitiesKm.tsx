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
  const { userInformation, loading, error } = useUserActivitiesWithAuth(startDate, endDate);

  const totalDistance = userInformation
    ? userInformation.reduce((sum, activity) => sum + (activity.distance || 0), 0)
    : 0;

  return {
    totalDistance,
    loading,
    error,
  };
}