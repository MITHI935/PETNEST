import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import foodService from '../services/foodService';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Skeleton from '../components/Skeleton';
import { Search, ShoppingBag } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: products = [], isLoading: loading, error } = useQuery({
    queryKey: ['products', { search: debouncedSearch, animalType }],
    queryFn: () => foodService.getAllFood({ 
      search: debouncedSearch,
      animalType: animalType !== '' ? animalType : undefined
    }),
    onError: (err) => {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products');
    }
  });

  const filters = [
    { label: 'All Food', value: '', icon: '🥫' },
    { label: 'Dogs', value: 'dog', icon: '🐶' },
    { label: 'Cats', value: 'cat', icon: '🐱' },
    { label: 'Birds', value: 'bird', icon: '🦜' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-2">Pet <span className="text-primary-teal">Store</span></h1>
          <p className="text-gray-500 font-medium text-lg">Premium nutrition for your beloved pets.</p>
        </motion.div>
        <div className="bg-primary-teal/10 text-primary-teal px-8 py-4 rounded-[24px] font-black flex items-center gap-3 shadow-xl shadow-teal/5">
          <ShoppingBag size={24} /> Same-day delivery
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <div className="relative flex-grow">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input 
            type="text"
            placeholder="Search products, brands, ingredients..."
            className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-[28px] shadow-xl shadow-gray-100/50 focus:ring-4 focus:ring-primary-teal/10 focus:border-primary-teal transition-all outline-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setAnimalType(f.value)}
              className={`px-8 py-5 rounded-[24px] font-black flex items-center gap-2 transition-all whitespace-nowrap ${
                animalType === f.value 
                ? 'bg-primary-teal text-white shadow-2xl shadow-teal/30' 
                : 'bg-white text-gray-500 border border-gray-100 hover:border-primary-teal hover:text-primary-teal'
              }`}
            >
              <span className="text-xl">{f.icon}</span> {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
          <div className="text-6xl mb-4">🥫</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try a different search term or category.</p>
        </div>
      )}

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Store;
