import React, { useState } from 'react';
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

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Adoption', path: '/adoption' },
    { name: 'Food Store', path: '/store' },
    { name: 'Veterinarians', path: '/vets' },
  ];

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="glass shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary-coral rounded-xl group-hover:rotate-12 transition-transform">
              <PawPrint className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-coral to-primary-amber bg-clip-text text-transparent">
              PetNest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary-coral ${
                  location.pathname === link.path ? 'text-primary-coral' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/marketplace" className="p-2 text-gray-600 hover:text-primary-coral transition-colors hidden sm:block">
              <Search size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-primary-coral transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-coral text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-amber transition-colors relative group"
              aria-label="Toggle Bedtime Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
              {user ? (
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2 text-gray-600 hover:text-primary-coral transition-colors flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-primary-coral/10 rounded-full flex items-center justify-center text-primary-coral font-bold text-xs">
                    {user.email[0].toUpperCase()}
                  </div>
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="p-2 text-gray-600 hover:text-primary-coral transition-colors"
                >
                  <User size={20} />
                </Link>
              )}
              
              {showProfileMenu && user && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500">Pet Parent</p>
                  </div>
                  <Link 
                    to="/my-listings" 
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary-coral/10 hover:text-primary-coral transition-colors"
                  >
                    <List size={16} /> My Pet Hub
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary-teal/10 hover:text-primary-teal transition-colors"
                    >
                      <LayoutDashboard size={16} /> Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      signOut();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)} 
              className="md:hidden p-2 text-gray-600"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`block px-4 py-3 rounded-2xl font-black text-lg transition-all ${
                    location.pathname === link.path 
                    ? 'bg-primary-coral/10 text-primary-coral' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link 
                  to="/login" 
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 font-bold border-t border-gray-50 pt-4"
                >
                  <User size={20} /> Sign In
                </Link>
              )}
              <div className="pt-4 border-t border-gray-100">
                <Link 
                  to="/marketplace" 
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 font-bold"
                >
                  <Search size={20} /> Search Pets
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
