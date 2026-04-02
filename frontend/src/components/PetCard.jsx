import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadge from './TrustBadge';

const PetCard = ({ pet }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass rounded-[32px] overflow-hidden group relative border border-white/40 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary-coral/10 bg-white/80 backdrop-blur-md"
    >
      {pet.is_boosted && (
        <div className="absolute top-5 left-5 z-20 bg-primary-amber text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider">
          <Zap size={12} className="fill-white" /> FEATURED
        </div>
      )}
      
      <motion.button 
        whileTap={{ scale: 0.8 }}
        className="absolute top-5 right-5 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-400 hover:text-primary-coral shadow-sm hover:shadow-md transition-all"
      >
        <Heart size={20} className="group-hover:fill-primary-coral transition-colors" />
      </motion.button>

      <Link to={`/pets/${pet.id}`}>
        <div className="aspect-[4/5] relative overflow-hidden rounded-[28px] m-2">
          <img 
            src={pet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop'} 
            alt={pet.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Micro-interaction: Tail Wag Icon */}
          <motion.div 
            className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            animate={{ rotate: [0, -20, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          >
            <div className="bg-primary-coral/90 p-2 rounded-xl backdrop-blur-md">
              <span className="text-lg">🐶</span>
            </div>
          </motion.div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-primary-teal/10 text-primary-teal text-[10px] font-black rounded-md uppercase tracking-widest">
                  {pet.category}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{pet.breed}</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-2">{pet.name}</h3>
              <TrustBadge tier={pet.price > 15000 ? 'gold' : pet.price > 8000 ? 'silver' : 'bronze'} />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Price</div>
              <span className="text-2xl font-black text-primary-coral">₹{(pet.price || 0).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <MapPin size={14} />
              </div>
              {pet.location}
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-coral group-hover:bg-primary-coral group-hover:text-white transition-colors"
            >
              <Zap size={18} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetCard;
