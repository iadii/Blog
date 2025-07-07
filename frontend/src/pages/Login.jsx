import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Shield, Mail, Lock } from 'lucide-react';
import { BACKEND_URL } from '../config/config';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/10 via-transparent to-emerald-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left: Project Info */}
        <div className="hidden md:flex flex-col justify-center items-start p-10 w-1/2 bg-gradient-to-br from-teal-900/60 to-emerald-900/60">
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to Serenade Ink</h2>
          <p className="text-lg text-gray-300 mb-6">Serenade Ink is your creative sanctuary for writing, sharing, and discovering stories. Join a vibrant community of writers and readers, and let your voice be heard across the globe.</p>
          <ul className="text-gray-200 space-y-2">
            <li>• Distraction-free writing experience</li>
            <li>• Connect with a global audience</li>
            <li>• Analytics and feedback for your stories</li>
            <li>• Recognition and community support</li>
          </ul>
        </div>
        {/* Right: Login Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-10">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Sign in to Serenade Ink</h1>
            <p className="text-gray-400">Continue with your Google account</p>
          </div>
          {/* Google Login Only */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;