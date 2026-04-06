import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Heart, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBadge from './TrustBadge';

const PetCard = ({ pet }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-[0_32px_64px_-16px_rgba(255,107,107,0.15)] transition-all duration-500 relative"
    >
      {/* Featured Badge */}
      {pet.is_boosted && (
        <div className="absolute top-6 left-6 z-20 bg-primary-amber text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl shadow-amber/20 flex items-center gap-2 tracking-widest">
          <Zap size={14} className="fill-white animate-pulse" /> FEATURED
        </div>
      )}
      
      {/* Like Button */}
      <motion.button 
        whileTap={{ scale: 0.8 }}
        className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl text-gray-400 hover:text-primary-coral shadow-lg hover:shadow-coral/20 transition-all flex items-center justify-center"
      >
        <Heart size={20} className="group-hover:fill-primary-coral transition-colors" />
      </motion.button>

      <Link to={`/pets/${pet.id}`} className="block">
        <div className="aspect-[4/5] relative overflow-hidden m-3 rounded-[32px]">
          <img 
            src={pet.image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop'} 
            alt={pet.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Bottom Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:translate-y-[-8px] transition-transform duration-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-[10px] font-black rounded-lg uppercase tracking-widest border border-white/20">
                {pet.category}
              </span>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{pet.breed}</span>
            </div>
            <h3 className="text-3xl font-black leading-tight">{pet.name}</h3>
          </div>

          {/* Quick Action Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white">
              <ArrowUpRight size={32} />
            </div>
          </div>
        </div>
        
        <div className="p-8 pt-2">
          <div className="flex justify-between items-center mb-6">
            <TrustBadge tier={pet.price > 15000 ? 'gold' : pet.price > 8000 ? 'silver' : 'bronze'} />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</span>
              <span className="text-2xl font-black text-primary-coral">₹{(pet.price || 0).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex items-center gap-3 text-gray-500 text-sm font-bold">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-coral">
                <MapPin size={18} />
              </div>
              {pet.location}
            </div>
            
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-primary-teal font-black text-xs uppercase tracking-widest"
            >
              Details <ArrowUpRight size={16} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PetCard;
