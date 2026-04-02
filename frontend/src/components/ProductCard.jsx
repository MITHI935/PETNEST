import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import ParticleClick from './ParticleClick';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass rounded-[32px] overflow-hidden group border border-white/40 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary-teal/10 bg-white/80 backdrop-blur-md cursor-pointer"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
        />
      </div>
      
      <div className="p-5">
        <div className="mb-1 text-xs font-bold text-primary-teal tracking-wider uppercase">{product.brand}</div>
        <h3 className="text-base font-bold text-gray-900 group-hover:text-primary-coral transition-colors line-clamp-2 h-12 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <ParticleClick>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-2.5 bg-primary-coral text-white rounded-xl shadow-lg hover:bg-opacity-90 transition-all hover:scale-110 active:scale-95"
            >
              <ShoppingCart size={18} />
            </button>
          </ParticleClick>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
