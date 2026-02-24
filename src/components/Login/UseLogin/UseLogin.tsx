  import React, { useState } from 'react';

export const useLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        localStorage.setItem('token', data.token);
        // Rediriger ou afficher un message de succès ici
        window.location.href = `/dashboard/${data.userId}`;
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