import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiUrl, API_CONFIG } from '../config/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    setInitialized(true);
    toast.success('Logged out successfully');
  }, []);

  const checkAuthOnLoad = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setLoading(true);
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const { data } = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME));
        setUser(data);
        setToken(storedToken);
        console.log('Auth check successful:', data);
      } catch (error) {
        console.error("Initial auth check failed", error);
        logout();
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    } else {
      setLoading(false);
      setInitialized(true);
    }
  }, [logout]);

  useEffect(() => {
    checkAuthOnLoad();
  }, [checkAuthOnLoad]);

  const login = useCallback(async (newToken) => {
    setLoading(true);
    try {
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      const { data } = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME));
      setToken(newToken);
      setUser(data);
      setInitialized(true);
      toast.success('Successfully logged in!');
      return true;
    } catch (err) {
      console.error('Login failed', err);
      logout();
      toast.error('Authentication failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const value = {
    user,
    token,
    loading: loading || !initialized,
    initialized,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};