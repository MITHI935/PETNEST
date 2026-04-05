import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProtectedRoute = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-coral" size={48} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-[40px] border border-white/50 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ShieldAlert size={40} />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 font-medium mb-8">
            You don't have administrative privileges. Please contact the administrator.
          </p>
          
          <Navigate to="/" replace />
        </motion.div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
