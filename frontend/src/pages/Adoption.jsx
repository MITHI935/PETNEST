import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Search, ArrowRight, User, CheckCircle, X, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import petService from '../services/petService';
import appointmentService from '../services/appointmentService';
import Skeleton from '../components/Skeleton';
import MapComponent from '../components/MapComponent';
import { useDebounce } from '../hooks/useDebounce';

const Adoption = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('adopt'); // 'adopt', 'meet', or 'map'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Meeting form state
  const [meetingForm, setMeetingForm] = useState({
    user_name: '',
    pet_name: 'Luna (Indie Mix)',
    date: '',
    time: 'Morning (10 AM - 12 PM)',
    status: 'pending'
  });

  // Fetch Pets Query
  const { data: pets = [], isLoading: loading, error } = useQuery({
    queryKey: ['pets', { search: debouncedSearch, category: 'rescue' }],
    queryFn: async () => {
      let data = await petService.getAllPets({ 
        search: debouncedSearch,
        category: 'rescue' 
      });
      
      if (!data || data.length === 0) {
        data = await petService.getAllPets({ search: debouncedSearch });
      }
      return data || [];
    },
    enabled: activeTab === 'adopt' || activeTab === 'map',
  });

  // Create Appointment Mutation
  const appointmentMutation = useMutation({
    mutationFn: (newAppointment) => appointmentService.createAppointment(newAppointment),
    onSuccess: () => {
      toast.success('Success!');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) => {
      toast.error('Operation failed. Please try again.');
      console.error(err);
    }
  });

  const handleMeetingFormChange = (e) => {
    const { name, value } = e.target;
    setMeetingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSwipe = async (direction) => {
    if (direction === 'right') {
      const currentPet = pets[currentIndex];
      appointmentMutation.mutate({
        user_name: 'Interested Adopter',
        pet_name: currentPet.name,
        date: new Date().toISOString().split('T')[0],
        time: 'N/A (Swipe Interest)',
        status: 'swipe_interest'
      }, {
        onSuccess: () => {
          toast.success(`Interest sent for ${currentPet.name}!`, {
            icon: '🐶',
            style: { borderRadius: '16px', fontWeight: 'bold' }
          });
        }
      });
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleBookMeeting = async (e) => {
    e.preventDefault();
    if (!meetingForm.user_name || !meetingForm.date) {
      return toast.error('Please fill in all required fields');
    }

    appointmentMutation.mutate(meetingForm, {
      onSuccess: () => {
        toast.success('Meeting request sent! The shelter will contact you soon.');
        setMeetingForm({
          user_name: '',
          pet_name: 'Luna (Indie Mix)',
          date: '',
          time: 'Morning (10 AM - 12 PM)',
          status: 'pending'
        });
        setActiveTab('adopt');
      }
    });
  };

  if (error) {
    toast.error('Failed to load adoptable pets');
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full">
      {/* Background Image with Transparency */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/adoption-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15 
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="text-center mb-8 sm:mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-black text-gray-900 mb-4"
        >
          Find Your <span className="text-primary-coral">Soulmate</span>
        </motion.h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Every pet deserves a loving home. Swipe or explore the map to find your perfect match.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
        <button
          onClick={() => setActiveTab('adopt')}
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all text-sm sm:text-base ${
            activeTab === 'adopt' 
            ? 'bg-primary-coral text-white shadow-xl shadow-coral/30' 
            : 'bg-white text-gray-600 border border-gray-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart size={18} className={activeTab === 'adopt' ? 'fill-white' : ''} /> Swipe to Adopt
          </div>
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all text-sm sm:text-base ${
            activeTab === 'map' 
            ? 'bg-primary-amber text-white shadow-xl shadow-amber/30' 
            : 'bg-white text-gray-600 border border-gray-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <MapIcon size={18} /> Map Discovery
          </div>
        </button>
        <button
          onClick={() => setActiveTab('meet')}
          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all text-sm sm:text-base ${
            activeTab === 'meet' 
            ? 'bg-primary-teal text-white shadow-xl shadow-teal/30' 
            : 'bg-white text-gray-600 border border-gray-100'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar size={18} /> Schedule Meeting
          </div>
        </button>
      </div>

      {activeTab === 'adopt' ? (
        <div className="flex flex-col items-center gap-8 sm:gap-12">
          {/* Swipe UI Container */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] perspective-1000">
            {loading ? (
              <Skeleton className="w-full h-full rounded-[32px] sm:rounded-[48px]" />
            ) : pets.length > currentIndex ? (
              <AnimatePresence>
                <motion.div
                  key={pets[currentIndex].id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 80) handleSwipe('right');
                    else if (info.offset.x < -80) handleSwipe('left');
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={(custom) => ({
                    x: custom === 'right' ? 500 : -500,
                    rotate: custom === 'right' ? 20 : -20,
                    opacity: 0
                  })}
                  className="absolute inset-0 glass rounded-[32px] sm:rounded-[48px] overflow-hidden border border-white/50 shadow-2xl cursor-grab active:cursor-grabbing touch-none"
                >
                  <div className="h-full relative group">
                    <img 
                      src={pets[currentIndex].image_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop'} 
                      alt={pets[currentIndex].name} 
                      className="w-full h-full object-cover pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white pointer-events-none">
                      <div className="flex justify-between items-end mb-2 sm:mb-4">
                        <div>
                          <h2 className="text-3xl sm:text-4xl font-black mb-1">{pets[currentIndex].name}</h2>
                          <p className="text-white/80 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                            {pets[currentIndex].breed} • {pets[currentIndex].age}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-primary-teal font-black text-xs sm:text-sm">
                          <MapPin size={16} /> {pets[currentIndex].location}
                        </div>
                      </div>
                      <p className="text-white/60 line-clamp-2 text-[11px] sm:text-sm leading-relaxed">
                        {pets[currentIndex].description}
                      </p>
                    </div>

                    {/* Drag Indicators */}
                    <motion.div 
                      style={{ opacity: 0 }} 
                      whileDrag={{ opacity: 1 }}
                      className="absolute top-6 left-6 sm:top-10 sm:left-10 border-2 sm:border-4 border-green-500 text-green-500 px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-black text-xl sm:text-2xl rotate-[-15deg] uppercase"
                    >
                      ADOPT
                    </motion.div>
                    <motion.div 
                      style={{ opacity: 0 }} 
                      whileDrag={{ opacity: 1 }}
                      className="absolute top-6 right-6 sm:top-10 sm:right-10 border-2 sm:border-4 border-red-500 text-red-500 px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-black text-xl sm:text-2xl rotate-[15deg] uppercase"
                    >
                      SKIP
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-white rounded-[32px] sm:rounded-[48px] border-2 border-dashed border-gray-100">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">💖</div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">That's everyone!</h3>
                <p className="text-gray-500 mb-6 sm:mb-8 text-sm">You've seen all adoptable pets in your area.</p>
                <button 
                  onClick={() => setCurrentIndex(0)}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-primary-coral text-white rounded-2xl font-bold shadow-xl shadow-coral/20 hover:scale-105 transition-all"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSwipe('left')}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-red-500 shadow-xl border border-gray-100"
            >
              <X size={28} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-coral text-white rounded-full flex items-center justify-center shadow-2xl shadow-coral/30"
            >
              <Heart size={32} className="fill-white" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab('meet')}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-primary-teal shadow-xl border border-gray-100"
            >
              <Calendar size={28} />
            </motion.button>
          </div>
        </div>
      ) : activeTab === 'map' ? (
        <div className="max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/50 backdrop-blur-sm"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pets waiting for a home</h3>
              <p className="text-sm text-gray-500 font-medium">{pets.length} active rescues near Mumbai</p>
            </div>
          </motion.div>
          <MapComponent items={pets} type="pet" />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Meeting Scheduler Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[48px] border border-white/50 shadow-2xl shadow-teal/5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-teal/10 rounded-2xl flex items-center justify-center text-primary-teal">
                <Calendar size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">Schedule a Meet & Greet</h2>
                <p className="text-gray-500 font-medium">Meet your potential new family member in person.</p>
              </div>
            </div>

            <form onSubmit={handleBookMeeting} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User size={16} /> Your Name
                </label>
                <input 
                  type="text" 
                  name="user_name"
                  required
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={meetingForm.user_name}
                  onChange={handleMeetingFormChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Heart size={16} /> Interested in
                </label>
                <select 
                  name="pet_name"
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={meetingForm.pet_name}
                  onChange={handleMeetingFormChange}
                >
                  <option value="Luna (Indie Mix)">Luna (Indie Mix)</option>
                  <option value="Milo (Golden Retriever)">Milo (Golden Retriever)</option>
                  <option value="Oliver (Persian Cat)">Oliver (Persian Cat)</option>
                  <option value="Other / Not sure">Other / Not sure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Calendar size={16} /> Preferred Date
                </label>
                <input 
                  type="date" 
                  name="date"
                  required
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={meetingForm.date}
                  onChange={handleMeetingFormChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <CheckCircle size={16} /> Preferred Time
                </label>
                <select 
                  name="time"
                  className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={meetingForm.time}
                  onChange={handleMeetingFormChange}
                >
                  <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                  <option value="Afternoon (2 PM - 4 PM)">Afternoon (2 PM - 4 PM)</option>
                  <option value="Evening (5 PM - 7 PM)">Evening (5 PM - 7 PM)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2 mt-4">
                <button 
                  type="submit"
                  disabled={appointmentMutation.isLoading}
                  className="w-full py-5 bg-primary-teal text-white rounded-2xl font-black text-lg shadow-xl shadow-teal/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {appointmentMutation.isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Request Meeting Slot <ArrowRight size={20} /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Adoption;
