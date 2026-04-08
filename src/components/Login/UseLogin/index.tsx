import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiClient } from '../../../context/ApiClientContext';
import { useAuth } from '../../../context/AuthContext';

type LoginResponse = {
  token: string;
  userId: string;
};

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const api = useApiClient();
  const { setAuthSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      setError('Erreur serveur');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};

const sanitizeFormData = (data: {username : string, password : string }) => {
    const username = data.username.trim().toLowerCase();
    const password = data.password.trim();
    
    if (password.length < 8 || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre');
    }
    
    return { username, password };
};