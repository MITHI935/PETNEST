import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await orderService.updateOrder(id, { status });
      setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
      toast.success(`Order marked as ${status}`);
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
        <Package size={32} className="text-primary-amber" /> Order Management
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="glass p-8 rounded-[40px] border border-white/50 shadow-xl flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-gray-400 text-sm font-bold"># {order.id.slice(0, 8)}</span>
              </div>
              <div className="text-2xl font-black text-gray-900 mb-2">₹{order.total_amount.toLocaleString()}</div>
              <div className="text-gray-500 font-medium">Items: {order.items?.length || 0} Products</div>
              <div className="text-xs text-gray-400 mt-2">Ordered on {new Date(order.created_at).toLocaleDateString()}</div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <button onClick={() => updateStatus(order.id, 'shipped')} className="px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                <Truck size={18} /> Mark Shipped
              </button>
              <button onClick={() => updateStatus(order.id, 'completed')} className="px-6 py-3 bg-green-50 text-green-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 hover:text-white transition-all">
                <CheckCircle size={18} /> Complete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
