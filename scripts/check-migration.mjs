import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMigration() {
  console.log('Checking database state...\n');
  
  // Check if the resource exists with the correct slug
  const { data: resources, error } = await supabase
    .from('resources')
    .select('*')
    .eq('category', 'Legal');
  
  if (error) {
    console.error('Error fetching resources:', error);
    return;
  }
  
  console.log('Found Legal resources:', resources?.length || 0);
  
  if (resources && resources.length > 0) {
    const resource = resources[0];
    console.log('\nResource details:');
    console.log('- Slug:', resource.slug);
    console.log('- Title (RO):', resource.title);
    console.log('- Title (EN):', resource.title_en || 'NOT SET');
    console.log('- Title (NL):', resource.title_nl || 'NOT SET');
    console.log('- Has content_nl:', !!resource.content_nl);
    console.log('- Has excerpt_nl:', !!resource.excerpt_nl);
    
    const expectedSlug = 'cum-devii-independent-belgia-ghid-complet-2026';
    if (resource.slug !== expectedSlug) {
      console.log('\n⚠️  WARNING: Slug does not match expected value');
      console.log('   Expected:', expectedSlug);
      console.log('   Current:', resource.slug);
    }
    
    if (!resource.title_nl || !resource.content_nl || !resource.excerpt_nl) {
      console.log('\n⚠️  WARNING: Dutch translation is missing or incomplete');
      console.log('   Migration needs to be applied!');
    } else {
      console.log('\n✅ Dutch translation is present in the database');
    }
  } else {
    console.log('\n❌ No Legal resource found in database');
  }
}

checkMigration().catch(console.error);
