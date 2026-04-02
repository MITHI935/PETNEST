import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Check, X, Search, Filter, Save, Plus, Image as ImageIcon } from 'lucide-react';
import petService from '../services/petService';
import toast from 'react-hot-toast';

const AdminPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    category: 'dog',
    price: '',
    location: '',
    image_url: '',
    description: '',
    is_boosted: false
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const handleFileUpload = async (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          setEditForm(prev => ({ ...prev, image_url: data.imageUrl }));
        } else {
          setNewPet(prev => ({ ...prev, image_url: data.imageUrl }));
        }
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (err) {
      toast.error('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const data = await petService.getAllPets();
      setPets(data);
    } catch (err) {
      toast.error('Failed to fetch pets');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await petService.deletePetListing(id);
      setPets(pets.filter(p => p.id !== id));
      toast.success('Listing deleted');
    } catch (err) {
      toast.error('Failed to delete listing');
    }
  };

  const startEdit = (pet) => {
    setEditingId(pet.id);
    setEditForm(pet);
  };

  const handleUpdate = async () => {
    try {
      await petService.updatePetListing(editingId, editForm);
      setPets(pets.map(p => p.id === editingId ? editForm : p));
      setEditingId(null);
      toast.success('Listing updated');
    } catch (err) {
      toast.error('Failed to update listing');
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    if (isUploading) return;
    
    try {
      const payload = {
        ...newPet,
        price: Number(newPet.price)
      };
      await petService.createPetListing(payload);
      toast.success('New pet added successfully!');
      setShowAddModal(false);
      fetchPets();
      setNewPet({
        name: '',
        breed: '',
        age: '',
        category: 'dog',
        price: '',
        location: '',
        image_url: '',
        description: '',
        is_boosted: false
      });
    } catch (err) {
      toast.error('Failed to add pet');
    }
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Manage <span className="text-primary-coral">Pets</span></h1>
          <p className="text-gray-500 font-medium">Control the marketplace listings.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search pets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-coral/20 focus:border-primary-coral transition-all font-bold"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-coral text-white rounded-2xl font-black shadow-lg shadow-coral/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} /> Add Pet
          </button>
        </div>
      </div>

      <div className="glass rounded-[40px] overflow-hidden border border-white/50 shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 uppercase text-[10px] font-black tracking-[0.2em]">
              <th className="px-8 py-6">Pet Details</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Price</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [1,2,3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="5" className="px-8 py-6 h-20 bg-gray-50/20" />
                </tr>
              ))
            ) : filteredPets.map((pet) => (
              <tr key={pet.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={pet.image_url} alt="" className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm" />
                    {editingId === pet.id ? (
                      <div className="flex flex-col gap-2">
                        <input 
                          type="text" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="border-2 border-primary-coral/20 px-3 py-1 rounded-xl outline-none font-bold text-sm focus:border-primary-coral"
                        />
                        <input 
                          type="text" 
                          value={editForm.breed} 
                          onChange={(e) => setEditForm({...editForm, breed: e.target.value})}
                          className="border-2 border-primary-coral/20 px-3 py-1 rounded-xl outline-none font-bold text-xs focus:border-primary-coral"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-black text-gray-900">{pet.name}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{pet.breed} • {pet.age}</div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  {editingId === pet.id ? (
                    <select 
                      value={editForm.category}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="border-2 border-primary-coral/20 rounded-xl px-3 py-1 text-xs font-bold outline-none focus:border-primary-coral"
                    >
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rescue">Rescue</option>
                    </select>
                  ) : (
                    <span className="px-4 py-1.5 bg-primary-teal/10 text-primary-teal rounded-full text-[10px] font-black uppercase tracking-widest">
                      {pet.category}
                    </span>
                  )}
                </td>
                <td className="px-8 py-6">
                  {editingId === pet.id ? (
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-400">₹</span>
                      <input 
                        type="number" 
                        value={editForm.price} 
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="border-2 border-primary-coral/20 px-3 py-1 rounded-xl w-24 outline-none font-black text-sm focus:border-primary-coral"
                      />
                    </div>
                  ) : (
                    <span className="font-black text-gray-900">₹{pet.price}</span>
                  )}
                </td>
                <td className="px-8 py-6">
                  {editingId === pet.id ? (
                    <button 
                      onClick={() => setEditForm({...editForm, is_boosted: !editForm.is_boosted})}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        editForm.is_boosted 
                        ? 'bg-primary-amber text-white shadow-md shadow-amber/20' 
                        : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {editForm.is_boosted ? 'BOOSTED' : 'STANDARD'}
                    </button>
                  ) : (
                    pet.is_boosted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-amber/10 text-primary-amber rounded-full text-[10px] font-black uppercase tracking-widest">
                        <Check size={12} strokeWidth={3} /> Boosted
                      </span>
                    ) : (
                      <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest">Standard</span>
                    )
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    {editingId === pet.id ? (
                      <>
                        <button 
                          onClick={handleUpdate}
                          className="p-3 text-white bg-green-500 hover:bg-green-600 rounded-xl transition-all shadow-md shadow-green/20"
                        >
                          <Save size={18} />
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-3 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => startEdit(pet)}
                          className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(pet.id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Pet Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-black text-gray-900">List New Pet</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddPet} className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pet Name</label>
                  <input required type="text" value={newPet.name} onChange={(e) => setNewPet({...newPet, name: e.target.value})} placeholder="e.g. Buddy" className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Breed</label>
                  <input required type="text" value={newPet.breed} onChange={(e) => setNewPet({...newPet, breed: e.target.value})} placeholder="e.g. Golden Retriever" className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Age</label>
                  <input required type="text" value={newPet.age} onChange={(e) => setNewPet({...newPet, age: e.target.value})} placeholder="e.g. 2 Months" className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Category</label>
                  <select value={newPet.category} onChange={(e) => setNewPet({...newPet, category: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rescue">Rescue</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input required type="number" value={newPet.price} onChange={(e) => setNewPet({...newPet, price: e.target.value})} placeholder="0 for Rescue" className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Location</label>
                  <input required type="text" value={newPet.location} onChange={(e) => setNewPet({...newPet, location: e.target.value})} placeholder="e.g. Bangalore" className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Listing Type</label>
                  <button type="button" onClick={() => setNewPet({...newPet, is_boosted: !newPet.is_boosted})} className={`w-full py-3 rounded-2xl font-black text-sm transition-all border-2 ${newPet.is_boosted ? 'bg-primary-amber text-white border-primary-amber' : 'bg-white text-gray-400 border-gray-100'}`}>
                    {newPet.is_boosted ? 'BOOSTED LISTING' : 'STANDARD LISTING'}
                  </button>
                </div>
                <div className="col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Pet Image</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Upload File</p>
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-primary-coral/30 hover:bg-primary-coral/5 hover:border-primary-coral'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className={`mb-2 ${isUploading ? 'animate-bounce text-gray-400' : 'text-primary-coral'}`} size={24} />
                          <p className="text-[10px] font-bold text-gray-500 uppercase">{isUploading ? 'Uploading...' : 'Select Photo'}</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, false)} disabled={isUploading} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Or Paste URL</p>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="url" 
                          value={newPet.image_url}
                          onChange={(e) => setNewPet({...newPet, image_url: e.target.value})}
                          placeholder="https://..."
                          className="w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all text-xs"
                        />
                      </div>
                      {newPet.image_url && (
                        <div className="mt-2 w-full h-20 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                          <img src={newPet.image_url} alt="Preview" className="h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Description</label>
                  <textarea rows="3" value={newPet.description} onChange={(e) => setNewPet({...newPet, description: e.target.value})} placeholder="Tell us about the pet..." className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all resize-none" />
                </div>

                <div className="col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={isUploading}
                    className={`w-full py-4 bg-primary-coral text-white rounded-2xl font-black text-lg shadow-lg shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Save size={20} /> Create Listing
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPets;
