const supabase = require('../config/supabase');

const createSubscription = async (subscriptionData) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([subscriptionData])
    .select();

  if (error) throw error;
  return data[0];
};

const getAllSubscriptions = async () => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*');

  if (error) throw error;
  return data;
};

module.exports = {
  createSubscription,
  getAllSubscriptions
};
