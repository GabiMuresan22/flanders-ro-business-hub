#!/usr/bin/env node

/**
 * Comprehensive Dutch Content Verification Script
 *
 * This script performs detailed verification of the Dutch translation
 * for the self-employed guide, checking both database content and
 * expected structure.
 *
 * Usage:
 *   node scripts/verify-dutch-content.mjs
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const EXPECTED_SLUG = 'cum-devii-independent-belgia-ghid-complet-2026';
const EXPECTED_TITLE_NL = 'Hoe word je zelfstandige in BelgiÃ«? Volledige gids 2026';
const EXPECTED_SECTIONS = [
  'Soorten zelfstandigheid: Hoofdberoep vs. Bijberoep',
  'De juridische vorm kiezen: Eenmanszaak of vennootschap (BV)?',
  'Stappen en vereiste documenten voor registratie in 2026',
  'Professionele bankrekening',
  'Registratie bij KBO/BCE',
  'Activering BTW-nummer',
  'Registratie bij een sociaal verzekeringsfonds',
  'Maandelijkse kosten en optimalisatie: De rol van de accountant',
  'De "test"-oplossing: Payrolling via Tentoo',
  'Je bedrijf verdient gezien te worden!',
];

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Missing Supabase credentials');
  console.error(
    'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env file',
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function checkContentSection(content, section) {
  if (!content) return false;
  return content.includes(section);
}

function analyzeContent(content) {
  if (!content) {
    return {
      length: 0,
      paragraphs: 0,
      hasStructure: false,
      sections: [],
    };
  }

  const paragraphs = content
    .split('\n\n')
    .filter((paragraph) => paragraph.trim().length > 0);
  const foundSections = EXPECTED_SECTIONS.filter((section) =>
    content.includes(section),
  );

  return {
    length: content.length,
    paragraphs: paragraphs.length,
    hasStructure: paragraphs.length > 5,
    sections: foundSections,
  };
}

async function verifyDutchContent() {
  console.log('============================================================');
  console.log('  Dutch Content Comprehensive Verification');
  console.log('============================================================\n');

  console.log('Connecting to Supabase...');
  console.log(`  URL: ${supabaseUrl}\n`);

  try {
    const { data: resource, error } = await supabase
      .from('resources')
      .select('*')
      .eq('slug', EXPECTED_SLUG)
      .maybeSingle();

    if (error) {
      console.error('Database Error:', error.message);
      console.error('\nPlease verify:');
      console.error('  - Supabase credentials are correct');
      console.error('  - Internet connection is stable');
      console.error('  - Database permissions are granted');
      return;
    }

    if (!resource) {
      console.error('No matching self-employed guide resource found in database');
      console.error('\nThe migration has not been applied.');
      console.error('See MIGRATION_GUIDE_DUTCH_TRANSLATION.md for instructions.');
      return;
    }

    console.log('Successfully connected to database');
    console.log(`Target resource found (ID: ${resource.id})\n`);

    const roAnalysis = analyzeContent(resource.content);
    const enAnalysis = analyzeContent(resource.content_en);
    const nlAnalysis = analyzeContent(resource.content_nl);

    console.log('============================================================');
    console.log('  Resource Information');
    console.log('============================================================');
    console.log(`Slug:      ${resource.slug}`);
    console.log(`Category:  ${resource.category}`);
    console.log(`Created:   ${new Date(resource.created_at).toLocaleDateString()}`);
    console.log('');

    console.log('------------------------------------------------------------');
    console.log('  Slug Verification');
    console.log('------------------------------------------------------------');
    if (resource.slug === EXPECTED_SLUG) {
      console.log(`Correct: ${resource.slug}`);
    } else {
      console.log('Incorrect slug');
      console.log(`  Expected: ${EXPECTED_SLUG}`);
      console.log(`  Current:  ${resource.slug}`);
    }
    console.log('');

    console.log('------------------------------------------------------------');
    console.log('  Title Verification');
    console.log('------------------------------------------------------------');
    console.log(`RO: ${resource.title ? resource.title.substring(0, 70) : 'MISSING'}...`);
    console.log(
      `EN: ${
        resource.title_en ? resource.title_en.substring(0, 70) : 'MISSING'
      }...`,
    );
    console.log(
      `NL: ${
        resource.title_nl ? resource.title_nl.substring(0, 70) : 'MISSING'
      }...`,
    );

    if (resource.title_nl === EXPECTED_TITLE_NL) {
      console.log('Dutch title matches expected value');
    } else if (resource.title_nl) {
      console.log('Dutch title exists but differs from expected');
    }
    console.log('');

    console.log('------------------------------------------------------------');
    console.log('  Excerpt Verification');
    console.log('------------------------------------------------------------');
    console.log(`RO: ${resource.excerpt ? `${resource.excerpt.length} chars` : 'MISSING'}`);
    console.log(
      `EN: ${resource.excerpt_en ? `${resource.excerpt_en.length} chars` : 'MISSING'}`,
    );
    console.log(
      `NL: ${resource.excerpt_nl ? `${resource.excerpt_nl.length} chars` : 'MISSING'}`,
    );
    console.log('');

    console.log('------------------------------------------------------------');
    console.log('  Content Analysis');
    console.log('------------------------------------------------------------');
    console.log('\nRomanian Content:');
    console.log(`  Length:      ${roAnalysis.length.toLocaleString()} characters`);
    console.log(`  Paragraphs:  ${roAnalysis.paragraphs}`);
    console.log(`  Structured:  ${roAnalysis.hasStructure ? 'Yes' : 'No'}`);
    console.log(`  Sections:    ${roAnalysis.sections.length}/${EXPECTED_SECTIONS.length}`);

    console.log('\nEnglish Content:');
    console.log(`  Length:      ${enAnalysis.length.toLocaleString()} characters`);
    console.log(`  Paragraphs:  ${enAnalysis.paragraphs}`);
    console.log(`  Structured:  ${enAnalysis.hasStructure ? 'Yes' : 'No'}`);
    console.log(`  Sections:    ${enAnalysis.sections.length}/${EXPECTED_SECTIONS.length}`);

    console.log('\nDutch Content:');
    console.log(`  Length:      ${nlAnalysis.length.toLocaleString()} characters`);
    console.log(`  Paragraphs:  ${nlAnalysis.paragraphs}`);
    console.log(`  Structured:  ${nlAnalysis.hasStructure ? 'Yes' : 'No'}`);
    console.log(`  Sections:    ${nlAnalysis.sections.length}/${EXPECTED_SECTIONS.length}`);
    console.log('');

    console.log('------------------------------------------------------------');
    console.log('  Dutch Content Section Verification');
    console.log('------------------------------------------------------------');

    let allSectionsFound = true;
    const dutchContent = resource.content_nl || '';

    console.log('\nExpected sections:');
    EXPECTED_SECTIONS.forEach((section, index) => {
      const found = checkContentSection(dutchContent, section);
      console.log(
        `${found ? 'OK' : 'MISSING'} ${index + 1}. ${section.substring(0, 60)}${
          section.length > 60 ? '...' : ''
        }`,
      );
      if (!found) allSectionsFound = false;
    });
    console.log('');

    console.log('============================================================');
    console.log('  Overall Assessment');
    console.log('============================================================\n');

    const issues = [];

    if (resource.slug !== EXPECTED_SLUG) {
      issues.push('Slug does not match expected value');
    }

    if (!resource.title_nl) {
      issues.push('Dutch title is missing');
    }

    if (!resource.excerpt_nl) {
      issues.push('Dutch excerpt is missing');
    }

    if (!resource.content_nl) {
      issues.push('Dutch content is missing');
    } else if (nlAnalysis.length < 1000) {
      issues.push('Dutch content is too short (might be incomplete)');
    }

    if (!allSectionsFound) {
      issues.push(
        `Only ${nlAnalysis.sections.length}/${EXPECTED_SECTIONS.length} sections found in Dutch content`,
      );
    }

    if (issues.length === 0) {
      console.log('SUCCESS - Migration is properly applied!\n');
      console.log('All checks passed:');
      console.log('  - Correct slug');
      console.log('  - Dutch title present');
      console.log('  - Dutch excerpt present');
      console.log('  - Dutch content present and complete');
      console.log('  - All required sections found');
      console.log('\nTest URLs:');
      console.log(`  RO: https://www.ro-businesshub.be/resurse/${resource.slug}`);
      console.log(`  EN: https://www.ro-businesshub.be/resurse/${resource.slug}?lang=en`);
      console.log(`  NL: https://www.ro-businesshub.be/resurse/${resource.slug}?lang=nl`);
    } else {
      console.log('ISSUES FOUND - Migration may not be applied correctly\n');
      console.log('Issues detected:');
      issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
      console.log('\nAction required:');
      console.log('  1. Review MIGRATION_GUIDE_DUTCH_TRANSLATION.md');
      console.log('  2. Apply the migration using one of the recommended methods');
      console.log('  3. Run this script again to verify');
      console.log(
        '\nMigration file: supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql',
      );
    }

    console.log('\n============================================================\n');
  } catch (err) {
    console.error('\nUnexpected error:');
    console.error(`  ${err.message || err}`);
    if (err.stack) {
      console.error('\nStack trace:');
      console.error(err.stack);
    }
  }
}

verifyDutchContent().catch((err) => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
