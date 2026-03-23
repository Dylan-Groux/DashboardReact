  import React, { useContext, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
import { ApiUrlContext } from '../../../context/ApiUrlContext';
import { useAuth } from '../../../context/AuthContext';
import { loginUser } from '@api/LoginUser';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = useContext(ApiUrlContext);
  const { setAuthSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!apiUrl) {
        console.error("[useLogin] L'URL de l'API n'est pas définie dans les variables d'environnement");
        throw new Error("L'URL de l'API n'est pas définie dans les variables d'environnement");
      }

      const sanitizedData = sanitizeFormData({ username: email, password });
      const data = await loginUser(sanitizedData.username, sanitizedData.password, apiUrl);

      setAuthSession({
        email: sanitizedData.username,
        password: sanitizedData.password,
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