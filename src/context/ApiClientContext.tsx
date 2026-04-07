import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useApiUrl } from './ApiUrlContext';

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

  const request = useCallback(async (path: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);

    if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${apiUrl}${path}`, {
      ...init,
      headers,
    });

    if (response.status === 401) {
      logout();
      throw new Error('Session expirée');
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response;
  }, [apiUrl, logout, token]);

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