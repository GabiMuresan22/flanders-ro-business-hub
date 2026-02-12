#!/usr/bin/env node

/**
 * Migration Check Script
 * 
 * This script verifies if the Dutch translation migration has been applied
 * to the Supabase database.
 * 
 * Usage:
 *   node scripts/check-migration.mjs
 * 
 * The script will:
 * - Check if the Legal resource exists
 * - Verify the slug is correct
 * - Check if Dutch translations (title_nl, excerpt_nl, content_nl) are present
 * - Report the migration status
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const EXPECTED_SLUG = 'cum-devii-independent-belgia-ghid-complet-2026';

async function checkMigration() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Dutch Translation Migration Check');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('📡 Connecting to Supabase database...');
  console.log(`   URL: ${supabaseUrl}\n`);
  
  try {
    // Check if the resource exists with the correct slug
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .eq('category', 'Legal');
    
    if (error) {
      console.error('❌ Error fetching resources from database:');
      console.error('   ', error.message || error);
      console.error('\nPlease check:');
      console.error('   - Your internet connection');
      console.error('   - Supabase credentials are correct');
      console.error('   - Database permissions');
      return;
    }
    
    console.log(`✅ Connected successfully`);
    console.log(`📊 Found ${resources?.length || 0} Legal resource(s)\n`);
    
    if (!resources || resources.length === 0) {
      console.log('❌ No Legal resource found in database');
      console.log('\n⚠️  ACTION REQUIRED:');
      console.log('   The migration needs to be applied to create the resource.');
      console.log('   See APPLY_DUTCH_TRANSLATION.md for instructions.');
      return;
    }
    
    const resource = resources[0];
    
    console.log('───────────────────────────────────────────────────────');
    console.log('  Resource Details');
    console.log('───────────────────────────────────────────────────────');
    console.log(`Slug:         ${resource.slug}`);
    console.log(`Category:     ${resource.category}`);
    console.log(`Created:      ${new Date(resource.created_at).toLocaleDateString()}`);
    console.log('');
    console.log('Titles:');
    console.log(`  RO: ${resource.title?.substring(0, 60)}...`);
    console.log(`  EN: ${resource.title_en ? resource.title_en.substring(0, 60) + '...' : '❌ NOT SET'}`);
    console.log(`  NL: ${resource.title_nl ? resource.title_nl.substring(0, 60) + '...' : '❌ NOT SET'}`);
    console.log('');
    console.log('Content Status:');
    console.log(`  excerpt_nl: ${resource.excerpt_nl ? `✅ Present (${resource.excerpt_nl.length} chars)` : '❌ Missing'}`);
    console.log(`  content_nl: ${resource.content_nl ? `✅ Present (${resource.content_nl.length} chars)` : '❌ Missing'}`);
    console.log('───────────────────────────────────────────────────────\n');
    
    // Check slug
    let hasIssues = false;
    
    if (resource.slug !== EXPECTED_SLUG) {
      console.log('⚠️  SLUG MISMATCH');
      console.log(`   Expected: ${EXPECTED_SLUG}`);
      console.log(`   Current:  ${resource.slug}`);
      console.log('   The migration needs to update the slug.\n');
      hasIssues = true;
    } else {
      console.log(`✅ Slug is correct: ${EXPECTED_SLUG}\n`);
    }
    
    // Check Dutch translation
    if (!resource.title_nl || !resource.content_nl || !resource.excerpt_nl) {
      console.log('⚠️  DUTCH TRANSLATION INCOMPLETE');
      console.log('   Missing fields:');
      if (!resource.title_nl) console.log('   - title_nl');
      if (!resource.excerpt_nl) console.log('   - excerpt_nl');
      if (!resource.content_nl) console.log('   - content_nl');
      console.log('');
      hasIssues = true;
    } else {
      console.log('✅ All Dutch translation fields are present\n');
    }
    
    // Final verdict
    console.log('═══════════════════════════════════════════════════════');
    if (hasIssues) {
      console.log('  ⚠️  MIGRATION STATUS: NOT APPLIED');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('ACTION REQUIRED:');
      console.log('The Dutch translation migration needs to be applied.');
      console.log('\nSee APPLY_DUTCH_TRANSLATION.md for detailed instructions on:');
      console.log('  1. Using Supabase CLI: supabase db push');
      console.log('  2. Using Supabase SQL Editor (manual)');
      console.log('\nMigration file: supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql');
    } else {
      console.log('  ✅ MIGRATION STATUS: APPLIED');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('SUCCESS!');
      console.log('The Dutch translation is properly configured in the database.');
      console.log('\nTest URLs:');
      console.log(`  RO: https://www.ro-businesshub.be/resurse/${resource.slug}`);
      console.log(`  EN: https://www.ro-businesshub.be/resurse/${resource.slug}?lang=en`);
      console.log(`  NL: https://www.ro-businesshub.be/resurse/${resource.slug}?lang=nl`);
    }
    console.log('');
    
  } catch (err) {
    console.error('\n❌ Unexpected error:');
    console.error('   ', err.message || err);
  }
}

checkMigration().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
