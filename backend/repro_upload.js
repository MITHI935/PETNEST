const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testUpload() {
  console.log('Testing Supabase with URL:', process.env.SUPABASE_URL);
  
  const testProduct = {
    name: 'Test Product ' + Date.now(),
    brand: 'Test Brand',
    price: 999,
    animal_type: 'dog',
    image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    description: 'Test Description'
  };

  try {
    const { data, error } = await supabase
      .from('pet_food')
      .insert([testProduct])
      .select();

    if (error) {
      console.error('Upload FAILED:', error);
    } else {
      console.log('Upload SUCCESSFUL:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

testUpload();
