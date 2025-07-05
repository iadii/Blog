import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { XCircle } from 'lucide-react';
import axios from 'axios';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [error, setError] = useState(searchParams.get('error'));
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // If there's an error in URL params, handle it
    if (error) {
      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }

    // If no token, redirect to login
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Save token to localStorage and axios headers immediately
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Attempt login if we have a token and haven't tried yet
    if (token && !loginAttempted && !loading) {
      setLoginAttempted(true);
      login(token)
        .then(() => {
          // Login successful, redirect will happen via isAuthenticated effect
        })
        .catch((err) => {
          console.error('Login failed:', err);
          setError('Authentication failed. Please try again.');
        });
    }
  }, [token, login, loginAttempted, error, navigate, isAuthenticated, loading]);

  // Redirect to dashboard when authentication is complete
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard', { replace: true });
      
    }
  }, [isAuthenticated, loading, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/20 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Failed</h1>
          <p className="text-black-300 mb-6">{error}</p>
          <div className="text-sm text-black-400">Redirecting to login page...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 flex items-center justify-center px-4">
      <div className="text-center">
        <LoadingSpinner size="large" className="mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">Processing Authentication</h1>
        <p className="text-black-300">Please wait while we sign you in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;