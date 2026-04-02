import React from 'react';
import { PawPrint, Camera, MessageCircle, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-coral rounded-lg">
                <PawPrint className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-dark-text">PetNest</span>
            </Link>
            <p className="text-gray-500 text-sm">
              India&apos;s leading ecosystem for all things pets. Buy, sell, and care for your furry friends.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-coral"><Camera size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-coral"><MessageCircle size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-coral"><Globe size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/marketplace?category=dog" className="hover:text-primary-coral">Dogs</Link></li>
              <li><Link to="/marketplace?category=cat" className="hover:text-primary-coral">Cats</Link></li>
              <li><Link to="/marketplace?category=bird" className="hover:text-primary-coral">Birds</Link></li>
              <li><Link to="/marketplace?category=other" className="hover:text-primary-coral">Exotic Pets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/vets" className="hover:text-primary-coral">Find a Vet</Link></li>
              <li><Link to="/store" className="hover:text-primary-coral">Pet Food</Link></li>
              <li><Link to="/store" className="hover:text-primary-coral">Accessories</Link></li>
              <li><Link to="/vets" className="hover:text-primary-coral">Health Plans</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-primary-coral">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-coral">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-primary-coral">Terms & Privacy</Link></li>
              <li><Link to="/faq" className="hover:text-primary-coral">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-xs">
          © 2026 PetNest India. All rights reserved. Built with ❤️ for pets.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
