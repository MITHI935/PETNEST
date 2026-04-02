import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingQuiz from '../components/OnboardingQuiz';
import heroImg from '../assets/hero-new.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const hasCompletedQuiz = typeof window !== 'undefined' ? localStorage.getItem('quizCompleted') : false;

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (category) params.append('category', category);
    navigate(`/marketplace?${params.toString()}`);
  };

  return (
    <div className="space-y-32 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-coral/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-teal/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-xl shadow-gray-100/50 text-primary-coral text-xs sm:text-sm font-black mb-6 sm:mb-8 border border-gray-50"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary-coral animate-ping" />
                Trusted by 50,000+ Pet Parents
              </motion.div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[1.1] lg:leading-[0.9] mb-6 sm:mb-8">
                Love is just a <span className="text-primary-coral relative">
                  Swipe
                  <motion.svg 
                    viewBox="0 0 100 20" 
                    className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-2 sm:h-4 text-primary-amber/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </motion.svg>
                </span> away.
              </h1>
              
              <p className="text-lg sm:text-2xl text-gray-500 mb-8 sm:mb-10 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Find your perfect companion, premium food, and expert care—all in one place.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
                {!hasCompletedQuiz ? (
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-primary-coral text-white rounded-[20px] sm:rounded-[24px] font-black text-lg sm:text-xl shadow-2xl shadow-coral/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    Take Match Quiz <Sparkles size={20} fill="currentColor" />
                  </button>
                ) : (
                  <Link to="/adoption" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-primary-coral text-white rounded-[20px] sm:rounded-[24px] font-black text-lg sm:text-xl shadow-2xl shadow-coral/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                    Start Swiping <Heart size={20} className="group-hover:fill-white transition-colors" />
                  </Link>
                )}
                <Link to="/marketplace" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 rounded-[20px] sm:rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                  Browse Pets
                </Link>
              </div>

              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex -space-x-3 sm:-space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 border-white shadow-lg" alt="User" />
                  ))}
                </div>
                <p className="text-gray-400 font-bold text-sm sm:text-base">Joined this week</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative mt-10 lg:mt-0"
            >
              <div className="absolute inset-0 bg-primary-amber/20 rounded-[40px] sm:rounded-[80px] blur-[30px] sm:blur-[60px] -rotate-6" />
              <div className="relative z-10 p-2 sm:p-4 bg-white/50 backdrop-blur-lg border border-white/50 rounded-[40px] sm:rounded-[80px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
                <img 
                  src={heroImg} 
                  alt="Happy pet friends"
                  className="w-full aspect-square object-cover rounded-[32px] sm:rounded-[64px] border-2 sm:border-4 border-white"
                />
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 z-20 glass p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] shadow-2xl flex items-center gap-3 sm:gap-4"
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-primary-coral/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-coral">
                  <Heart size={20} className="sm:hidden fill-primary-coral" />
                  <Heart size={32} className="hidden sm:block fill-primary-coral" />
                </div>
                <div>
                  <div className="font-black text-base sm:text-xl text-gray-900">12.4k+</div>
                  <div className="text-gray-500 font-bold text-xs sm:text-base">Pets Adopted</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories / Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Adoption", 
              desc: "Swipe to find your next best friend", 
              icon: "🐶", 
              color: "bg-primary-coral/10 text-primary-coral",
              link: "/adoption"
            },
            { 
              title: "Marketplace", 
              desc: "Verified sellers and healthy breeds", 
              icon: "🐱", 
              color: "bg-primary-amber/10 text-primary-amber",
              link: "/marketplace"
            },
            { 
              title: "Pet Store", 
              desc: "Premium nutrition for your pets", 
              icon: "🥫", 
              color: "bg-primary-teal/10 text-primary-teal",
              link: "/store"
            },
            { 
              title: "Vet Care", 
              desc: "Expert consultations in your city", 
              icon: "🏥", 
              color: "bg-blue-50 text-blue-500",
              link: "/vets"
            }
          ].map((item, i) => (
            <Link key={i} to={item.link}>
              <motion.div 
                whileHover={{ y: -12, scale: 1.02 }}
                className="glass p-10 rounded-[48px] border border-white/50 text-center space-y-6 group h-full"
              >
                <div className={`w-24 h-24 ${item.color} rounded-[32px] flex items-center justify-center text-5xl mx-auto group-hover:rotate-12 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={24} className="mx-auto text-gray-300" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-coral rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-coral/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">
            Ready to give a pet <br className="hidden md:block" /> a forever home?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Join thousands of pet lovers on PetNest and find your perfect companion today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link to="/adoption" aria-label="Start adopting" className="btn bg-white text-primary-coral font-bold">
              Start Adopting
            </Link>
            <Link to="/marketplace" aria-label="Browse marketplace" className="btn btn-outline text-white border-white">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showQuiz && <OnboardingQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Home;
