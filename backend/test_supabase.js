const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
// Don't log the full key, just the first few chars
console.log('Key (prefix):', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'undefined');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const tables = ['pets', 'pet_food', 'veterinarians', 'orders', 'appointments', 'subscriptions'];
  
  for (const table of tables) {
    console.log(`\nChecking table: ${table}...`);
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        console.error(`Error in ${table}:`, error.message);
      } else {
        console.log(`Successfully connected to ${table}! Found ${data.length} records.`);
        if (data.length > 0) {
          console.log('Sample data:', data[0]);
        }
      }
    } catch (err) {
      console.error(`Unexpected error in ${table}:`, err.message);
    }
  }
}

test();
