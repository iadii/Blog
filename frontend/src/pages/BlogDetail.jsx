import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Calendar, User, Clock, Trash2, Edit, Share2, BookOpen, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { fetchBlog, fetchPublicBlog, deleteBlog, toggleBlogSharing, currentBlog, loading } = useBlog();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogLoading, setBlogLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      setBlogLoading(true);
      let blogData = null;
      
      try {
        // ALWAYS try public access first - this ensures the blog is shown to anyone
        try {
          blogData = await fetchPublicBlog(id);
          console.log('Public blog loaded:', blogData);
        } catch (error) {
          console.error('Public fetch failed:', error);
          blogData = null;
        }
        
        // If public access failed, try authenticated access as fallback
        if (!blogData && isAuthenticated) {
          try {
            blogData = await fetchBlog(id);
            console.log('Authenticated blog loaded:', blogData);
          } catch (error) {
            console.error('Authenticated fetch also failed:', error);
            blogData = null;
          }
        }
        
        // Set ownership based on whether user is authenticated and is the author
        if (blogData && isAuthenticated && blogData.author === user?.name) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
        
        // Set sharing status
        setIsShared(blogData?.shared || false);
        setBlog(blogData);
      } catch (error) {
        console.error('Error loading blog:', error);
        setBlog(null);
      } finally {
        setBlogLoading(false);
      }
    };
    
    if (id) {
      loadBlog();
    }
  }, [id, isAuthenticated, user, fetchBlog, fetchPublicBlog]);

  const handleDelete = async () => {
    if (!isOwner) return;
    
    const success = await deleteBlog(id);
    if (success) {
      toast.success('Blog deleted successfully');
      navigate('/');
    }
  };

  const handleShare = async () => {
    if (!isOwner) return;
    
    const newSharedStatus = !isShared;
    const success = await toggleBlogSharing(id, newSharedStatus);
    
    if (success) {
      setIsShared(newSharedStatus);
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/blog/${id}`;
    
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  if (blogLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-grid opacity-5"></div>
        <div className="text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-accent-500/20 to-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-accent-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Verse Not Found</h1>
          <p className="text-black-300 mb-6 text-lg">The verse you seek has drifted into the gentle night, or perhaps never graced this garden.</p>
          <Link to="/" className="btn-primary">
            Return to Your Garden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-grid opacity-5"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-black-400 transition-colors duration-200 p-3 backdrop-blur-xl rounded-xl border border-black-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2">
            {/* Show share status and toggle button for owners */}
            {isOwner && (
              <button
                onClick={handleShare}
                className={`p-3 backdrop-blur-xl rounded-xl transition-all duration-200 border border-black-700 ${
                  isShared 
                    ? 'text-green-400 bg-green-500/10' 
                    : 'text-black-400'
                }`}
                title={isShared ? 'Blog is shared - click to unshare' : 'Share blog'}
              >
                <Share2 className="w-5 h-5" />
              </button>
            )}
            
            {/* Show copy link button for shared blogs */}
            {isShared && (
              <button
                onClick={handleCopyLink}
                className="p-3 text-blue-400 backdrop-blur-xl rounded-xl transition-all duration-200 border border-black-700"
                title="Copy share link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            )}
            
            {/* Only show edit/delete buttons if user is the owner */}
            {isOwner && (
              <>
                <Link
                  to={`/blog/${id}/edit`}
                  className="p-3 text-blue-400 rounded-xl transition-all duration-200 border border-black-700"
                  title="Edit blog"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="p-3 text-red-400 rounded-xl transition-all duration-200 border border-black-700"
                  title="Delete blog"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <article className="card bg-black-800/30 border-black-700">
          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-400 to-gold-400 bg-clip-text text-transparent mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-accent-500/10 rounded-xl">
                <User className="w-4 h-4 text-accent-400" />
                <span className="text-accent-300 font-medium">By {blog.author}</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gold-500/10 rounded-xl">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span className="text-gold-300 font-medium">{formatDate(blog.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-500/10 rounded-xl">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 font-medium">{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-black-200 leading-relaxed text-lg">
              {formatContent(blog.content)}
            </div>
          </div>

          {/* Blog Footer */}
          <footer className="mt-12 pt-8 border-t border-black-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={blog.author?.picture || user?.picture || '/default-avatar.png'}
                  alt={blog.author}
                  className="w-14 h-14 rounded-full border-2 border-accent-500 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="text-white font-bold text-lg">{blog.author}</p>
                </div>
              </div>
              
              <div className="text-right text-sm text-black-400">
                <p>Published on</p>
                <p className="text-white font-medium">{formatDate(blog.createdAt)}</p>
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black-800 border border-black-700 rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog</h3>
            <p className="text-black-300 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-black-300 border border-black-600 rounded-xl hover:bg-black-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default BlogDetail;