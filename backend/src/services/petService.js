const supabase = require('../config/supabase');

const getAllPets = async (filters = {}) => {
  let query = supabase.from('pets').select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,breed.ilike.%${filters.search}%`);
  }

  // Boosted listings first
  query = query.order('is_boosted', { ascending: false }).order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const getPetById = async (id) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const createPet = async (petData) => {
  const { data, error } = await supabase
    .from('pets')
    .insert([petData])
    .select();

  if (error) throw error;
  return data[0];
};

const updatePet = async (id, updateData) => {
  const { data, error } = await supabase
    .from('pets')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

const deletePet = async (id) => {
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
};
