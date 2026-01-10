# Pre-Launch Checklist

**Project:** Flanders Ro Business  
**Date:** January 2025

---

## ✅ Critical Requirements (Must Complete)

### 1. Environment Variables Setup

#### Frontend Environment Variables
Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Where to find these:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the "Project URL" and "anon/public" key

#### Supabase Edge Functions Environment Variables
For email notifications to work, set these in Supabase Dashboard:

1. Go to Supabase Dashboard > Edge Functions > Settings
2. Add environment variable:
   - `RESEND_API_KEY` - Your Resend API key for sending emails

**To get Resend API key:**
- Sign up at https://resend.com
- Create an API key in the dashboard
- Add it to Supabase Edge Functions environment variables

**⚠️ Important:** Never commit `.env` files to git! They should be in `.gitignore`

---

### 2. Database Migrations

Ensure all database migrations are applied to your production Supabase instance:

```bash
# Check if you have Supabase CLI installed
supabase --version

# Link to your project (if not already linked)
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

**Or manually:**
- Go to Supabase Dashboard > SQL Editor
- Run all migration files from `supabase/migrations/` in order

---

### 3. Production Build Test

Test the production build locally:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

**Check for:**
- ✅ Build completes without errors
- ✅ All pages load correctly
- ✅ Images and assets load
- ✅ API calls work
- ✅ Authentication works
- ✅ Forms submit correctly

---

### 4. Security Checks

- [ ] **API Keys**: Verify `.env` is in `.gitignore` and not committed
- [ ] **Supabase RLS**: Ensure Row Level Security policies are enabled
- [ ] **CORS**: Verify CORS settings in Supabase are configured correctly
- [ ] **Rate Limiting**: Consider adding rate limiting for forms (anti-spam is already implemented)

---

### 5. Supabase Configuration

#### Row Level Security (RLS)
Verify RLS policies are enabled on all tables:
- `businesses`
- `reviews`
- `contact_messages`
- `profiles`
- `user_roles`

#### Database Functions
Ensure these are deployed:
- `notify-new-business` edge function
- `notify-new-contact` edge function

**Deploy edge functions:**
```bash
supabase functions deploy notify-new-business
supabase functions deploy notify-new-contact
```

---

## 🔍 Recommended Checks

### 6. Performance Optimization

- [ ] **Bundle Size**: Consider code-splitting (main bundle is 513KB - see TODO_DEVELOPMENT_TASKS.md)
- [ ] **Image Optimization**: Ensure images are optimized
- [ ] **Lazy Loading**: Verify lazy loading is working for images

### 7. SEO & Metadata

- [ ] **Meta Tags**: Verify SEO component is working
- [ ] **Structured Data**: Check structured data is valid
- [ ] **Sitemap**: Consider adding a sitemap.xml
- [ ] **Robots.txt**: Verify robots.txt is configured

### 8. Error Handling

- [ ] **Error Boundaries**: Test error boundaries work
- [ ] **404 Page**: Verify 404 page displays correctly
- [ ] **Network Errors**: Test behavior when offline/network fails

### 9. Browser Testing

Test in major browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 10. Functionality Testing

- [ ] **User Registration/Login**: Test auth flow
- [ ] **Add Business**: Test business submission
- [ ] **Search**: Test search functionality
- [ ] **Categories**: Test category filtering
- [ ] **Reviews**: Test review submission
- [ ] **Contact Form**: Test contact form submission
- [ ] **Admin Dashboard**: Test admin features (if applicable)

---

## 📋 Deployment Steps

### Option 1: Deploy via Lovable (Recommended)

1. Open [Lovable Project](https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907)
2. Click **Share** → **Publish**
3. Follow the deployment wizard
4. Configure environment variables in deployment settings

### Option 2: Manual Deployment

#### For Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### For Netlify:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### For Other Platforms:
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure environment variables in hosting dashboard
4. Set up redirect rules (SPA routing)

---

## 🚨 Post-Launch Monitoring

### Set Up Monitoring

1. **Error Tracking**: Consider adding Sentry or similar
2. **Analytics**: Add Google Analytics or similar
3. **Uptime Monitoring**: Set up uptime monitoring (UptimeRobot, etc.)
4. **Performance Monitoring**: Monitor Core Web Vitals

### Regular Maintenance

- [ ] Monitor Supabase usage and costs
- [ ] Review and moderate business submissions
- [ ] Check error logs regularly
- [ ] Update dependencies periodically
- [ ] Backup database regularly

---

## 📝 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Create .env file with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

# 3. Test build
npm run build
npm run preview

# 4. Run tests
npm test
npm run lint

# 5. Start development server
npm run dev
```

---

## ⚠️ Common Issues & Solutions

### Issue: Environment variables not working
**Solution:** 
- Ensure variables start with `VITE_` prefix
- Restart dev server after adding variables
- Check `.env` file is in project root

### Issue: Build fails
**Solution:**
- Run `npm run lint` to check for errors
- Ensure all TypeScript errors are fixed
- Check for missing dependencies

### Issue: Database connection fails
**Solution:**
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Verify RLS policies allow access

### Issue: Email notifications not working
**Solution:**
- Verify `RESEND_API_KEY` is set in Supabase Edge Functions
- Check Resend API key is valid
- Verify edge functions are deployed

---

## ✅ Final Checklist Before Going Live

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Production build tested successfully
- [ ] All critical functionality tested
- [ ] Security checks completed
- [ ] Error handling verified
- [ ] SEO metadata configured
- [ ] Browser compatibility tested
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

**Ready to launch?** Once all items above are checked, you're good to go! 🚀
