import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Save, ArrowLeft, FileText, Type, BookOpen, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EditBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shared, setShared] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { updateBlog, fetchBlog } = useBlog();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      const blog = await fetchBlog(id);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setShared(blog.shared || false);
      } else {
        toast.error('Blog not found');
        navigate('/dashboard');
      }
      setIsLoading(false);
    };

    if (id) {
      loadBlog();
    }
  }, [id, fetchBlog, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }
    setIsSubmitting(true);
    const blog = await updateBlog(id, {
      title: title.trim(),
      content: content.trim(),
      shared,
    });
    if (blog) {
      toast.success('Blog updated successfully!');
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  if (isLoading) {
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={handleBack}
            className="w-14 h-14 flex items-center justify-center text-white rounded-2xl border border-white/10 bg-black-900/80 hover:bg-black-800/80 hover:border-teal-400/40 transition-all duration-200 shadow-lg"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-7 h-7" strokeWidth={2.2} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black-900 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-teal-400 drop-shadow-glow" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Edit Your Verse</h1>
          </div>
        </div>
        {/* Main Content: Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Title Input */}
            <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6 mb-2">
              <label htmlFor="title" className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <Type className="w-5 h-5 text-teal-400" />
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Let your title glimmer..."
                className="w-full bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-xl font-bold text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
                maxLength={100}
              />
              <div className="mt-2 text-sm text-white/40">
                <span className={title.length > 80 ? 'text-teal-400' : ''}>
                  {title.length}/100 characters
                </span>
              </div>
            </div>
            {/* Content Editor Card */}
            <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <label htmlFor="content" className="text-lg font-bold text-white">
                  Content
                </label>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-black-900/60 rounded-lg text-teal-400 font-medium text-xs">{wordCount} words</span>
                <span className="px-3 py-1 bg-black-900/60 rounded-lg text-white/60 font-medium text-xs">{charCount} chars</span>
                <span className="px-3 py-1 bg-black-900/60 rounded-lg text-white/60 font-medium text-xs">~{estimatedReadTime} min read</span>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your content here..."
                className="w-full min-h-[120px] max-h-[220px] text-base leading-relaxed bg-black-900/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
                rows={6}
              />
            </div>
            {/* Sharing Toggle */}
            <div className="rounded-2xl bg-black-800/60 border border-white/10 shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-teal-400" />
                  <div>
                    <label className="text-lg font-bold text-white">Share this blog</label>
                    <p className="text-sm text-white/60">Make this blog publicly accessible via link</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shared}
                    onChange={(e) => setShared(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-black-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>

            {/* Update Button OUTSIDE the card, aligned right */}
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl px-8 py-3 text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg h-fit"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="small" />
                ) : null}
                <span>{isSubmitting ? 'Updating Your Verse...' : 'Update Your Verse'}</span>
              </button>
            </div>
          </form>
          {/* Live Preview Section (right side on desktop, below on mobile) */}
          <div className="rounded-2xl bg-black-800/40 border border-white/10 shadow-lg p-6 lg:sticky lg:top-28 lg:self-start max-h-[340px] overflow-y-auto min-h-[220px] flex flex-col">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-xl">📖</span>
              <span>Live Preview</span>
            </h3>
            {title.trim() && (
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h2>
            )}
            {content.trim() ? (
              <div className="prose prose-invert max-w-none text-sm">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {content.substring(0, 180)}
                  {content.length > 180 && (
                    <span className="text-white/40 italic">... (preview truncated)</span>
                  )}
                </p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/40 italic text-sm">Let your muse guide your hand, and watch your words bloom...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog; 