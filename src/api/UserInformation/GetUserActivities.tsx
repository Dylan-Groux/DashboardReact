
 /* @type UserInformation
 * @description Représente la réponse API concernant les informations d'un utilisateur, incluant son profil et ses statistiques d'activité.
 * @property {Object} profile - Contient les informations de profil de l'utilisateur.
 * @property {string} profile.firstName - Le prénom de l'utilisateur.
 */
export type UserActivities = {
    date: string;
    distance: number;
    duration: number;
    heartRate: {
        min: number;
        max: number;
        average: number;
    };
    caloriesBurned: number;
}

/**
 * 
 * @param email 
 * @param password 
 * @returns Le token ainsi que l'userId de la réponse API
 * @description Permet de retourner le token ainsi que le userId d'un utilisateur
 */
export async function getUser( email: string, password: string): Promise<{ token: string, userId: string }> {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
        console.error("[getUser] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }

    console.log("Payload envoyé au login:", { username: email, password: password });
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password: password }),
        });

        if (!response.ok) {
            console.error('[getUser] Erreur lors de la récupération des données:', response.status, response.statusText);
            throw new Error('Erreur lors de la récupération des données');
        }
        const userData = await response.json();
        return { token: userData.token, userId: userData.userId };
    } catch (err) {
        console.error('[getUser] Erreur réseau lors du fetch:', err);
        throw err;
    }
}

/**
 * 
 * @param token 
 * @returns Une réponse API de type UserInformation
 * @description Permet de retourner les informations d'un utilisateur à partir de son token d'authentification
 */
export async function getUserActivities(token: string, startDate: Date, endDate: Date): Promise<UserActivities[]> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        console.error("[getUserActivities] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }

    try {
        const response = await fetch(`${apiUrl}/user-activity?startWeek=${startDate}&endWeek=${endDate}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('[getUserActivities] Erreur lors de la récupération des données:', response.status, response.statusText);
            throw new Error('Erreur lors de la récupération des données');
        }

        const userActivities = await response.json();

        return userActivities as UserActivities[];

    } catch (err) {
        console.error('[getUserActivities] Erreur réseau lors du fetch:', err);
        throw err;
    }
}