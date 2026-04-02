import React, { useState, useEffect } from 'react';
import vetService from '../services/vetService';
import VetCard from '../components/VetCard';
import Skeleton from '../components/Skeleton';
import { Search, MapPin, Calendar } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchVets = async () => {
      setLoading(true);
      try {
        const data = await vetService.getAllVets({ 
          search: debouncedSearch,
          specialization: specialization !== '' ? specialization : undefined
        });
        setVets(data);
      } catch (error) {
        console.error('Failed to fetch vets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVets();
  }, [debouncedSearch, specialization]);

  const specializations = [
    { label: 'All Specialists', value: '' },
    { label: 'General Vet', value: 'general' },
    { label: 'Surgeon', value: 'surgeon' },
    { label: 'Dermatologist', value: 'dermatologist' },
    { label: 'Dentist', value: 'dentist' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Find a Veterinarian</h1>
          <p className="text-gray-500 font-medium">Top-rated clinics and experts in your neighborhood.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-gray-100 shadow-sm">
            <MapPin size={20} className="text-primary-coral" /> Mumbai, India
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/50">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search size={18} /> Search
            </h3>
            <input 
              type="text"
              placeholder="Vet name or clinic..."
              className="w-full px-4 py-3 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent transition-all outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="glass p-6 rounded-3xl border border-white/50">
            <h3 className="font-bold text-gray-900 mb-4">Specialization</h3>
            <div className="space-y-2">
              {specializations.map((spec) => (
                <button
                  key={spec.value}
                  onClick={() => setSpecialization(spec.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    specialization === spec.value 
                    ? 'bg-primary-coral text-white shadow-lg shadow-coral/20' 
                    : 'bg-white/50 text-gray-600 hover:bg-white'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-primary-amber/10 p-6 rounded-3xl border border-primary-amber/20">
            <h3 className="font-bold text-primary-amber flex items-center gap-2 mb-2">
              <Calendar size={18} /> Pet Health Plans
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Get unlimited consultations and vaccinations starting at ₹799/month.
            </p>
            <button className="w-full py-2 bg-primary-amber text-white rounded-xl font-bold text-sm shadow-lg shadow-amber/20">
              View Plans
            </button>
          </div>
        </div>

        {/* Vet List */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : vets.length > 0 ? (
            <div className="space-y-6">
              {vets.map((vet) => (
                <VetCard key={vet.id} vet={vet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No veterinarians found</h3>
              <p className="text-gray-500">Try expanding your search or changing specialization.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vets;
