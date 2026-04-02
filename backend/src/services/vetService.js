const supabase = require('../config/supabase');

const getAllVets = async (filters = {}) => {
  let query = supabase.from('veterinarians').select('*');

  if (filters.specialization) {
    query = query.eq('specialization', filters.specialization);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,clinic_name.ilike.%${filters.search}%`);
  }

  // Verified vets first
  query = query.order('is_verified', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const getVetById = async (id) => {
  const { data, error } = await supabase
    .from('veterinarians')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const createVet = async (vetData) => {
  const { data, error } = await supabase
    .from('veterinarians')
    .insert([vetData])
    .select();

  if (error) throw error;
  return data[0];
};

const updateVet = async (id, updateData) => {
  const { data, error } = await supabase
    .from('veterinarians')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

const deleteVet = async (id) => {
  const { error } = await supabase
    .from('veterinarians')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

module.exports = {
  getAllVets,
  getVetById,
  createVet,
  updateVet,
  deleteVet
};
