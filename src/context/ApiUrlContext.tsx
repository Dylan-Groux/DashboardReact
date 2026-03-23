import { createContext, useContext } from "react";

export const ApiUrlContext = createContext<string | undefined>(undefined);

export const useApiUrl = (): string => {
    const context = useContext(ApiUrlContext);
    if (!context) {
        throw new Error("useApiUrl must be used within an ApiUrlProvider");
    }
    return context;
};