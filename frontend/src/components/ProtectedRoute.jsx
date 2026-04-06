import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Key, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('adminAuth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate a brief check for better UX feel
    setTimeout(() => {
      // SET YOUR ADMIN PASSWORD HERE
      if (password === 'Mithinga#2025') {
        sessionStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
        toast.success('Access Granted. Welcome, Admin!', {
            icon: '🛡️',
            style: { borderRadius: '20px', fontWeight: 'bold' }
        });
      } else {
        setError(true);
        toast.error('Invalid Admin Credentials');
        setPassword('');
        setTimeout(() => setError(false), 1000);
      }
      setLoading(false);
    }, 800);
  };

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-coral/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-teal/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="glass p-10 sm:p-14 rounded-[48px] border border-white/60 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] max-w-md w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ rotate: -20, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-tr from-primary-coral to-primary-amber text-white rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-coral/20"
        >
          <ShieldCheck size={48} />
        </motion.div>
        
        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Admin Vault</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          This area is encrypted. Please provide your master key to unlock the dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Master Password</label>
            <div className={`relative group transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-coral transition-colors">
                <Key size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full pl-14 pr-6 py-5 bg-white/50 border-2 ${error ? 'border-red-500 bg-red-50/50' : 'border-transparent'} focus:border-primary-coral rounded-[24px] outline-none font-bold transition-all shadow-inner`}
                autoFocus
              />
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-gray-900 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-gray-900/20 hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Unlock Dashboard <ArrowRight size={22} />
              </>
            )}
          </motion.button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-gray-100/50 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
            System Secured & Encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;
