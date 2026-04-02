import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
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
      toast.success('Order placed successfully!');
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-primary-teal text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CreditCard size={40} />
          </motion.div>
        </motion.div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-500 mb-10">Your furry friend&apos;s goodies are on their way. You&apos;ll receive a confirmation SMS shortly.</p>
        <Link to="/store" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-coral text-white rounded-2xl font-bold shadow-lg shadow-coral/20 hover:scale-105 transition-all">
          Continue Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black text-gray-900 mb-10">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 glass rounded-[40px] border-2 border-dashed border-gray-100">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link to="/store" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-coral text-white rounded-2xl font-bold hover:scale-105 transition-all">
            Go to Store <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="glass p-4 sm:p-6 rounded-3xl border border-white/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-2xl flex-shrink-0 p-2">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-primary-teal text-xs sm:text-sm font-bold uppercase">{item.brand}</p>
                </div>
                
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 sm:p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus size={14} sm:size={16} />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-bold text-sm sm:text-base">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 sm:p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus size={14} sm:size={16} />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[80px] sm:min-w-[100px]">
                    <p className="font-bold text-base sm:text-lg text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">₹{item.price}/ea</p>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} sm:size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/50 sticky top-24">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex justify-between text-gray-500 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm sm:text-base">
                  <span>Delivery</span>
                  <span className="text-primary-teal font-bold uppercase text-xs">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-3 sm:pt-4 flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold">Total</span>
                  <span className="text-xl sm:text-2xl font-black text-primary-coral">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-5 bg-dark-text text-white rounded-2xl font-bold shadow-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {checkingOut ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Checkout Now <CreditCard size={20} /></>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                <CreditCard size={12} /> Secure encrypted payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
