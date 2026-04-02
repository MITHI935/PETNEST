import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import appointmentService from '../services/appointmentService';
import toast from 'react-hot-toast';

const BookingModal = ({ vet, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pet_parent_name: '', // Removed placeholder
    pet_name: '',
    phone: '',
    appointment_date: '',
    appointment_time: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const appointmentData = {
        ...formData,
        vet_id: vet.id,
        status: 'pending'
      };
      await appointmentService.createAppointment(appointmentData);
      setSuccess(true);
      toast.success('Appointment requested successfully!');
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      toast.error('Failed to schedule appointment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-gray-900">Booked!</h2>
                <p className="text-gray-500 font-medium">Your appointment with {vet.name} has been requested.</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Book Appointment</h2>
                    <p className="text-sm text-primary-coral font-bold">with {vet.name}</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pet Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. Buddy"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold text-sm transition-all"
                          value={formData.pet_name}
                          onChange={(e) => setFormData({...formData, pet_name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input 
                          required
                          type="tel" 
                          placeholder="Mobile No."
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold text-sm transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input 
                          required
                          type="date" 
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold text-sm transition-all"
                          value={formData.appointment_date}
                          onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <select 
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold text-sm transition-all appearance-none"
                          value={formData.appointment_time}
                          onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                        >
                          <option value="">Select Time</option>
                          {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                            <option key={t} value={t}>{t} AM</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reason for Visit</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-300" size={16} />
                      <textarea 
                        rows="3"
                        placeholder="Briefly describe the issue..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold text-sm transition-all resize-none"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 bg-primary-coral text-white rounded-2xl font-black text-lg shadow-xl shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? 'Booking...' : 'Confirm Appointment'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
