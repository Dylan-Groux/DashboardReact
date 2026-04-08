import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useApiUrl } from './ApiUrlContext';
import { useError } from './ErrorContext';

export type ApiClientType = {
  request: (path: string, init?: RequestInit) => Promise<Response>;
  get: <T>(path: string, init?: RequestInit) => Promise<T>;
  post: <TResponse, TBody>(path: string, body: TBody, init?: RequestInit) => Promise<TResponse>;
  hasToken: boolean;
};

const ApiClientContext = createContext<ApiClientType | undefined>(undefined);

export const ApiClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiUrl = useApiUrl();
  const { token, logout } = useAuth();
  const { showError } = useError();

  const request = useCallback(async (path: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);

    if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    let response: Response;

    try {
      response = await fetch(`${apiUrl}${path}`, {
        ...init,
        headers,
      });
    } catch {
      showError({
        title: 'Serveur indisponible',
        message: 'La requete n a pas pu atteindre l API. Verifiez la connexion ou le serveur.',
        code: 'NETWORK',
      });
      throw new Error('Erreur reseau');
    }

    if (response.status === 401) {
      logout();
      showError({
        title: 'Session expiree',
        message: 'Votre session n est plus valide. Merci de vous reconnecter.',
        code: '401',
      });
      throw new Error('Session expirée');
    }

    if (!response.ok) {
      showError({
        title: 'Erreur serveur',
        message: `La requete a echoue avec le statut ${response.status}.`,
        code: String(response.status),
      });
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response;
  }, [apiUrl, logout, showError, token]);

  const get = useCallback(async <T,>(path: string, init: RequestInit = {}) => {
    const response = await request(path, init);
    return response.json() as Promise<T>;
  }, [request]);

  const post = useCallback(async <TResponse, TBody>(path: string, body: TBody, init: RequestInit = {}) => {
    const response = await request(path, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body),
    });

    return response.json() as Promise<TResponse>;
  }, [request]);

  const value = useMemo(() => ({
    request,
    get,
    post,
    hasToken: Boolean(token),
  }), [get, post, request, token]);

  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = useContext(ApiClientContext);

  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }

  return context;
};