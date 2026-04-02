import React from 'react';
import { ShieldCheck, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const getBadgeDetails = (tier) => {
  switch (tier) {
    case 'gold':
      return { 
        icon: <Award size={16} className="text-yellow-100" fill="currentColor" />, 
        label: 'Gold Crown Seller', 
        colors: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300'
      };
    case 'silver':
      return { 
        icon: <ShieldCheck size={16} className="text-gray-100" fill="currentColor" />, 
        label: 'Verified Breeder', 
        colors: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-300'
      };
    case 'bronze':
    default:
      return { 
        icon: <Star size={16} className="text-amber-700" fill="currentColor" />, 
        label: 'Trusted Parent', 
        colors: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 border-amber-300'
      };
  }
};

const TrustBadge = ({ tier = 'bronze' }) => {
  const { icon, label, colors } = getBadgeDetails(tier);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm border ${colors} relative overflow-hidden group select-none`}
    >
      <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out" />
      {icon}
      {label}
    </motion.div>
  );
};

export default TrustBadge;
