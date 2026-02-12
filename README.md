# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

> **⚠️ Git Issues?** If you encounter problems pushing your changes (like "fetch first" errors), check out our [Git Troubleshooting Guide](GIT_TROUBLESHOOTING.md) for solutions.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Multilingual Support

This project supports three languages:
- **Romanian (RO)** - Default language
- **English (EN)** - Primary alternative language
- **Dutch (NL)** - For the Belgian/Dutch-speaking community

Language switching is handled via the `?lang=` URL parameter (e.g., `?lang=nl` for Dutch).

### Dutch Translation

The self-employment guide resource "Cum devii independent în Belgia? Ghid complet 2026" has been fully translated to Dutch. 

**If Dutch content is not displaying:**

1. Check if the database migration has been applied:
   ```bash
   node scripts/check-migration.mjs
   ```

2. Apply the migration if needed:
   ```bash
   # Using Supabase CLI
   supabase db push
   
   # Or see APPLY_DUTCH_TRANSLATION.md for manual steps
   ```

See `APPLY_DUTCH_TRANSLATION.md` and `DUTCH_TRANSLATION_DEPLOYMENT.md` for detailed information.

## Testing

This project includes automated tests for the Add Business feature.

### Running Tests

```bash
# Run form validation tests
npm run test:validation

# Run database submission test (requires network access to Supabase)
npm run test:business

# Run Web Developer business test
npm run test:webdev

# Check database migration status
node scripts/check-migration.mjs
```

### Test Documentation

- `TEST_SUMMARY.md` - Quick overview of test results
- `TEST_RESULTS.md` - Detailed test execution results
- `TESTING.md` - Testing guide and instructions
- `TESTING_ADD_BUSINESS.md` - Manual testing procedures
- `WEB_DEVELOPER_TEST_RESULTS.md` - Web Developer business test results

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
