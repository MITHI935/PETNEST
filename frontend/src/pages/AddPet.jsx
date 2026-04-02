import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import petService from '../services/petService';
import toast from 'react-hot-toast';
import { Camera, MapPin, Tag, CheckCircle } from 'lucide-react';

const AddPet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'dog',
    breed: '',
    age: '',
    price: '',
    location: '',
    description: '',
    seller_name: '',
    seller_phone: '',
    image_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.price || !formData.seller_phone) {
      return toast.error('Please fill in all required fields');
    }

    setLoading(true);
    try {
      await petService.createPetListing({
        ...formData,
        price: parseFloat(formData.price),
        is_boosted: formData.is_boosted || false
      });
      toast.success('Listing created successfully!');
      navigate('/marketplace');
    } catch (error) {
      toast.error('Failed to create listing');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Sell a Pet</h1>
        <p className="text-gray-500 font-medium">Reach thousands of potential buyers across India.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image & Details */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[32px] border border-white/50">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera size={20} className="text-primary-coral" /> Pet Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pet Name *</label>
                <input 
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Buddy"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    name="category"
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rescue">Rescue / Adoption</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Breed</label>
                  <input 
                    name="breed"
                    type="text"
                    placeholder="e.g. Golden Retriever"
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                    value={formData.breed}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                  <input 
                    name="age"
                    type="text"
                    placeholder="e.g. 2 months"
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) *</label>
                  <input 
                    name="price"
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <input 
                  name="image_url"
                  type="url"
                  placeholder="Paste an image link here"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Seller & Description */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[32px] border border-white/50">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-primary-teal" /> Seller Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                <input 
                  name="seller_name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={formData.seller_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input 
                  name="seller_phone"
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={formData.seller_phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input 
                  name="location"
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  rows="3"
                  placeholder="Describe your pet's personality, health, etc."
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-teal focus:border-transparent outline-none transition-all"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-amber/10 p-8 rounded-[32px] border border-primary-amber/20">
            <h3 className="font-bold text-primary-amber flex items-center gap-2 mb-4">
              <Tag size={20} /> Boost Your Listing
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Get featured at the top of search results and sell 10x faster.
            </p>
            <label className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-primary-amber/30 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-primary-amber" 
                checked={formData.is_boosted}
                onChange={(e) => setFormData(prev => ({ ...prev, is_boosted: e.target.checked }))}
              />
              <div>
                <div className="font-bold text-gray-900">Featured Boost</div>
                <div className="text-xs text-gray-500">Only ₹299 for 7 days</div>
              </div>
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary-coral text-white rounded-2xl font-black text-lg shadow-xl shadow-coral/30 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>Post Listing <CheckCircle size={22} /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
