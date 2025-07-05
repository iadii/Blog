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
export const BACKEND_URL = API_CONFIG.BASE_URL;

// Export the frontend URL for direct use
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

// Environment variables for debugging
export const ENV_INFO = {
  backendUrl: 'https://blog-backend-kmoo.onrender.com',
  nodeEnv: import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV || false,
  isProd: import.meta.env.PROD || false
}; 