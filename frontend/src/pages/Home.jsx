import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool, BookOpen, Users, Zap, Sparkles, ArrowRight, Star, UserCircle, CheckCircle, Feather } from 'lucide-react';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Ava Carter',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'BlogSphere made me fall in love with writing again. The design is stunning and the experience is seamless!'
  },
  {
    name: 'Liam Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'I love the live preview and the beautiful UI. It feels like writing in a premium app.'
  },
  {
    name: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'The best blogging platform for creators who care about aesthetics and usability.'
  }
];

const steps = [
  {
    icon: <UserCircle className="w-8 h-8 text-teal-400" />, title: 'Sign Up', desc: 'Create your free account in seconds.'
  },
  {
    icon: <Feather className="w-8 h-8 text-sky-400" />, title: 'Write', desc: 'Craft beautiful blogs with our editor.'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />, title: 'Publish', desc: 'Share your thoughts with the world.'
  }
];

const featuredBlogs = [
  {
    title: 'How to Write a Viral Blog Post',
    author: 'Ava Carter',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    excerpt: 'Discover the secrets to writing content that spreads like wildfire across the internet.',
    color: 'from-teal-400 via-white to-white'
  },
  {
    title: 'The Art of Minimalist Writing',
    author: 'Liam Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    excerpt: 'Learn how to say more with less and captivate your readers with simplicity.',
    color: 'from-sky-400 via-white to-white'
  },
  {
    title: 'Building a Daily Writing Habit',
    author: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    excerpt: 'Tips and tricks to help you write every day and never run out of ideas.',
    color: 'from-cyan-400 via-white to-white'
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-950 via-black-900 to-black-950 relative overflow-x-hidden">
      {/* Layered Animated Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-black-950 to-black-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/20 via-white/20 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-br from-teal-400/20 via-white/20 to-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-conic from-teal-400/10 via-white/10 to-white/10 rounded-full blur-3xl"></div>
        {/* Floating glassmorphism shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-3xl blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10">
        {/* Hero Section (two-column with image) */}
        <section className="pt-32 pb-24 flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto px-4">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start md:items-start text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              BlogSphere
            </h1>
            <p className="text-lg md:text-2xl text-white/70 mb-12 max-w-xl font-normal">
              Your personal blogging universe to create, organize, and share your thoughts beautifully.
            </p>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-lg bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Get Started
              </Link>
            )}
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
              alt="Hand writing with pen"
              className="w-80 h-80 md:w-[32rem] md:h-[32rem] object-cover rounded-2xl shadow-2xl border-4 border-white/10 bg-white/5"
              style={{ transform: 'rotate(-8deg)' }}
            />
          </div>
        </section>
        {/* Featured Blogs Section (complex, dynamic cards) */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Blogs</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 overflow-visible px-2 md:px-8">
              {featuredBlogs.map((blog, idx) => (
                <div
                  key={idx}
                  className={`relative card bg-gradient-to-br ${blog.color} border-none shadow-glow p-8 pt-16 group hover:scale-105 transition-all duration-300`}
                  style={{ zIndex: 10 - idx, transform: `rotate(${idx === 1 ? '-2deg' : idx === 2 ? '2deg' : '0deg'})` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/30 border-4 border-white/40 shadow-lg flex items-center justify-center overflow-hidden">
                    <img src={blog.avatar} alt={blog.author} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className="text-xl font-bold text-black-900 mb-2 mt-8 line-clamp-2">{blog.title}</h3>
                  <p className="text-black-700 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-sm text-black-500 font-semibold">By {blog.author}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-white/0 rounded-full blur-2xl opacity-60 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* How it Works Section (overlapping cards) */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Get Started in 3 Steps</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`card bg-white/10 border-white/20 backdrop-blur-xl text-center flex flex-col items-center py-10 shadow-glow ${idx === 1 ? 'md:-mt-8 md:z-20' : ''}`}
                  style={{ transform: idx === 1 ? 'scale(1.05)' : 'scale(1)' }}
                >
                  <div className="mb-4">{step.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-white/80">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials Section (glassmorphism, animated) */}
        <section className="py-24 bg-black-900/30 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">What People Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="card bg-white/10 border-white/20 backdrop-blur-xl flex flex-col items-center text-center shadow-glow">
                  <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full border-4 border-teal-400 mb-4 object-cover shadow-lg" />
                  <p className="text-lg text-white/90 italic mb-4">“{t.quote}”</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold">{t.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;