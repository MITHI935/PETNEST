import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, PawPrint, Search, Menu, User, LayoutDashboard, List, Settings, Moon, Sun, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cart } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Adoption', path: '/adoption' },
    { name: 'Food Store', path: '/store' },
    { name: 'Veterinarians', path: '/vets' },
  ];

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-2.5 bg-primary-coral rounded-[14px] shadow-lg shadow-coral/20"
            >
              <PawPrint className="text-white" size={24} />
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary-coral to-primary-amber bg-clip-text text-transparent tracking-tight">
              PetNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 font-bold text-sm transition-colors rounded-full ${
                    isActive ? 'text-primary-coral' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary-coral/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 z-50">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/marketplace" className="p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
                <Search size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/cart" className="p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative flex items-center justify-center">
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-primary-coral text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-900 shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            {/* User Profile Dropdown */}
            <div className="relative">
              {user ? (
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-1 border-2 border-transparent hover:border-primary-coral rounded-full transition-all"
                >
                  <div className="w-9 h-9 bg-gradient-to-tr from-primary-coral to-primary-amber rounded-full flex items-center justify-center text-white font-black text-sm shadow-md">
                    {user.email[0].toUpperCase()}
                  </div>
                </motion.button>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login"
                    className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <User size={16} /> <span className="hidden sm:inline">Sign In</span>
                  </Link>
                </motion.div>
              )}
              
              <AnimatePresence>
                {showProfileMenu && user && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 py-3 z-50 overflow-hidden"
                  >
                    <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-700/50 mb-2 bg-gray-50/50 dark:bg-gray-800/50">
                      <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.email}</p>
                      <p className="text-xs font-bold text-primary-coral uppercase tracking-wider mt-1">Pet Parent</p>
                    </div>
                    <Link 
                      to="/my-listings" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-primary-coral/10 hover:text-primary-coral transition-colors"
                    >
                      <List size={18} /> My Pet Hub
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-primary-teal/10 hover:text-primary-teal transition-colors"
                      >
                        <LayoutDashboard size={18} /> Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        signOut();
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left mt-2 border-t border-gray-50 dark:border-gray-700/50 pt-3"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileMenu(!showMobileMenu)} 
              className="md:hidden p-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-full ml-1"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-y-auto z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setShowMobileMenu(false)}
                    className={`block px-6 py-4 rounded-3xl font-black text-2xl transition-all ${
                      location.pathname === link.path 
                      ? 'bg-primary-coral/10 text-primary-coral' 
                      : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { toggleTheme(); setShowMobileMenu(false); }}
                  className="flex flex-col items-center justify-center gap-2 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
                >
                  {isDarkMode ? <Sun size={24} className="text-primary-amber" /> : <Moon size={24} className="text-primary-teal" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link 
                  to="/marketplace" 
                  onClick={() => setShowMobileMenu(false)}
                  className="flex flex-col items-center justify-center gap-2 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold"
                >
                  <Search size={24} className="text-primary-coral" />
                  Search
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
