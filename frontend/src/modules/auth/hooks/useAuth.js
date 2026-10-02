import { useState, useEffect } from 'react';
import { authApi } from '../api';
import ApiClient from '../../../services/apiClient';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gis_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('gis_token');
      if (token) {
        ApiClient.setToken(token);
        try {
          const profile = await authApi.getMe();
          if (profile && profile.id) {
            setUser(profile);
            localStorage.setItem('gis_user', JSON.stringify(profile));
          }
        } catch {
          // Token expired or invalid
          localStorage.removeItem('gis_token');
          localStorage.removeItem('gis_user');
          setUser(null);
        }
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(email, password);
      if (response && response.access_token) {
        ApiClient.setToken(response.access_token);
        localStorage.setItem('gis_token', response.access_token);
        setUser(response.user);
        localStorage.setItem('gis_user', JSON.stringify(response.user));
      }
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.detail || err.message || "Invalid email or password";
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout?.();
    } catch {}
    ApiClient.setToken(null);
    localStorage.removeItem('gis_token');
    localStorage.removeItem('gis_user');
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    setUser,
  };
}
