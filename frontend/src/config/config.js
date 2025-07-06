// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://blog-backend-kmoo.onrender.com',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/google',
      ME: '/auth/me',
      LOGOUT: '/auth/logout'
    },
    BLOGS: {
      ALL: '/api/blogs',
      SINGLE: (id) => `/api/blogs/${id}`,
      SHARED: (id) => `/api/blogs/shared/${id}`,
      CREATE: '/api/blogs',
      UPDATE: (id) => `/api/blogs/${id}`,
      DELETE: (id) => `/api/blogs/${id}`
    }
  }
};

// Environment-based configuration
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export the base URL for direct use
export const BACKEND_URL = 'https://blog-backend-kmoo.onrender.com';

// Export the frontend URL for direct use
const FR_URL = 'https://blog-zeta-six-78.vercel.app/' || "https://blog-frontend-19zz.onrender.com"
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || FR_URL;

// Environment variables for debugging
export const ENV_INFO = {
  backendUrl: 'https://blog-backend-kmoo.onrender.com',
  nodeEnv: import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV || false,
  isProd: import.meta.env.PROD || false
}; 