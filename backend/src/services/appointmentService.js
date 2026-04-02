const supabase = require('../config/supabase');

const createAppointment = async (appointmentData) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select();

  if (error) throw error;
  return data[0];
};

const getAllAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, veterinarians(*)');

  if (error) throw error;
  return data;
};

const updateAppointment = async (id, updateData) => {
  const { data, error } = await supabase
    .from('appointments')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

const deleteAppointment = async (id) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
};
