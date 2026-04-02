import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Key, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('adminAuth') === 'true'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded password for now. In a real app, this should be an env var or API call.
    if (password === 'Mithinga#2025') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      toast.success('Welcome back, Admin!');
    } else {
      setError(true);
      toast.error('Invalid password!');
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[40px] border border-white/50 shadow-2xl max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-primary-coral/10 text-primary-coral rounded-3xl flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={40} />
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-2">Restricted Area</h2>
        <p className="text-gray-500 font-medium mb-8">Please enter the admin password to continue.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-coral transition-colors">
              <Key size={20} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-primary-coral rounded-2xl outline-none font-bold transition-all`}
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-4 bg-primary-coral text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Lock size={20} /> Access Dashboard
          </button>
        </form>
        
        <p className="mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
          Authorized Personnel Only
        </p>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;
