import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool, Feather, ArrowRight, Star, Heart, Globe, Users, Award, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
  {
    icon: <PenTool className="w-8 h-8" />,
    title: 'Elegant Writing',
    description: 'Craft beautiful stories with our distraction-free editor',
    gradient: 'from-teal-400 to-emerald-400'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Reach',
    description: 'Share your voice with readers around the world',
    gradient: 'from-emerald-400 to-green-400'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community',
    description: 'Connect with fellow writers and passionate readers',
    gradient: 'from-green-400 to-teal-400'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Recognition',
    description: 'Get discovered and build your writing reputation',
    gradient: 'from-teal-500 to-cyan-400'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Travel Blogger',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=150&h=150&facepad=2',
    quote: 'commitKaro() transformed how I share my adventures. The platform is intuitive and my stories reach more readers than ever.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Tech Writer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'The clean interface lets me focus on what matters - writing great content. My productivity has increased dramatically.',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Fiction Author',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'I\'ve found my writing community here. The feedback and support from other writers is incredible.',
    rating: 5
  }
];

const stats = [
  { number: '50K+', label: 'Active Writers' },
  { number: '1M+', label: 'Stories Published' },
  { number: '10M+', label: 'Monthly Readers' },
  { number: '95%', label: 'User Satisfaction' }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-teal-200 to-emerald-200 bg-clip-text text-transparent mb-6 animate-fade-in">
                commitKaro()
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up">
                Where stories come alive and voices find their stage. Create, share, and discover extraordinary narratives in our beautiful writing sanctuary.
              </p>
              
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Writing
                      <PenTool className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Hero Image/Visual */}
            <div className="relative max-w-4xl mx-auto animate-fade-in">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                    <Feather className="w-8 h-8 text-teal-300 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Rich Editor</h3>
                    <p className="text-gray-300 text-sm">Beautiful, distraction-free writing experience</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                    <Users className="w-8 h-8 text-emerald-300 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Community</h3>
                    <p className="text-gray-300 text-sm">Connect with passionate readers and writers</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                    <TrendingUp className="w-8 h-8 text-green-300 mb-4" />
                    <h3 className="text-white font-semibold mb-2">Analytics</h3>
                    <p className="text-gray-300 text-sm">Track your story's performance and reach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose commitKaro()?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover the tools and community that will elevate your writing to new heights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Loved by Writers</h2>
              <p className="text-xl text-gray-300">See what our community has to say</p>
              
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/20"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-300 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-teal-600/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Share Your Story?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join writers who have found their voice on commitKaro(). Your audience is waiting.
              </p>
              
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              )}
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