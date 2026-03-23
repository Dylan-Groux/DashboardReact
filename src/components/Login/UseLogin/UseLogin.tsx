  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

export const useLogin = (login: (username: string, password: string) => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    const sanitizedData = sanitizeFormData({ username: email, password });
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });
      const data = await response.json();
      if (response.ok) {
        login(email, password); // Met à jour le contexte d'authentification
        navigate(`/dashboard/${data.userId}`); // Redirige vers le dashboard
      } else {
        setError('Erreur de connexion');
      }
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