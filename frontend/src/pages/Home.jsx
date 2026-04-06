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
    <div className="space-y-32 pb-20 overflow-x-hidden dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-coral/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary-teal/10 rounded-full blur-[140px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left lg:col-span-6 xl:col-span-5"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700 text-primary-coral text-xs sm:text-sm font-bold mb-8"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-coral"></span>
                </span>
                Trusted by 50,000+ Pet Parents
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                Love is just a <br/>
                <span className="text-primary-coral relative inline-block mt-2">
                  Swipe
                  <motion.svg 
                    viewBox="0 0 100 20" 
                    className="absolute -bottom-3 left-0 w-full h-3 text-primary-amber/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </motion.svg>
                </span> away.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                Find your perfect companion, premium food, and expert care—all in one beautifully designed place.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                {!hasCompletedQuiz ? (
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="px-8 py-4 bg-primary-coral text-white rounded-full font-black text-lg shadow-xl shadow-coral/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    Take Match Quiz <Sparkles size={20} />
                  </button>
                ) : (
                  <Link to="/adoption" className="px-8 py-4 bg-primary-coral text-white rounded-full font-black text-lg shadow-xl shadow-coral/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 w-full sm:w-auto group">
                    Start Swiping <Heart size={20} className="group-hover:fill-white transition-colors" />
                  </Link>
                )}
                <Link to="/marketplace" className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-black text-lg shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                  Browse Pets
                </Link>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 shadow-md" alt="User" />
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-primary-amber mb-0.5">
                    {[1,2,3,4,5].map(i => <Sparkles key={i} size={14} className="fill-current" />)}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">Joined this week</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative lg:col-span-6 xl:col-span-7 mt-16 lg:mt-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-amber/20 to-primary-coral/20 rounded-[64px] blur-[40px] -rotate-3" />
              
              <div className="relative z-10 p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 rounded-[48px] sm:rounded-[64px] shadow-2xl">
                <img 
                  src={heroImg} 
                  alt="Happy pet friends"
                  className="w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] object-cover rounded-[36px] sm:rounded-[52px]"
                />
              </div>

              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 glass p-5 sm:p-6 rounded-[32px] shadow-xl flex items-center gap-4 border border-white/60"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-coral/10 rounded-2xl flex items-center justify-center text-primary-coral">
                  <Heart size={28} className="fill-primary-coral" />
                </div>
                <div>
                  <div className="font-black text-xl sm:text-2xl text-gray-900 dark:text-white leading-none mb-1">12.4k+</div>
                  <div className="text-gray-500 dark:text-gray-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Pets Adopted</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Categories / Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { 
              title: "Adoption", 
              desc: "Swipe to find your next best friend", 
              icon: "🐶", 
              color: "bg-primary-coral/10 text-primary-coral border-primary-coral/20",
              link: "/adoption"
            },
            { 
              title: "Marketplace", 
              desc: "Verified sellers and healthy breeds", 
              icon: "🐱", 
              color: "bg-primary-amber/10 text-primary-amber border-primary-amber/20",
              link: "/marketplace"
            },
            { 
              title: "Pet Store", 
              desc: "Premium nutrition for your pets", 
              icon: "🥫", 
              color: "bg-primary-teal/10 text-primary-teal border-primary-teal/20",
              link: "/store"
            },
            { 
              title: "Vet Care", 
              desc: "Expert consultations in your city", 
              icon: "🏥", 
              color: "bg-blue-50 text-blue-500 border-blue-100",
              link: "/vets"
            }
          ].map((item, i) => (
            <Link key={i} to={item.link}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-[40px] border border-gray-100 dark:border-gray-700 text-center space-y-5 group h-full shadow-lg shadow-gray-200/20 hover:shadow-2xl transition-all"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 ${item.color} border rounded-[28px] flex items-center justify-center text-4xl sm:text-5xl mx-auto group-hover:rotate-6 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-sm sm:text-base">{item.desc}</p>
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mx-auto text-gray-400 group-hover:text-primary-coral transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-coral to-[#FF8FA3] rounded-[48px] sm:rounded-[64px] p-10 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-coral/30">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[80px] translate-x-1/3 translate-y-1/3" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight">
            Ready to give a pet <br className="hidden md:block" /> a forever home?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            Join thousands of pet lovers on PetNest and find your perfect companion today. Every pet deserves a loving family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/adoption" className="px-8 py-4 bg-white text-primary-coral rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Adopting <Heart size={20} className="fill-primary-coral" />
            </Link>
            <Link to="/marketplace" className="px-8 py-4 bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10 rounded-full font-black text-lg transition-all flex items-center justify-center gap-2">
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
