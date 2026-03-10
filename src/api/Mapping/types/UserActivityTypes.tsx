export interface UserActivityRawKm { 
    date: string;  
    distance: number; 
}

export interface UserActivityRawHR { 
    date: string;  
    heartRate: { min: number; max: number; average: number }; 
}

export type HeartRateArray = 
{ 
    min: number; 
    max: number; 
    average: number; 
}[];


export interface UserActivityMapped {
    name : string;
    uv?: number;
    pointsaveragebpm?: number | null;
    minbpm?: number | null;
    maxbpm?: number | null;
}