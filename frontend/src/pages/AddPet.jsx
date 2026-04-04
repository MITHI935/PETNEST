import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, CheckCircle, Info, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import petService from '../services/petService';
import toast from 'react-hot-toast';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    category: 'dog',
    location: '',
    description: '',
    seller_name: '',
    seller_phone: '',
    image_url: '',
    is_boosted: false
  });

  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
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
        setFormData(prev => ({ ...prev, image_url: data.imageUrl }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast.error('Please upload a pet image');
      return;
    }
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price)
      };
      await petService.createPetListing(payload);
      toast.success('Listing created successfully!');
      navigate('/marketplace');
    } catch (err) {
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          List Your <span className="text-primary-coral">Pet</span>
        </h1>
        <p className="text-gray-500 font-medium">Find a loving new home for your furry friend.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 sm:p-10 rounded-[40px] border border-white/50 shadow-2xl">
            <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2 text-xl">
              <Sparkles size={24} className="text-primary-amber" /> Basic Information
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Pet Name *</label>
                  <input 
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Buddy"
                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Breed *</label>
                  <input 
                    name="breed"
                    type="text"
                    required
                    placeholder="e.g. Golden Retriever"
                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all"
                    value={formData.breed}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Age *</label>
                  <input 
                    name="age"
                    type="text"
                    required
                    placeholder="e.g. 2 Years"
                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Category *</label>
                  <select 
                    name="category"
                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all appearance-none"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rescue">Rescue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 ml-1">Price (₹) *</label>
                  <input 
                    name="price"
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-coral rounded-2xl outline-none font-bold transition-all"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700 ml-1">Pet Image *</label>
                <label className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-[32px] cursor-pointer transition-all ${isUploading ? 'bg-gray-50 border-gray-300' : 'bg-gray-50/50 border-primary-coral/20 hover:bg-primary-coral/5 hover:border-primary-coral'}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    {formData.image_url ? (
                      <div className="relative group">
                        <img src={formData.image_url} alt="Preview" className="h-40 w-40 object-cover rounded-3xl mb-2 border-4 border-white shadow-xl group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white" size={32} />
                        </div>
                      </div>
                    ) : (
                      <ImageIcon className={`mb-4 ${isUploading ? 'animate-bounce text-gray-400' : 'text-primary-coral'}`} size={48} />
                    )}
                    <p className="text-base font-bold text-gray-600">
                      {isUploading ? 'Uploading your pet photo...' : formData.image_url ? 'Click to change photo' : 'Upload pet photo'}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 uppercase font-black tracking-widest">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[40px] border border-white/50 shadow-xl">
            <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2 text-xl">
              <MapPin size={24} className="text-primary-teal" /> Seller Details
            </h3>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <input 
                  name="seller_name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  value={formData.seller_name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Phone Number *</label>
                <input 
                  name="seller_phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  value={formData.seller_phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Location</label>
                <input 
                  name="location"
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1">Description</label>
                <textarea 
                  name="description"
                  rows="4"
                  placeholder="Describe your pet's personality, health, habits..."
                  className="w-full px-5 py-4 bg-gray-50/50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all resize-none"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-amber/10 p-8 rounded-[40px] border border-primary-amber/20">
            <h3 className="font-bold text-primary-amber flex items-center gap-2 mb-4 text-lg">
              <Tag size={24} /> Boost Your Listing
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              Get featured at the top of search results and find a home 10x faster.
            </p>
            <label className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-primary-amber/30 cursor-pointer hover:shadow-md transition-shadow">
              <input 
                type="checkbox" 
                className="w-6 h-6 accent-primary-amber rounded-lg" 
                checked={formData.is_boosted}
                onChange={(e) => setFormData(prev => ({ ...prev, is_boosted: e.target.checked }))}
              />
              <div>
                <div className="font-black text-gray-900">Featured Boost</div>
                <div className="text-xs text-gray-500 font-bold">Only ₹299 for 7 days</div>
              </div>
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading || isUploading}
            className="w-full py-5 bg-primary-coral text-white rounded-[28px] font-black text-xl shadow-2xl shadow-coral/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-7 h-7 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>Post Listing <CheckCircle size={24} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
