import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import petService from '../services/petService';
import PetCard from '../components/PetCard';
import Skeleton from '../components/Skeleton';
import { Search, Filter, Plus } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await petService.getAllPets({ 
          search: debouncedSearch,
          category: category !== '' ? category : undefined
        });
        setPets(data || []);
        
        // Update URL params
        const newParams = new URLSearchParams();
        if (debouncedSearch) newParams.set('search', debouncedSearch);
        if (category) newParams.set('category', category);
        setSearchParams(newParams, { replace: true });
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [debouncedSearch, category, setSearchParams]);

  const categories = [
    { label: 'All Pets', value: '', icon: '🐾', color: 'bg-primary-coral/10 text-primary-coral' },
    { label: 'Dogs', value: 'dog', icon: '🐶', color: 'bg-primary-amber/10 text-primary-amber' },
    { label: 'Cats', value: 'cat', icon: '🐱', color: 'bg-primary-teal/10 text-primary-teal' },
    { label: 'Birds', value: 'bird', icon: '🦜', color: 'bg-blue-50 text-blue-500' },
    { label: 'Rescues', value: 'rescue', icon: '🏥', color: 'bg-green-50 text-green-500' },
    { label: 'Others', value: 'other', icon: '🐰', color: 'bg-purple-50 text-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">Pet <span className="text-primary-coral">Marketplace</span></h1>
          <p className="text-gray-500 font-medium text-lg">Find your new best friend from verified sellers.</p>
        </motion.div>
        <Link 
          to="/marketplace/add" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-dark-text text-white rounded-[24px] font-black shadow-2xl hover:bg-primary-coral transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={24} /> List a Pet
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="space-y-8 mb-16">
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text"
            placeholder="Search by name, breed or personality..."
            className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 rounded-[32px] shadow-xl shadow-gray-100/50 focus:ring-4 focus:ring-primary-coral/10 focus:border-primary-coral transition-all outline-none text-lg font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(cat.value)}
              className={`px-6 py-4 rounded-2xl font-black flex items-center gap-3 transition-all ${
                category === cat.value 
                ? 'bg-dark-text text-white shadow-2xl' 
                : `${cat.color} hover:shadow-lg`
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No pets found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
