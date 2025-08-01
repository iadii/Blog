import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  FileText, 
  TrendingUp, 
  Eye, 
  Edit3, 
  Trash2,
  User,
  Mail,
  Globe,
  Award,
  Activity,
  BarChart3,
  Target,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Settings,
  ArrowLeft,
  Feather
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';


const Profile = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { blogs, loading, deleteBlog } = useBlog();
  const [activeTab, setActiveTab] = useState('blogs');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Debug authentication state
  useEffect(() => {
    console.log('Profile component mounted');
    console.log('Auth state:', { isAuthenticated, authLoading, user });
  }, [isAuthenticated, authLoading, user]);

  // Memoize calculations to prevent re-renders
  const {
    totalWords,
    totalReadTime,
    thisMonthBlogs,
    recentBlogs,
    mostPopularBlog
  } = useMemo(() => {
    const getWordCount = (content) => {
      return content.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const getReadTime = (content) => {
      const wordCount = getWordCount(content);
      return Math.max(1, Math.ceil(wordCount / 200));
    };

    const totalWords = blogs.reduce((total, blog) => total + getWordCount(blog.content), 0);
    const totalReadTime = blogs.reduce((total, blog) => total + getReadTime(blog.content), 0);
    const thisMonthBlogs = blogs.filter(blog => {
      const blogDate = new Date(blog.createdAt);
      const now = new Date();
      return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
    }).length;

    const recentBlogs = blogs.slice(0, 5);
    const mostPopularBlog = blogs.length > 0
      ? blogs.reduce((prev, current) => getWordCount(prev.content) > getWordCount(current.content) ? prev : current)
      : null;

    return {
      totalWords,
      totalReadTime,
      thisMonthBlogs,
      recentBlogs,
      mostPopularBlog
    };
  }, [blogs]);

  const handleDelete = async (id) => {
    const success = await deleteBlog(id);
    if (success) {
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getWordCount = (content) => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getReadTime = (content) => {
    const wordCount = getWordCount(content);
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Removed animated background elements for solid background */}

      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        {/* Hero/Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">Your Profile</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Track your writing journey, see your progress, and manage your content.</p>
          <div className="w-full text-center text-xs text-white/60 italic mt-4">Thoughts staged. Emotions pushed.</div>
        </div>
        {/* Profile Header */}
        <div className="rounded-2xl" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 mb-8 flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-teal-500 bg-black-900 flex items-center justify-center overflow-hidden shadow-2xl">
                  <img
                    src={user?.picture || '/default-avatar.png'}
                    alt={user?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center border-2 border-black-900">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
              <p className="text-black-300 mb-2">{user?.email}</p>
              <div className="flex items-center gap-2 text-teal-400">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Writer</span>
              </div>
            </div>
            {/* Stats Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl border border-white/20" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{blogs.length}</p>
                <p className="text-black-300 text-sm">Total Blogs</p>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/20" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{thisMonthBlogs}</p>
                <p className="text-black-300 text-sm">This Month</p>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/20" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalReadTime}</p>
                <p className="text-black-300 text-sm">Min Read</p>
              </div>
              <div className="text-center p-4 rounded-xl border border-white/20" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalWords.toLocaleString()}</p>
                <p className="text-black-300 text-sm">Total Words</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { id: 'blogs', label: 'My Blogs', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-accent-600 to-accent-500 text-white shadow-neon'
                    : 'text-black-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              {/* Blog Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-black-300 text-sm">Most Popular</p>
                      <p className="text-xl font-bold text-white">{mostPopularBlog?.title || 'No blogs yet'}</p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-black-300 text-sm">Longest Read</p>
                      <p className="text-xl font-bold text-white">{Math.max(...blogs.map(b => getReadTime(b.content)), 0)} min</p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-black-300 text-sm">Avg. Words</p>
                      <p className="text-xl font-bold text-white">{blogs.length > 0 ? Math.round(totalWords / blogs.length) : 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog List */}
              <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent-400" />
                  All Blogs ({blogs.length})
                </h3>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="flex items-center justify-between p-4 bg-black-800/50 rounded-xl border border-black-700 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-accent-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{blog.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-black-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(blog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {getReadTime(blog.content)} min read
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              {getWordCount(blog.content)} words
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/blog/${blog._id}`}
                          className="p-2 text-gray-400 rounded-lg"
                          title="View blog"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/blog/${blog._id}/edit`}
                          className="p-2 text-gray-400 rounded-lg"
                          title="Edit blog"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(blog._id)}
                          className="p-2 text-gray-400 rounded-lg"
                          title="Delete blog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent-400" />
                  Writing Analytics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-black-300">Total Blogs</span>
                    <span className="text-white font-medium">{blogs.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black-300">Total Words</span>
                    <span className="text-white font-medium">{totalWords.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black-300">Average Words per Blog</span>
                    <span className="text-white font-medium">{blogs.length > 0 ? Math.round(totalWords / blogs.length) : 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black-300">Total Read Time</span>
                    <span className="text-white font-medium">{totalReadTime} minutes</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold-400" />
                  Monthly Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-black-300">This Month</span>
                    <span className="text-white font-medium">{thisMonthBlogs} blogs</span>
                  </div>
                  <div className="w-full bg-black-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-accent-500 to-gold-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((thisMonthBlogs / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-black-400">Goal: 5 blogs per month</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent-400" />
                Account Settings
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="input-field bg-black-800/50 border-black-700 text-black-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="input-field bg-black-800/50 border-black-700 text-black-300"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black-800/50 rounded-xl border border-black-700">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent-500/20 to-gold-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Connected with Google</h4>
                    <p className="text-black-400 text-sm">Your account is securely connected via Google OAuth</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Blog</h3>
                <p className="text-black-300 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-black-300 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 