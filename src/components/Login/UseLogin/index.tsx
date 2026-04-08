import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiClient } from '../../../context/ApiClientContext';
import { useAuth } from '../../../context/AuthContext';
import { useError } from '../../../context/ErrorContext';

type LoginResponse = {
  token: string;
  userId: string;
};

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const api = useApiClient();
  const { setAuthSession } = useAuth();
  const { showError } = useError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const sanitizedData = sanitizeFormData({ username: email, password });
      const data = await api.post<LoginResponse, { username: string; password: string }>('/login', {
        username: sanitizedData.username,
        password: sanitizedData.password,
      });

      setAuthSession({
        email: sanitizedData.username,
        token: data.token,
        userId: data.userId,
      });
      navigate(`/dashboard/${data.userId}`); // Redirige vers le dashboard
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur serveur';
      showError({
        title: 'Connexion impossible',
        message,
        code: 'LOGIN',
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

const sanitizeFormData = (data: {username : string, password : string }) => {
    const username = data.username.trim().toLowerCase();
    const password = data.password.trim();
    
    if (password.length < 8 || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        throw new Error('Le mot de passe doit contenir au moins 8 caracteres, une minuscule et un chiffre.');
    }
    
    return { username, password };
};