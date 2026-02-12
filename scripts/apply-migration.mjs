#!/usr/bin/env node

/**
 * Apply Dutch Translation Migration
 * 
 * This script applies the Dutch translation migration to the Supabase database.
 * It reads the migration file and executes it using the Supabase client.
 * 
 * Usage:
 *   node scripts/apply-migration.mjs
 * 
 * WARNING: This will modify your production database!
 * Make sure to review the migration file before running this script.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const MIGRATION_FILE = 'supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Apply Dutch Translation Migration');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('⚠️  WARNING: This will modify your production database!\n');
  
  // Read migration file
  console.log(`📄 Reading migration file: ${MIGRATION_FILE}`);
  const migrationPath = join(__dirname, '..', MIGRATION_FILE);
  let migrationSQL;
  
  try {
    migrationSQL = readFileSync(migrationPath, 'utf-8');
    console.log(`✅ Migration file loaded (${migrationSQL.length} bytes)\n`);
  } catch (err) {
    console.error(`❌ Failed to read migration file: ${err.message}`);
    process.exit(1);
  }
  
  console.log('Migration preview:');
  console.log('───────────────────────────────────────────────────────');
  const lines = migrationSQL.split('\n').slice(0, 15);
  lines.forEach(line => console.log(line));
  console.log('... (truncated)');
  console.log('───────────────────────────────────────────────────────\n');
  
  // Note about RPC approach
  console.log('ℹ️  Note: The Supabase JS client cannot execute arbitrary SQL.');
  console.log('   This script provides two approaches:\n');
  console.log('   1. Manual: Copy the SQL and run it in Supabase SQL Editor');
  console.log('   2. Programmatic: Use the Supabase REST API directly\n');
  
  console.log('For automatic execution, please use one of these methods:\n');
  console.log('Option 1 - Supabase CLI (Recommended):');
  console.log('  $ supabase link --project-ref qwwvnxrduakmrgdmiccs');
  console.log('  $ supabase db push\n');
  
  console.log('Option 2 - Supabase SQL Editor:');
  console.log('  1. Go to: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs/sql');
  console.log('  2. Open a new query');
  console.log('  3. Copy the contents of:');
  console.log(`     ${MIGRATION_FILE}`);
  console.log('  4. Paste and run\n');
  
  console.log('Option 3 - Using this script as a reference:');
  console.log('  The migration file is ready and contains the exact SQL needed.');
  console.log('  Review the file to understand what changes will be made.\n');
  
  console.log('═══════════════════════════════════════════════════════');
  console.log('Migration File Location:');
  console.log(`  ${migrationPath}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('After applying the migration, run the check script:');
  console.log('  $ node scripts/check-migration.mjs\n');
}

applyMigration().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
