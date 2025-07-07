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
  ArrowLeft,
  Share2
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

  const handleShare = async (blog) => {
    const shareUrl = `${window.location.origin}/blog/${blog._id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.content.substring(0, 100) + '...',
          url: shareUrl,
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* No animated/gradient overlays, solid background only */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20" style={{ backgroundColor: '#0A0A0A' }}>
        {/* Hero/Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-start mb-4">
            <button
              onClick={() => navigate('/')}
              className="mr-2 w-12 h-12 flex items-center justify-center text-white rounded-2xl border border-white/10 bg-black-900/80 hover:bg-black-800/80 hover:border-teal-400/40 transition-all duration-200"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-7 h-7" strokeWidth={2.2} />
            </button>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent">Your Dashboard</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-center">Manage your blogs, track your progress, and share your stories with the world.</p>
          <div className="w-full text-center text-xs text-white/60 italic mt-4">Thoughts staged. Emotions pushed.</div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">Total Blogs</p>
              <p className="text-2xl font-bold text-white">{blogs.length}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-4">
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
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">Avg. Read Time</p>
              <p className="text-2xl font-bold text-white">
                {blogs.length > 0 ? Math.round(blogs.reduce((acc, blog) => acc + getReadTime(blog.content), 0) / blogs.length) : 0} min
              </p>
            </div>
          </div>
        </div>
        {/* Blog List Section */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            {/* Left controls: Search, Sort */}
            <div className="flex flex-1 items-center gap-4 min-w-0">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full md:w-72 bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
              />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition flex-shrink-0"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title">Title</option>
              </select>
            </div>
            {/* Right: New Blog button */}
            <div className="flex-shrink-0 flex justify-end">
              <Link
                to="/create"
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-lg hover:bg-teal-400 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Blog</span>
              </Link>
            </div>
          </div>
          {/* Blog Cards */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {filteredAndSortedBlogs.map((blog) => (
              <div key={blog._id} className="group relative">
                <div className="rounded-2xl border border-white/10 p-6 h-full flex flex-col shadow-xl transition-transform duration-300 bg-[#0A0A0A] hover:scale-[1.025] hover:border-teal-400/40">
                  {/* Blog Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors duration-200">
                        {blog.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{getReadTime(blog.content)} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Blog Content Preview */}
                  <div className="mb-6">
                    <p className="text-gray-300 line-clamp-3 leading-relaxed">
                      {truncateContent(blog.content)}
                    </p>
                  </div>
                  {/* Action Icons Bottom Right */}
                  <div className="flex items-center gap-3 mt-auto justify-end">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="p-2 rounded-full hover:bg-teal-900/40 transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5 text-teal-400" />
                    </Link>
                    <Link
                      to={`/edit/${blog._id}`}
                      className="p-2 rounded-full hover:bg-emerald-900/40 transition"
                      title="Edit"
                    >
                      <Edit3 className="w-5 h-5 text-emerald-400" />
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(blog._id)}
                      className="p-2 rounded-full hover:bg-red-900/40 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                    <button
                      onClick={() => handleShare(blog)}
                      className="p-2 rounded-full hover:bg-gray-800/40 transition"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredAndSortedBlogs.length === 0 && (
              <div className="col-span-full text-center text-white/60 py-12 text-lg">
                No blogs found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black-800 border border-black-700 rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog</h3>
            <p className="text-black-300 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-black-300 border border-black-600 rounded-xl hover:bg-black-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
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