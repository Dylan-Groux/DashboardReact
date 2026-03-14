export type UserActivityRawKm = { 
    date: string;  
    distance: number; 
}

export type UserActivityRawHR = { 
    date: string;  
    heartRate: { min: number; max: number; average: number }; 
}

export type HeartRateArray = 
{ 
    min: number; 
    max: number; 
    average: number; 
}[];


export type UserActivity = {
    name : string;
    uv?: number;
    pointsaveragebpm?: number | null;
    minbpm?: number | null;
    maxbpm?: number | null;
}