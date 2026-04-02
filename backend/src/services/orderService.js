const supabase = require('../config/supabase');

const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  if (error) throw error;
  return data[0];
};

const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const updateOrder = async (id, updateData) => {
  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder
};
