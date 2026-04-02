import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock4,
  Trash2
} from 'lucide-react';
import appointmentService from '../services/appointmentService';
import toast from 'react-hot-toast';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getAllAppointments();
      setAppointments(data);
    } catch (err) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await appointmentService.updateAppointment(id, { status: newStatus });
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      toast.success(`Appointment ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await appointmentService.deleteAppointment(id);
      setAppointments(appointments.filter(app => app.id !== id));
      toast.success('Record deleted');
    } catch (err) {
      toast.error('Failed to delete record');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><CheckCircle size={12} /> Confirmed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Clock4 size={12} /> Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">Appointment <span className="text-primary-coral">Log</span></h1>
        <p className="text-gray-500 font-medium">Manage and track all veterinarian consultations.</p>
      </div>

      {loading ? (
        <div className="grid gap-6">
          {[1,2,3].map(i => <div key={i} className="glass p-8 rounded-[32px] h-32 animate-pulse bg-gray-50/50" />)}
        </div>
      ) : appointments.length > 0 ? (
        <div className="grid gap-6">
          {appointments.map((app) => (
            <motion.div 
              layout
              key={app.id} 
              className="glass p-8 rounded-[40px] border border-white/50 shadow-xl flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
              <div className="w-16 h-16 bg-primary-coral/10 text-primary-coral rounded-[24px] flex items-center justify-center flex-shrink-0">
                <Calendar size={32} />
              </div>

              <div className="flex-grow space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Pet & Owner</div>
                  <div className="font-black text-gray-900">{app.pet_name}</div>
                  <div className="text-sm text-gray-500 font-bold">{app.pet_parent_name}</div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Schedule</div>
                  <div className="font-black text-gray-900 flex items-center gap-2">
                    <Calendar size={14} className="text-primary-coral" /> {app.appointment_date}
                  </div>
                  <div className="text-sm text-gray-500 font-bold flex items-center gap-2">
                    <Clock size={14} className="text-primary-coral" /> {app.appointment_time}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Vet / Clinic</div>
                  <div className="font-black text-gray-900">{app.veterinarians?.name || 'Unknown Vet'}</div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{app.veterinarians?.clinic_name}</div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Status</div>
                  <div className="mt-1">{getStatusBadge(app.status)}</div>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => handleStatusUpdate(app.id, 'confirmed')}
                  disabled={app.status === 'confirmed'}
                  className="flex-1 md:flex-none p-3 text-green-500 hover:bg-green-50 rounded-2xl transition-all"
                  title="Confirm"
                >
                  <CheckCircle size={20} />
                </button>
                <button 
                  onClick={() => handleStatusUpdate(app.id, 'cancelled')}
                  disabled={app.status === 'cancelled'}
                  className="flex-1 md:flex-none p-3 text-amber-500 hover:bg-amber-50 rounded-2xl transition-all"
                  title="Cancel"
                >
                  <XCircle size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(app.id)}
                  className="flex-1 md:flex-none p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-[40px] border-2 border-dashed border-gray-100">
          <Calendar className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-xl font-bold text-gray-900">No appointments scheduled</h3>
          <p className="text-gray-500">Scheduled "meetings" will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
