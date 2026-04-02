import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleClick from './ParticleClick';
import BookingModal from './BookingModal';

const VetCard = ({ vet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-5 flex flex-col sm:flex-row gap-6 card-hover group"
    >
      <div className="relative flex-shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md">
          <img 
            src={vet.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop'} 
            alt={vet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {vet.is_verified && (
          <div className="absolute -top-2 -right-2 bg-primary-teal text-white p-1 rounded-full shadow-lg border-2 border-white">
            <CheckCircle size={16} fill="white" className="text-primary-teal" />
          </div>
        )}
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-coral transition-colors">{vet.name}</h3>
            <p className="text-primary-coral font-medium text-sm italic">{vet.specialization}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-sm font-bold">
            <Star size={14} fill="currentColor" /> {vet.rating}
          </div>
        </div>
        
        <p className="text-gray-600 font-medium text-sm flex items-center gap-1">
          <span className="font-bold text-gray-800">{vet.clinic_name}</span>
        </p>

        <p className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin size={14} /> {vet.location}
        </p>

        <div className="pt-4 flex gap-3">
          <ParticleClick>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary-coral text-white rounded-xl font-bold shadow-lg shadow-coral/20 hover:bg-opacity-90 transition-all hover:scale-[1.02]"
            >
              Book Appointment
            </button>
          </ParticleClick>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 border border-gray-100 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            View Profile
          </button>
        </div>
      </div>

      <BookingModal 
        vet={vet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default VetCard;
