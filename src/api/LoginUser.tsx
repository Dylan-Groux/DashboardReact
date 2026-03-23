export async function loginUser(email: string, password: string, apiUrl: string): Promise<{ token: string; userId: string }> {
    if (!apiUrl) {
        console.error("[loginUser] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
    }

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
    });

    if (!response.ok) {
        console.error('[loginUser] Erreur de connexion:', response.status, response.statusText);
        throw new Error('Erreur de connexion');
    }

    return response.json() as Promise<{ token: string; userId: string }>;
}