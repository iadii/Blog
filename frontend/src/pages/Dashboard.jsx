import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  PenTool, 
  Calendar, 
  Trash2, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  BookOpen,
  TrendingUp,
  Clock,
  FileText,
  MoreVertical,
  Edit3,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const { blogs, loading, deleteBlog, fetchBlogs } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteBlog(id);
    if (success) {
      setDeleteConfirm(null);
      toast.success('Blog deleted successfully');
    }
  };

  const filteredAndSortedBlogs = blogs
    .filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
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
      <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 relative overflow-x-hidden">
      {/* Layered Animated Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-black-950 to-black-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/20 via-white/20 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-br from-teal-400/20 via-white/20 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-conic from-teal-400/10 via-white/10 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-3xl blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10">
            {/* Welcome Section */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-14 h-14 flex items-center justify-center text-white rounded-2xl border border-white/10 bg-black-900/80 hover:bg-black-800/80 hover:border-teal-400/40 transition-all duration-200 shadow-lg"
                  aria-label="Back to Home"
                >
                  <ArrowLeft className="w-7 h-7" strokeWidth={2.2} />
                </button>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Your Garden of Verses</h1>
              </div>
              <p className="text-black-300 text-lg mb-8">Gaze upon your written flowers, each one a story blooming in the gentle light of your imagination.</p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/create"
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Blog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">Total Blogs</p>
              <p className="text-2xl font-bold text-white">{blogs.length}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold text-white">
                {blogs.filter(blog => {
                  const blogDate = new Date(blog.createdAt);
                  const now = new Date();
                  return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">Total Words</p>
              <p className="text-2xl font-bold text-white">
                {blogs.reduce((total, blog) => total + getWordCount(blog.content), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full pl-12 pr-10 bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition font-medium text-base"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title</option>
                </select>
                {/* Custom dropdown arrow */}
                <svg className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'bg-black-900/60 text-white/60'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow ${viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-black-900/60 text-white/60'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="relative z-10">
          {filteredAndSortedBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-accent-500/20 to-gold-500/20 rounded-2xl mb-6">
                <PenTool className="w-12 h-12 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {searchTerm ? 'No blogs found' : 'No blogs yet'}
              </h3>
              <p className="text-black-300 mb-8 text-lg max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or create a new blog.' 
                  : 'Start your blogging journey by creating your first blog post.'
                }
              </p>
              {!searchTerm && (
                <Link to="/create" className="btn-primary inline-flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  <span>Create Your First Blog</span>
                </Link>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredAndSortedBlogs.map((blog, index) => (
                <div 
                  key={blog._id} 
                  className={`card group hover:scale-[1.02] transition-all duration-300 bg-black-800/30 backdrop-blur-xl border-black-700 hover:border-accent-500/30 ${
                    viewMode === 'list' ? 'flex items-center gap-6' : ''
                  }`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-accent-400 group-hover:to-gold-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 flex-1">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                          <Link
                            to={`/blog/${blog._id}`}
                            className="p-2 text-gray-400 hover:text-accent-400 hover:bg-accent-500/10 rounded-lg transition-all duration-200"
                            title="View blog"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/blog/${blog._id}/edit`}
                            className="p-2 text-gray-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-all duration-200"
                            title="Edit blog"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(blog._id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title="Delete blog"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Release to the Night</span>
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-black-300 mb-4 line-clamp-3 text-sm">
                        {truncateContent(blog.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-black-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{getReadTime(blog.content)} min read</span>
                          </div>
                        </div>
                        <Link
                          to={`/blog/${blog._id}`}
                          className="text-accent-400 hover:text-accent-300 transition-colors duration-200 font-medium"
                        >
                          Read more →
                        </Link>
                      </div>
                    </>
                  ) : (
                    // List View
                    <>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-accent-400 group-hover:to-gold-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link
                              to={`/blog/${blog._id}`}
                              className="p-2 text-gray-400 hover:text-accent-400 hover:bg-accent-500/10 rounded-lg transition-all duration-200"
                              title="View blog"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/blog/${blog._id}/edit`}
                              className="p-2 text-gray-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-all duration-200"
                              title="Edit blog"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(blog._id)}
                              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                              title="Delete blog"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="sr-only">Release to the Night</span>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-black-300 mb-3 line-clamp-2 text-sm">
                          {truncateContent(blog.content, 200)}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-black-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.createdAt)} at {formatTime(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{getReadTime(blog.content)} min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{getWordCount(blog.content)} words</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${blog._id}`}
                        className="btn-secondary px-4 py-2 text-sm whitespace-nowrap"
                      >
                        View Blog
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full bg-black-800/90 backdrop-blur-xl border-black-700">
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
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex-1"
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

export default Dashboard;