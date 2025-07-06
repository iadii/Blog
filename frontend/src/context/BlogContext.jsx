import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { getApiUrl, API_CONFIG } from '../config/config';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.ALL));
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch single blog (authenticated)
  const fetchBlog = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.SINGLE(id)));
      setCurrentBlog(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to fetch blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch shared blog (public access)
  const fetchPublicBlog = useCallback(async (id) => {
    setLoading(true);
    try {
      console.log('Attempting to fetch shared blog with ID:', id);
      const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.SHARED(id)));
      console.log('Shared blog response:', response.data);
      setCurrentBlog(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching shared blog:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new blog
  const createBlog = useCallback(async (blogData) => {
    setLoading(true);
    try {
      const response = await axios.post(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE), blogData);
      setBlogs(prev => [response.data, ...prev]);
      toast.success('Blog created successfully!');
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete blog
  const deleteBlog = useCallback(async (id) => {
    try {
      await axios.delete(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.DELETE(id)));
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      toast.success('Blog deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
      return false;
    }
  }, []);

  // Update blog
  const updateBlog = useCallback(async (id, blogData) => {
    setLoading(true);
    try {
      const response = await axios.put(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPDATE(id)), blogData);
      setBlogs(prev => prev.map(blog => blog._id === id ? response.data : blog));
      toast.success('Blog updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle blog sharing
  const toggleBlogSharing = useCallback(async (id, shared) => {
    try {
      console.log('Toggling blog sharing for ID:', id, 'shared:', shared);
      const response = await axios.put(getApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPDATE(id)), { shared });
      console.log('Toggle sharing response:', response.data);
      setBlogs(prev => prev.map(blog => blog._id === id ? response.data : blog));
      if (currentBlog && currentBlog._id === id) {
        setCurrentBlog(response.data);
      }
      toast.success(shared ? 'Blog shared successfully!' : 'Blog unshared successfully!');
      return response.data;
    } catch (error) {
      console.error('Error toggling blog sharing:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      toast.error('Failed to update blog sharing');
      return null;
    }
  }, [currentBlog]);

  // Fetch blogs when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    } else {
      setBlogs([]);
      setCurrentBlog(null);
    }
  }, [isAuthenticated, fetchBlogs]);

  const value = useMemo(() => ({
    blogs,
    currentBlog,
    loading,
    fetchBlogs,
    fetchBlog,
    fetchPublicBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogSharing,
    setCurrentBlog,
  }), [blogs, currentBlog, loading, fetchBlogs, fetchBlog, fetchPublicBlog, createBlog, updateBlog, deleteBlog, toggleBlogSharing]);

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};