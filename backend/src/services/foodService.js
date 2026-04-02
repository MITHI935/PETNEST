const supabase = require('../config/supabase');

const getAllFood = async (filters = {}) => {
  let query = supabase.from('pet_food').select('*');

  if (filters.brand) {
    query = query.eq('brand', filters.brand);
  }
  if (filters.animalType) {
    query = query.eq('animal_type', filters.animalType);
  }
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

const getFoodById = async (id) => {
  const { data, error } = await supabase
    .from('pet_food')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const createFood = async (foodData) => {
  const { data, error } = await supabase
    .from('pet_food')
    .insert([foodData])
    .select();

  if (error) throw error;
  return data[0];
};

const updateFood = async (id, updateData) => {
  const { data, error } = await supabase
    .from('pet_food')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

const deleteFood = async (id) => {
  const { error } = await supabase
    .from('pet_food')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
