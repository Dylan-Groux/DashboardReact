export type UserActivityRawKm = { 
    date: string;  
    distance: number; 
}

export type UserActivityRawHR = { 
    date: string;  
    heartRate: { min: number; max: number; average: number }; 
}

export type UserActivityRawHebdo = {
    date: string;  
}

export type HeartRateArray = 
{ 
    min: number; 
    max: number; 
    average: number; 
}[];


export type UserActivity = {
    name : string;
    uv?: number | null;
    pointsaveragebpm?: number | null;
    minbpm?: number | null;
    maxbpm?: number | null;
    pointdayactivity?: number | null;
}