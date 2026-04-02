# Business description auto-translation (RO → EN / NL)

The **Add business** and **Edit business** forms include:

1. **Romanian (RO)** — required main description  
2. **English (EN)** and **Dutch (NL)** — optional fields  
3. **“Fill English from RO” / “Fill Dutch from RO”** — calls the Supabase Edge Function `translate-description`, which uses the [DeepL API](https://www.deepl.com/pro-api) (server-side only; your API key is never exposed in the browser).

## One-time setup (Supabase)

1. Create a **DeepL API** account (Free or Pro):  
   - Free API uses `https://api-free.deepl.com` (default in the function).  
   - Pro uses `https://api.deepl.com` — set secret `DEEPL_USE_PRO=true`.

2. In the [Supabase Dashboard](https://supabase.com/dashboard) → **Project Settings** → **Edge Functions** → **Secrets**, add:

   | Name | Value |
   |------|--------|
   | `DEEPL_AUTH_KEY` | Your DeepL authentication key |

3. Deploy the function (from the project root):

   ```bash
   supabase functions deploy translate-description
   ```

4. If you use **Pro** DeepL, also add:

   | Name | Value |
   |------|--------|
   | `DEEPL_USE_PRO` | `true` |

## Behaviour

- Only **logged-in** users can invoke the function (JWT verified).  
- Translation is **RO → EN** or **RO → NL** (source language fixed to Romanian).  
- Maximum length per request: **8000** characters.  
- Owners should **always review** machine-translated text before publishing.

If `DEEPL_AUTH_KEY` is missing, the UI shows a message and users can still paste EN/NL manually.
