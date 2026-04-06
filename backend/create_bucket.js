const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  console.log('Attempting to create bucket "images"...');
  try {
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('Bucket "images" already exists.');
      } else {
        console.error('Error creating bucket:', error.message);
        console.log('NOTE: Your API key might not have permission to create buckets. Please create it manually in the Supabase Dashboard.');
      }
    } else {
      console.log('Bucket "images" created successfully!', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

createBucket();
