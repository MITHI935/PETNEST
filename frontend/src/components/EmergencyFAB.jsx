import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, AlertCircle, X, MapPin } from 'lucide-react';

const EmergencyFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyVets = [
    { name: 'City Pet ER 24/7', distance: '1.2 km', phone: '+91 98765 43210' },
    { name: 'Paws & Claws Emergency', distance: '3.4 km', phone: '+91 87654 32109' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 glass rounded-[32px] overflow-hidden shadow-2xl border border-red-500/20 bg-white/95 backdrop-blur-xl"
          >
            <div className="bg-red-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-black">
                <AlertCircle size={20} />
                EMERGENCY VETS
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {emergencyVets.map((vet, idx) => (
                <div key={idx} className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <h4 className="font-bold text-gray-900">{vet.name}</h4>
                  <div className="flex items-center gap-1 text-xs font-bold text-red-500 mb-3 mt-1">
                    <MapPin size={12} /> {vet.distance} away
                  </div>
                  <a 
                    href={`tel:${vet.phone.replace(/\s/g, '')}`}
                    className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/30"
                  >
                    <PhoneCall size={16} /> Call Now
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full shadow-[0_0_30px_rgba(239,68,68,0.5)] border-4 border-white"
      >
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20 group-hover:opacity-40" />
        {isOpen ? <X size={28} /> : <AlertCircle size={28} />}
        
        {!isOpen && (
          <span className="absolute right-20 bg-white text-red-500 px-4 py-2 rounded-xl font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Emergency SOS
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default EmergencyFAB;
