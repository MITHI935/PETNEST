const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the backend folder
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing SUPABASE_URL or SUPABASE_ANON_KEY in backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixBucket() {
  console.log('--- Supabase Bucket Fixer ---');
  console.log(`Target URL: ${supabaseUrl}`);

  // 1. Check if 'images' bucket exists, create if it doesn't
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError.message);
    return;
  }

  const bucketName = 'images';
  const exists = buckets.find(b => b.name === bucketName);

  if (!exists) {
    console.log(`Bucket "${bucketName}" not found. Creating it...`);
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true, // THIS IS THE CRITICAL PART
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (createError) {
      console.error('Error creating bucket:', createError.message);
    } else {
      console.log('✅ Bucket created successfully as PUBLIC.');
    }
  } else {
    console.log(`Bucket "${bucketName}" exists. Updating to PUBLIC...`);
    const { error: updateError } = await supabase.storage.updateBucket(bucketName, {
      public: true
    });

    if (updateError) {
      console.error('Error updating bucket:', updateError.message);
    } else {
      console.log('✅ Bucket access updated to PUBLIC.');
    }
  }

  console.log('\n--- NEXT STEPS ---');
  console.log('1. Go to your Supabase Dashboard: https://app.supabase.com');
  console.log('2. Navigate to Storage -> Buckets -> images.');
  console.log('3. Ensure "Public bucket" toggle is ON.');
  console.log('4. IMPORTANT: Go to "Policies" and ensure there is a "Select" policy allowing public access.');
  console.log('   (Policy: ALLOW ALL USERS TO SELECT FILES FROM BUCKET "images")');
}

fixBucket();
