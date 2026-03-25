import { useUserActivitiesWithAuth } from "./_useActivitiesInformationWithAuth";

export type UserActivitiesDurationState = {
  totalDuration: number;
  loading: boolean;
  error: string | null;
};

export function useActivitiesDuration(
  startDate: Date,
  endDate: Date
): UserActivitiesDurationState {
  const { userInformation, loading, error } = useUserActivitiesWithAuth(startDate, endDate);

  const totalDuration = userInformation
    ? userInformation.reduce((sum, activity) => sum + (activity.duration || 0), 0)
    : 0;

  return {
    totalDuration,
    loading,
    error,
  };
}