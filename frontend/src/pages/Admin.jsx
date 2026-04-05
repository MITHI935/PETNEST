import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Dog, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Settings,
  TrendingUp,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import petService from '../services/petService';
import foodService from '../services/foodService';
import orderService from '../services/orderService';
import appointmentService from '../services/appointmentService';

const Admin = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [stats, setStats] = useState({
    pets: 0,
    products: 0,
    orders: 0,
    appointments: 0
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pets, products, orders, appointments] = await Promise.all([
          petService.getAllPets(),
          foodService.getAllFood(),
          orderService.getAllOrders(),
          appointmentService.getAllAppointments()
        ]);
        setStats({
          pets: pets.length,
          products: products.length,
          orders: orders.length,
          appointments: appointments.length
        });
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Pets', value: stats.pets, icon: Dog, color: 'text-primary-coral', bg: 'bg-primary-coral/10' },
    { title: 'Products', value: stats.products, icon: Package, color: 'text-primary-teal', bg: 'bg-primary-teal/10' },
    { title: 'Active Orders', value: stats.orders, icon: ShoppingBag, color: 'text-primary-amber', bg: 'bg-primary-amber/10' },
    { title: 'Appointments', value: stats.appointments, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 flex items-center gap-4">
            <LayoutDashboard size={40} className="text-primary-coral" /> Admin Dashboard
          </h1>
          <p className="text-gray-500 font-medium">Manage your PetNest empire from here.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[32px] border border-white/50 shadow-xl"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={28} />
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{loading ? '...' : stat.value}</div>
            <div className="text-gray-500 font-bold uppercase tracking-wider text-xs">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[40px] border border-white/50 shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-8">System Overview</h3>
            <div className="space-y-6">
              {[
                { label: 'Database Status', value: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
                { label: 'Pending Reviews', value: '5 Listings', icon: Clock, color: 'text-primary-amber' },
                { label: 'Security Alerts', value: 'None', icon: AlertCircle, color: 'text-primary-coral' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} bg-white p-3 rounded-xl shadow-sm`}>
                      <item.icon size={24} />
                    </div>
                    <span className="font-bold text-gray-700">{item.label}</span>
                  </div>
                  <span className={`font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[40px] border border-white/50 shadow-2xl">
            <h3 className="text-xl font-black text-gray-900 mb-6">Quick Management</h3>
            <div className="space-y-3">
              {[
                { label: 'Manage Pets', icon: Dog, path: '/admin/pets' },
                { label: 'Store Inventory', icon: Package, path: '/admin/food' },
                { label: 'Orders History', icon: ShoppingBag, path: '/admin/orders' },
                { label: 'Appointment Log', icon: Calendar, path: '/admin/appointments' }
              ].map((link, i) => (
                <a 
                  key={i}
                  href={link.path}
                  className="flex items-center gap-4 p-4 hover:bg-primary-coral hover:text-white rounded-2xl transition-all font-bold text-gray-600 group"
                >
                  <link.icon size={20} className="group-hover:scale-110 transition-transform" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
