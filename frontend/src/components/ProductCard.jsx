import React from 'react';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ParticleClick from './ParticleClick';

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '20px',
        background: '#333',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative bg-white rounded-[32px] p-4 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-primary-teal/10 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-gray-50/50 rounded-[24px] overflow-hidden mb-5">
        <motion.img 
          src={product.image_url || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-teal shadow-xl"
          >
            <Eye size={20} />
          </motion.div>
        </div>

        {/* Brand Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md border border-white text-[10px] font-black text-primary-teal rounded-full shadow-sm tracking-wider uppercase">
            {product.brand}
          </span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="space-y-3 px-1">
        <h3 className="text-lg font-black text-gray-900 group-hover:text-primary-teal transition-colors line-clamp-2 leading-tight h-12">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
          </div>
          
          <ParticleClick>
            <motion.button 
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-primary-coral text-white rounded-[20px] shadow-2xl shadow-coral/30 flex items-center justify-center group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
              <Plus size={24} strokeWidth={3} />
            </motion.button>
          </ParticleClick>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
