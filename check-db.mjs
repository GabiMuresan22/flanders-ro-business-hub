import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qwwvnxrduakmrgdmiccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3d3ZueHJkdWFrbXJnZG1pY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Nzg3NDUsImV4cCI6MjA3NjA1NDc0NX0.NsZmcanG3F1m7tNubq81DdH45mMAf7W7KS6A8lplNvM';

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from('public_businesses')
  .select('id, name, category');

if (error) {
  console.log('Error:', error);
} else {
  console.log('Businesses in database:');
  console.log(JSON.stringify(data, null, 2));
  
  // Group by category
  const byCategory = {};
  data.forEach(b => {
    if (!byCategory[b.category]) byCategory[b.category] = [];
    byCategory[b.category].push(b.name);
  });
  
  console.log('\n\nBy category:');
  Object.entries(byCategory).forEach(([cat, businesses]) => {
    console.log(`${cat}: ${businesses.length} businesses`);
    businesses.forEach(b => console.log(`  - ${b}`));
  });
}
