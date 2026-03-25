# Flanders Romanian Business Hub

A multilingual web directory connecting the Romanian community in West Flanders, Belgium with trusted local Romanian-owned businesses and essential resources for entrepreneurs.

🌐 **Live site:** [www.ro-businesshub.be](https://www.ro-businesshub.be)

---

## 📋 Table of Contents

- [About the App](#about-the-app)
- [Key Benefits](#key-benefits)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Multilingual Support](#multilingual-support)
- [Testing](#testing)
- [Deployment](#deployment)

---

## About the App

**Flanders Romanian Business Hub** is a community-driven platform designed to:

- Help Romanian businesses in West Flanders gain visibility and attract customers
- Provide residents with an easy way to find trusted Romanian services nearby
- Offer practical tools and resources for Romanian entrepreneurs operating in Belgium

The platform covers a wide range of categories including restaurants, bakeries, construction services, beauty salons, and much more — all sourced from the vibrant Romanian community in the Flanders region.

---

## Key Benefits

### For Business Owners
- 📢 **Free business listing** — add your business and reach thousands of potential customers in the local Romanian community
- 🔍 **Increased visibility** — your business appears in a dedicated directory searched by community members every day
- 📊 **Built-in financial tools** — use the Belgium Tax Calculator and Cash Flow Calculator to manage your finances
- 📚 **Entrepreneur resources** — access guides such as "How to become self-employed in Belgium" in Romanian, English, and Dutch

### For Customers & Community Members
- 🗂️ **Browse by category** — quickly find the type of business or service you need
- 🌍 **Multilingual interface** — use the platform in Romanian, English, or Dutch
- ⭐ **Curated, trusted listings** — businesses are reviewed before appearing on the platform
- 📞 **Direct contact** — get business details, addresses, and contact information at a glance

### For the Community
- 🤝 **Bridges Romanian entrepreneurs with local customers** in Flanders
- 🇷🇴🇧🇪 **Celebrates Romanian culture** while helping integrate into Belgian society
- 📖 **Educational content** — step-by-step guides and an FAQ covering self-employment, taxes, and more

---

## Prerequisites

Before installing the project, make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (comes with Node.js) or **bun** as an alternative package manager
- **Git** — [Install Git](https://git-scm.com/downloads)
- A **Supabase** account (free tier is sufficient) — [supabase.com](https://supabase.com)

---

## Installation

Follow these steps to run the project locally:

### Step 1 — Clone the repository

```bash
git clone https://github.com/GabiMuresan22/flanders-ro-business-hub.git
```

### Step 2 — Navigate into the project directory

```bash
cd flanders-ro-business-hub
```

### Step 3 — Install dependencies

```bash
npm install
```

> Alternatively, if you use **bun**:
> ```bash
> bun install
> ```

### Step 4 — Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and add your configuration (see [Environment Variables](#environment-variables) below).

### Step 5 — Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:8080** with hot-reloading enabled.

> **⚠️ Git Issues?** If you encounter problems pushing your changes (like "fetch first" errors), check out our [Git Troubleshooting Guide](GIT_TROUBLESHOOTING.md) for solutions.

---

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`) and configure the following:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GA_ID` | Google Analytics 4 Measurement ID (optional — only used when users accept analytics cookies) | `G-XXXXXXXXXX` |

> **Note:** Supabase connection details are pre-configured in the project via the built-in Supabase integration and are not stored in `.env`. A Supabase account is only needed if you plan to set up your own database instance for a fork or custom deployment — for contributing to this project you can run the frontend locally without any Supabase credentials.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production (also generates the sitemap) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |
| `npm test` | Run the full test suite with Vitest |
| `npm run test:validation` | Run form validation tests |
| `npm run test:business` | Run database submission tests (requires Supabase access) |
| `npm run test:webdev` | Run Web Developer business tests |
| `npm run migration:check` | Check Dutch translation migration status |
| `npm run migration:verify` | Verify Dutch content structure in the database |

---

## Tech Stack

This project is built with:

| Technology | Purpose |
|------------|---------|
| [Vite](https://vitejs.dev/) | Lightning-fast build tool and dev server |
| [React 19](https://react.dev/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, composable UI components |
| [Supabase](https://supabase.com/) | Backend-as-a-service (database, auth, storage) |
| [React Query](https://tanstack.com/query) | Server state management and data fetching |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [React Hook Form](https://react-hook-form.com/) | Performant form state management |
| [Zod](https://zod.dev/) | Schema validation |
| [Recharts](https://recharts.org/) | Charts for financial tools |
| [Vitest](https://vitest.dev/) | Unit and integration testing |

---

## Multilingual Support

The platform supports three languages:

| Language | Code | URL Parameter |
|----------|------|---------------|
| Romanian | RO | (default) |
| English | EN | `?lang=en` |
| Dutch | NL | `?lang=nl` |

Language switching is handled via the `?lang=` URL parameter. For example:

```
https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl
```

### Applying the Dutch Translation Migration

If Dutch content is not displaying correctly after a fresh setup:

1. **Check migration status:**
   ```bash
   npm run migration:check
   ```

2. **Verify content structure:**
   ```bash
   npm run migration:verify
   ```

3. **Apply the migration** (if needed):
   ```bash
   # Using Supabase CLI (recommended)
   supabase link --project-ref qwwvnxrduakmrgdmiccs
   supabase db push
   ```

   Or apply it manually via the [Supabase SQL Editor](https://supabase.com/dashboard) using the file:
   `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`

**Reference documentation:**
- [`MIGRATION_GUIDE_DUTCH_TRANSLATION.md`](MIGRATION_GUIDE_DUTCH_TRANSLATION.md) — comprehensive step-by-step guide covering all migration scenarios and troubleshooting
- [`APPLY_DUTCH_TRANSLATION.md`](APPLY_DUTCH_TRANSLATION.md) — original technical documentation for the Dutch translation migration (use as a quick reference)

---

## Testing

### Running Tests

```bash
# Run the full test suite
npm test

# Run form validation tests
npm run test:validation

# Run database submission tests (requires Supabase network access)
npm run test:business

# Run Web Developer business test
npm run test:webdev
```

### Test Documentation

| File | Description |
|------|-------------|
| [`TESTING.md`](TESTING.md) | Testing guide and instructions |
| [`TEST_SUMMARY.md`](TEST_SUMMARY.md) | Quick overview of test results |
| [`TEST_RESULTS.md`](TEST_RESULTS.md) | Detailed test execution results |
| [`TESTING_ADD_BUSINESS.md`](TESTING_ADD_BUSINESS.md) | Manual testing procedures for Add Business |
| [`WEB_DEVELOPER_TEST_RESULTS.md`](WEB_DEVELOPER_TEST_RESULTS.md) | Web Developer business test results |

---

## Deployment

### Deploy with Lovable

Open [Lovable](https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907) and click **Share → Publish**.

### Deploy with Vercel

The project includes a `vercel.json` configuration for one-click deployment:

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Add any required environment variables.
4. Click **Deploy**.

### Custom Domain

To connect a custom domain:

- **Lovable:** Navigate to *Project → Settings → Domains* and click **Connect Domain**. See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).
- **Vercel:** Navigate to *Project Settings → Domains* and add your domain.

---

## Editing the Code

**Option A — Use Lovable (no local setup required)**

Visit the [Lovable Project](https://lovable.dev/projects/41908f42-ec12-47e5-8789-f495fa2ac907) and start prompting. Changes are committed automatically.

**Option B — Use your preferred IDE**

Follow the [Installation](#installation) steps above, then open the project in VS Code, WebStorm, or any editor of your choice.

**Option C — Edit directly in GitHub**

Navigate to the file, click the pencil ✏️ icon, make your changes, and commit.

**Option D — GitHub Codespaces**

1. Go to the repository on GitHub.
2. Click **Code → Codespaces → New codespace**.
3. Edit files and commit directly from the browser.
