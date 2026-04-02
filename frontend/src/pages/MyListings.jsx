import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import petService from '../services/petService';
import toast from 'react-hot-toast';

const MyListings = () => {
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real app, we would filter by the logged-in user's ID
  // For now, we'll show all pets as "my pets" or filter by a specific mock phone
  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const data = await petService.getAllPets();
        setMyPets(data);
      } catch (err) {
        toast.error('Failed to load your listings');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete your listing?')) return;
    try {
      await petService.deletePetListing(id);
      setMyPets(myPets.filter(p => p.id !== id));
      toast.success('Listing removed');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-2">My <span className="text-primary-coral">Pet Hub</span></h1>
          <p className="text-gray-500 font-medium text-lg">Manage the pets you've listed for adoption or sale.</p>
        </div>
        <Link 
          to="/marketplace/add" 
          className="flex items-center gap-3 px-10 py-5 bg-primary-coral text-white rounded-[24px] font-black text-lg shadow-2xl shadow-coral/30 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={24} /> List New Pet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {myPets.map((pet) => (
          <motion.div 
            key={pet.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[40px] overflow-hidden border border-white/50 shadow-2xl group bg-white"
          >
            <div className="aspect-[4/3] relative">
              <img src={pet.image_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary-coral shadow-sm">
                  {pet.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">{pet.name}</h3>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-wider">{pet.breed}</p>
                </div>
                <div className="text-right text-primary-coral font-black text-2xl">
                  ₹{pet.price}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <Link 
                  to="/marketplace/add" 
                  className="flex-grow py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                >
                  <Edit size={16} /> Edit
                </Link>
                <button 
                  onClick={() => handleDelete(pet.id)}
                  className="flex-grow py-3 bg-red-50 text-red-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>

              {/* Stats Mockup */}
              <div className="mt-6 flex justify-around p-4 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-lg font-black text-gray-900">124</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Views</div>
                </div>
                <div className="text-center border-x border-gray-200 px-6">
                  <div className="text-lg font-black text-primary-coral">12</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-black text-primary-teal">3</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Leads</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {myPets.length === 0 && (
          <div className="col-span-full py-20 text-center glass rounded-[48px] border-2 border-dashed border-gray-100">
            <div className="text-6xl mb-6">🐾</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">You haven't listed any pets yet</h2>
            <p className="text-gray-500 mb-8">Ready to find your pet a new home?</p>
            <Link to="/marketplace/add" className="btn bg-primary-coral text-white font-bold">List Your Pet Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
