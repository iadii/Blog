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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-bold text-white hover:opacity-80 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent font-bold tracking-tight">Serenade Ink</span>
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
                  className="w-12 h-12 rounded-full border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden shadow-lg bg-gradient-to-br from-teal-600/20 to-emerald-600/20 backdrop-blur-sm flex items-center justify-center"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-label="User menu"
                >
                  <img
                    src={user?.picture || '/default-avatar.png'}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 text-teal-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/create"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <PenTool className="w-5 h-5 text-teal-400" />
                      <span>Create</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all duration-200 mx-2 rounded-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 text-teal-400" />
                      <span>Dashboard</span>
                    </Link>
                    <div className="border-t border-white/10 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-all duration-200 mx-2 rounded-xl"
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
                className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            {isAuthenticated ? (
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3 mb-4">
                  <button
                    className="w-12 h-12 rounded-full border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400/50 overflow-hidden shadow-lg bg-gradient-to-br from-teal-600/20 to-emerald-600/20 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setDropdownOpen((open) => !open)}
                    aria-label="User menu"
                  >
                    <img
                      src={user?.picture || '/default-avatar.png'}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <div className="text-left">
                    <p className="text-white font-medium text-lg">{user?.name}</p>
                    <p className="text-gray-400 text-sm">Welcome back!</p>
                  </div>
                </div>
                {/* Mobile Menu Links */}
                <div className="w-full space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-200 rounded-xl w-full"
                    onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  >
                    <UserCircle className="w-5 h-5 text-teal-400" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/create"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-200 rounded-xl w-full"
                    onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  >
                    <PenTool className="w-5 h-5 text-teal-400" />
                    <span>Create</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-200 rounded-xl w-full"
                    onClick={() => { setDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  >
                    <LayoutDashboard className="w-5 h-5 text-teal-400" />
                    <span>Dashboard</span>
                  </Link>
                  <div className="border-t border-white/10 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-all duration-200 rounded-xl"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                   to="/login"
                   className="block w-full text-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-6 py-3 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;