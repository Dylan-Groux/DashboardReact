import type { UserActivityMapped } from "../../types/UserActivityTypes";


export function addMovingAverageMaxBpm(data: UserActivityMapped[], windowSize: number): UserActivityMapped[] {
  return data.map((_, idx, arr) => {
    const start = Math.max(0, idx - windowSize + 1);
    const window = arr.slice(start, idx + 1);
    const sum = window.reduce((s, v) => s + (v.maxbpm ?? 0), 0);
    return { ...arr[idx], movingMaxBpm: sum / window.length };
  });
}