import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogDetail from './pages/BlogDetail';
import AuthSuccess from './pages/AuthSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <div className="min-h-screen bg-black-950">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog/:id/edit" 
                element={
                  <ProtectedRoute>
                    <EditBlog />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog/:id" 
                element={
                  <ProtectedRoute>
                    <BlogDetail />
                  </ProtectedRoute>
                } 
              />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </div>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
