import { useState, useRef, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool, User, LogOut, Menu, X, BookOpen, UserCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    ...(isAuthenticated ? [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/create', label: 'Create', icon: PenTool },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black-900/70 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-extrabold text-white drop-shadow-glow hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 bg-black-950 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-teal-400 drop-shadow-glow" />
            </div>
            <span className="tracking-tight">BlogSphere</span>
          </Link>

          {/* Center nav links (optional) */}
          {/* <div className="hidden md:flex gap-8 text-white/80 font-medium text-lg">
            <Link to="/" className="hover:text-teal-400 transition">Home</Link>
            <Link to="/explore" className="hover:text-teal-400 transition">Explore</Link>
            <Link to="/about" className="hover:text-teal-400 transition">About</Link>
          </div> */}

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="w-12 h-12 rounded-full border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden shadow bg-black-800 flex items-center justify-center"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-label="User menu"
                >
                  <img
                    src={user?.picture || '/default-avatar.png'}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                    referrerPolicy="no-referrer"
                  />
                </button>
                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-black-950/95 border border-white/10 rounded-2xl shadow-2xl py-3 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 text-teal-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/create"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <PenTool className="w-5 h-5 text-teal-400" />
                      <span>Create</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 text-teal-400" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors rounded-xl"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl text-white hover:bg-black-800/50 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            {isAuthenticated ? (
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    className="w-12 h-12 rounded-full border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400/30 overflow-hidden shadow bg-black-800 flex items-center justify-center"
                    onClick={() => setDropdownOpen((open) => !open)}
                    aria-label="User menu"
                  >
                    <img
                      src={user?.picture || '/default-avatar.png'}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <div className="text-left">
                    <p className="text-white font-medium text-lg">{user?.name}</p>
                  </div>
                </div>
                {/* Dropdown for mobile */}
                {dropdownOpen && (
                  <div className="w-full bg-black-900 border border-white/10 rounded-2xl shadow-2xl py-3 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                    >
                      <UserCircle className="w-5 h-5 text-teal-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/create"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                    >
                      <PenTool className="w-5 h-5 text-teal-400" />
                      <span>Create</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-black-800/60 transition-colors rounded-xl"
                      onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                    >
                      <LayoutDashboard className="w-5 h-5 text-teal-400" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors rounded-xl"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold text-lg shadow hover:bg-teal-400 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;