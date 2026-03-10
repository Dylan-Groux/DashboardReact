
// Plus besoin de UserPicture ici, on va juste typer la réponse API

/**
 * @returns URL de l'image de l'utilisateur
 * Permet de renvoyer l'URL de l'image de l'utilisateur.
 */

export async function getUserPicture(): Promise<string> {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
        console.error("[getUserPicture] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }

    const token = localStorage.getItem('token');

    let response;

    try {
        response = await fetch(`${apiUrl}/user-info`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.error('[getUserPicture] Erreur réseau lors du fetch:', err);
        throw err;
    }

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }

    let data: any;

    try {
        data = await response.json();
    } catch (err) {
        throw err;
    }

    const profilePicture = data?.profile?.profilePicture;
    if (!profilePicture || typeof profilePicture !== 'string') {
        throw new Error('Données reçues dans un format inattendu');
    }

    return profilePicture;
}