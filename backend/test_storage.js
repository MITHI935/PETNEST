const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorage() {
  console.log('Testing Supabase Storage Connection...');
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error fetching buckets:', error.message);
      return;
    }

    console.log('Available buckets:', buckets.map(b => b.name));
    
    const imagesBucket = buckets.find(b => b.name === 'images');
    if (!imagesBucket) {
      console.error("Bucket 'images' NOT FOUND. You must create a PUBLIC bucket named 'images' in the Supabase Dashboard.");
    } else {
      console.log("Bucket 'images' exists! Public:", imagesBucket.public);
      
      // Test listing files in the bucket
      const { data: files, error: filesError } = await supabase.storage.from('images').list();
      if (filesError) {
        console.error('Error listing files (Check RLS Policies):', filesError.message);
      } else {
        console.log(`Successfully listed ${files.length} files in 'images' bucket.`);
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

testStorage();
