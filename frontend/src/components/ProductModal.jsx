import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Info, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ParticleClick from './ParticleClick';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [dogSize, setDogSize] = useState(50); // 1 to 100
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const dogScale = 0.5 + (dogSize / 100) * 1.5; // Scale from 0.5x to 2.0x
  
  const getDogSizeLabel = () => {
    if (dogSize < 33) return 'Small (e.g. Pug)';
    if (dogSize < 66) return 'Medium (e.g. Beagle)';
    return 'Large (e.g. Golden Retriever)';
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Left: Size Visualizer Magic */}
          <div className="md:w-1/2 bg-slate-50 dark:bg-gray-900 p-8 flex flex-col items-center justify-center relative overflow-hidden border-r border-gray-100 dark:border-gray-700">
            <h3 className="absolute top-8 left-8 text-2xl font-black text-gray-900 dark:text-white">Will it fit?</h3>
            <p className="absolute top-16 left-8 text-gray-500 font-medium">Interactive Size Visualizer</p>
            
            <div className="relative w-full aspect-square flex items-end justify-center pb-12">
              {/* The Product Context */}
              <div className="relative z-10 w-1/2 mt-10">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-auto drop-shadow-2xl object-contain rounded-2xl"
                />
              </div>

              {/* The Dynamic Dog Silhouette */}
              <motion.div 
                className="absolute bottom-12 right-1/4 opacity-30 dark:opacity-40 origin-bottom pointer-events-none"
                animate={{ scale: dogScale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* SVG Silhouette of a standing dog */}
                <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor" className="text-slate-800 dark:text-slate-200">
                  <path d="M85 45c-2-8-6-15-12-18-4-2-8-3-12-3-5 0-10 2-14 5l-12 10-6 2c-3 1-6 2-9 4-3 1-5 4-6 7 0 4 2 8 5 10l4 3c0 8-1 16-3 23-1 3 0 6 3 8 2 1 5 1 8 0 2-1 3-3 4-5 1-4 2-8 3-12 4 1 8 3 13 4 5 1 10 2 15 2 7 0 13-1 18-4 4-2 7-6 8-10 1-5 1-10 1-15 0-5-2-9-5-12z"/>
                  <circle cx="75" cy="35" r="4" fill="white" />
                </svg>
              </motion.div>
            </div>

            {/* Visualizer Controls */}
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-[24px] shadow-xl border border-gray-100 dark:border-gray-700 z-20">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-gray-500">Your Pet's Size</span>
                <span className="text-sm font-black text-primary-coral">{getDogSizeLabel()}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={dogSize}
                onChange={(e) => setDogSize(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-coral"
              />
              <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                <span>Toy Size</span>
                <span>Giant Breed</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & CTA */}
          <div className="md:w-1/2 p-8 md:p-12 relative bg-white dark:bg-gray-800">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500 dark:text-gray-300" />
            </button>

            <div className="flex flex-col h-full justify-center">
              <div className="mb-2">
                <span className="px-3 py-1 bg-primary-teal/10 text-primary-teal font-black text-xs rounded-lg uppercase tracking-wider">
                  {product.category || 'Accessory'}
                </span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{product.name}</h2>
              <div className="text-3xl font-black text-primary-coral mb-6">₹{product.price.toLocaleString()}</div>
              
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed mb-8">
                {product.description || 'Premium quality product designed specifically for the comfort and well-being of your beloved furry friend. Durable, safe, and beautifully crafted.'}
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl flex items-start gap-3 mb-10 border border-blue-100 dark:border-blue-800">
                <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Use the size visualizer on the left to ensure this product is the perfect fit for your pet before ordering.
                </p>
              </div>

              <div className="mt-auto">
                <ParticleClick>
                  <button 
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`w-full py-4 rounded-[20px] font-black text-white text-lg flex items-center justify-center gap-3 transition-all ${
                      added ? 'bg-green-500' : 'bg-primary-coral hover:bg-opacity-90 hover:scale-[1.02] shadow-xl shadow-coral/30'
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckCircle2 size={24} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={24} /> Add to Cart Now
                      </>
                    )}
                  </button>
                </ParticleClick>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
