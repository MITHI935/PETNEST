import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Package, ShoppingBag, Plus, X, Save, Image as ImageIcon } from 'lucide-react';
import foodService from '../services/foodService';
import toast from 'react-hot-toast';

const AdminFood = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    image_url: '',
    animal_type: 'dog',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const fetchProducts = async () => {
    try {
      const data = await foodService.getAllFood();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        image_url: product.image_url,
        animal_type: product.animal_type || 'dog',
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        brand: '',
        price: '',
        image_url: '',
        animal_type: 'dog',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price)
      };

      if (editingProduct) {
        await foodService.updateFood(editingProduct.id, payload);
        toast.success('Product updated successfully!');
      } else {
        await foodService.createFood(payload);
        toast.success('Product added successfully!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error('Submit error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      toast.error(editingProduct ? `Update failed: ${errorMsg}` : `Add failed: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await foodService.deleteFood(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Store <span className="text-primary-teal">Inventory</span></h1>
          <p className="text-gray-500 font-medium">Manage your pet food and accessories.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary-teal text-white rounded-2xl font-black shadow-lg shadow-teal/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass p-6 rounded-[32px] h-32 animate-pulse bg-gray-100/50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              layout
              key={product.id} 
              className="glass p-6 rounded-[32px] border border-white/50 shadow-xl flex gap-6 items-center group hover:border-primary-teal/30 transition-all"
            >
              <div className="w-24 h-24 rounded-2xl bg-gray-50 p-2 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={product.image_url} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-[10px] font-black text-primary-teal uppercase tracking-widest mb-1">{product.brand}</div>
                <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                <div className="text-lg font-black text-gray-900">₹{product.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-black text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Premium Kibble"
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Brand</label>
                  <input 
                    required
                    type="text" 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    placeholder="e.g. Royal Canin"
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="999"
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.animal_type}
                    onChange={(e) => setFormData({...formData, animal_type: e.target.value})}
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all appearance-none"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-4">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Product Image</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 ml-1">Upload File</p>
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-primary-teal/30 hover:bg-primary-teal/5 hover:border-primary-teal'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className={`mb-2 ${isUploading ? 'animate-bounce text-gray-400' : 'text-primary-teal'}`} size={24} />
                          <p className="text-xs font-bold text-gray-500">{isUploading ? 'Uploading...' : 'Click to upload image'}</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 ml-1">Or Paste URL</p>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="url" 
                          value={formData.image_url}
                          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                          placeholder="https://..."
                          className="w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all text-sm"
                        />
                      </div>
                      {formData.image_url && (
                        <div className="mt-2 w-full h-20 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                          <img src={formData.image_url} alt="Preview" className="h-full object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the product benefits..."
                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-primary-teal rounded-2xl outline-none font-bold transition-all resize-none"
                  />
                </div>

                <div className="col-span-2 pt-4">
                  <button 
                    type="submit"
                    disabled={isUploading || isSubmitting}
                    className={`w-full py-4 bg-primary-teal text-white rounded-2xl font-black text-lg shadow-lg shadow-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${(isUploading || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {(isUploading || isSubmitting) ? (
                      <>
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        {isUploading ? 'Uploading Image...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save size={20} /> {editingProduct ? 'Save Changes' : 'Add Product'}
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

export default AdminFood;
