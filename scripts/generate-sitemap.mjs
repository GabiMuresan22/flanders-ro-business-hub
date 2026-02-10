import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const SITE_URL = 'https://www.ro-businesshub.be';

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/categories', priority: '0.9', changefreq: 'weekly' },
  { path: '/resurse', priority: '0.85', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { path: '/auth', priority: '0.5', changefreq: 'monthly' },
  { path: '/resurse', priority: '0.8', changefreq: 'weekly' },
  // Category pages
  { path: '/category/restaurant', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/bakery', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/grocery', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/beauty-salon', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/car-service', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/construction', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/transport', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/travel-agency', priority: '0.8', changefreq: 'weekly' },
];

async function generateSitemap() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  let businessUrls = [];
  let resourceUrls = [];

  // Fetch dynamic pages if Supabase is configured
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Fetch approved businesses
      const { data: businesses, error: bizError } = await supabase
        .from('public_businesses')
        .select('id, updated_at')
        .eq('status', 'approved');

      if (!bizError && businesses) {
        businessUrls = businesses.map((business) => ({
          path: `/business/${business.id}`,
          priority: '0.7',
          changefreq: 'weekly',
          lastmod: business.updated_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        }));
        console.log(`Found ${businesses.length} approved businesses`);
      } else if (bizError) {
        console.warn('Could not fetch businesses:', bizError.message);
      }

      // Fetch published resources
      const { data: resources, error: resError } = await supabase
        .from('resources')
        .select('slug, created_at')
        .eq('is_published', true);

      if (!resError && resources) {
        resourceUrls = resources.map((resource) => ({
          path: `/resurse/${resource.slug}`,
          priority: '0.75',
          changefreq: 'monthly',
          lastmod: resource.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        }));
        console.log(`Found ${resources.length} published resources`);
      } else if (resError) {
        console.warn('Could not fetch resources:', resError.message);
      }
    } catch (err) {
      console.warn('Supabase connection failed, generating sitemap without dynamic pages');
    }
  } else {
    console.warn('Supabase not configured, generating sitemap with static pages only');
  }

  const today = new Date().toISOString().split('T')[0];

  const allUrls = [
    ...staticRoutes.map((route) => ({ ...route, lastmod: today })),
    ...businessUrls,
    ...resourceUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log(`✓ Sitemap generated with ${allUrls.length} URLs`);
}

generateSitemap();
