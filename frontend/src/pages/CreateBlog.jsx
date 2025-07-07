import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Save, ArrowLeft, FileText, Type, BookOpen, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shared, setShared] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createBlog } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }
    setIsSubmitting(true);
    const blog = await createBlog({
      title: title.trim(),
      content: content.trim(),
      shared,
    });
    if (blog) {
      toast.success('Blog created successfully!');
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-900/20 via-emerald-900/20 to-green-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-teal-400/10 via-emerald-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-teal-400/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-emerald-400/50 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-green-400/60 rounded-full animate-pulse"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
        {/* Hero/Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-4">Create a New Blog</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Share your story with the world. Fill in the details below and let your creativity flow!</p>
          <div className="w-full text-center text-xs text-white/60 italic mt-4">Thoughts staged. Emotions pushed.</div>
        </div>
        {/* Main Content: Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-8">
            {/* Title Input */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
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
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
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
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
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
            {/* Publish Button OUTSIDE the card, aligned right */}
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl px-8 py-3 text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg h-fit"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="small" />
                ) : null}
                <span>{isSubmitting ? 'Sending to the Garden...' : 'Release Your Verse'}</span>
              </button>
            </div>
          </form>
          {/* Live Preview Section (right side on desktop, below on mobile) */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 lg:sticky lg:top-28 lg:self-start max-h-[340px] overflow-y-auto min-h-[220px] flex flex-col">
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
      {/* <Footer/> */}
    </div>
  );
};

export default CreateBlog;