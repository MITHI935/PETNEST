import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, CreditCard, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import orderService from '../services/orderService';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckingOut(true);
    
    try {
      const orderData = {
        items: cart,
        total_amount: cartTotal,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      
      await orderService.createOrder(orderData);
      setOrderComplete(true);
      clearCart();
      toast.success('Order placed successfully!', { icon: '🎉' });
    } catch (err) {
      toast.error('Checkout failed. Please try again.');
      console.error(err);
    } finally {
      setCheckingOut(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-32 h-32 bg-primary-teal text-white rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-teal/30 rotate-12"
        >
          <CreditCard size={48} />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-gray-900 mb-4 tracking-tight"
        >
          Order Placed Successfully!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-10 text-lg font-medium"
        >
          Your furry friend&apos;s goodies are on their way. You&apos;ll receive a confirmation SMS shortly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/store" className="inline-flex items-center gap-3 px-10 py-5 bg-primary-coral text-white rounded-full font-black text-lg shadow-xl shadow-coral/30 hover:scale-105 hover:shadow-2xl transition-all">
            Continue Shopping <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <ShoppingBag size={32} className="text-gray-900 dark:text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Your Cart</h1>
      </motion.div>
      
      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-[48px] border-2 border-dashed border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-7xl mb-8"
          >
            🛒
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Your cart is feeling lonely</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg max-w-md mx-auto">Fill it with treats, toys, and love for your furry companion.</p>
          <Link to="/store" className="inline-flex items-center gap-3 px-10 py-5 bg-primary-coral text-white rounded-full font-black text-lg hover:scale-105 shadow-xl shadow-coral/20 transition-all">
            Explore Store <ArrowRight size={20} />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/20 dark:shadow-none flex flex-col sm:flex-row items-center gap-6 mb-6 relative group"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 dark:bg-gray-700/50 rounded-2xl flex-shrink-0 p-4 relative overflow-hidden">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left w-full">
                    <p className="text-primary-teal text-xs font-black uppercase tracking-widest mb-1">{item.brand}</p>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight pr-0 sm:pr-8">{item.name}</h3>
                    <p className="text-gray-400 text-sm font-bold">₹{item.price.toLocaleString()} each</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end justify-between h-full w-full sm:w-auto gap-6 sm:gap-0 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 dark:border-gray-700 sm:border-0">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute sm:relative top-6 sm:top-0 right-6 sm:right-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                    
                    <div className="flex items-center justify-between sm:justify-end w-full gap-6">
                      <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full p-1 border border-gray-100 dark:border-gray-600">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-black text-gray-900 dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <p className="font-black text-xl text-primary-coral">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 dark:bg-gray-800 text-white p-8 sm:p-10 rounded-[40px] sticky top-32 shadow-2xl shadow-gray-900/20"
            >
              <h3 className="text-2xl font-black mb-8">Summary</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-white font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Delivery</span>
                  <span className="text-primary-teal font-black uppercase tracking-wider">Free</span>
                </div>
                
                <div className="border-t border-gray-700/50 pt-6 mt-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="block text-gray-400 text-sm font-bold mb-1">Total Amount</span>
                      <span className="text-3xl font-black text-primary-coral">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-5 bg-white text-gray-900 rounded-[24px] font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
              >
                {checkingOut ? (
                  <div className="w-6 h-6 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                ) : (
                  <>Proceed to Pay <ArrowRight size={20} /></>
                )}
              </motion.button>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 font-bold tracking-wide uppercase">
                <CreditCard size={14} /> 100% Secure Checkout
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
