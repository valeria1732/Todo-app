import { useState } from 'react';
import { login } from '../../api/auth';

export const useLogin = (onLogin) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login({ username, password });
      const serverData = response.data || response;
      const token = serverData.access_token;
      const refresh = serverData.refresh_token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refresh);
        onLogin();
      }
    } catch (err) {
      setError('Credenciales incorrectas o error de servidor. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return { username, setUsername, password, setPassword, loading, error, setError, handleSubmit };
};