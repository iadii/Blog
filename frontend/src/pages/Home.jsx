import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool, BookOpen, Users, Zap, Sparkles, ArrowRight, Star, UserCircle, CheckCircle, Feather } from 'lucide-react';
import Footer from '../components/Footer';

const testimonials = [
  {
    name: 'Ava Carter',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Serenade & Ink rekindled my muse—each word a dance, each page a gentle dawn. Here, my heart finds its melody.'
  },
  {
    name: 'Liam Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'To write here is to paint with moonlight. The beauty of the ink and the ease of the flow—pure poetry in motion.'
  },
  {
    name: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'A haven for dreamers—Serenade & Ink is where my stories bloom on wings of wonder.'
  }
];

const steps = [
  {
    icon: <UserCircle className="w-8 h-8 text-teal-400" />, 
    title: 'Whisper Your Name', 
    desc: 'Let your soul sign in, and the garden will know you.'
  },
  {
    icon: <Feather className="w-8 h-8 text-sky-400" />, 
    title: 'Weave Your Verse', 
    desc: 'Spin your tales, let your thoughts flow like gentle streams of ink.'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-400" />, 
    title: 'Release to the Garden', 
    desc: 'Send your words into the gentle night, where kindred spirits await.'
  }
];

const featuredBlogs = [
  {
    title: 'The Alchemy of Viral Verse',
    author: 'Ava Carter',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    excerpt: 'Unveil the sacred dance of words that ripple through hearts and echo across distant shores, where every syllable becomes a flower.',
    color: 'from-teal-400 via-white to-white'
  },
  {
    title: 'Whispers of Minimalist Grace',
    author: 'Liam Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    excerpt: 'Let silence and simplicity cradle your every phrase—where less becomes more, and every breath between words speaks volumes.',
    color: 'from-sky-400 via-white to-white'
  },
  {
    title: 'The Sacred Ritual of Daily Creation',
    author: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    excerpt: 'Let the dawn greet your pen, and let habit become your muse\'s gentle hand, guiding you through the garden of inspiration.',
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
              Serenade & Ink
            </h1>
            <p className="text-lg md:text-2xl text-white/70 mb-12 max-w-xl font-normal">
              Where every thought is a flower, and every story a song—compose your garden, let your words bloom and belong.
            </p>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-lg bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Enter Your Sanctuary
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Begin Your Serenade
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
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Verses</h2>
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
                    <span className="text-sm text-black-500 font-semibold">Penned by {blog.author}</span>
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
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Compose in Three Heartbeats</h2>
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
        {/* Testimonials Section (poetic) */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Echoes from Fellow Dreamers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white/10 border-white/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center text-center shadow-glow">
                  <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-teal-400/40" />
                  <blockquote className="text-white/80 italic mb-4">"{t.quote}"</blockquote>
                  <span className="text-white/60 font-semibold">— {t.name}</span>
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