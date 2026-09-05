# PathYatra Partner — Pre-Apply Landing Page

A fast, bilingual (English default + Hindi toggle) early-access landing page for bus owners.
Built with **Next.js 14 (App Router) + Tailwind CSS**, form data stored in **Supabase**,
deployed on **Vercel**.

## Project structure

```
app/
  layout.js          # HTML shell, fonts, SEO metadata
  page.js            # The full landing page (hero, benefits, form, success modal)
  globals.css        # Tailwind + base styles
lib/
  translations.js    # All EN + HI copy in one place
  supabaseClient.js  # Supabase browser client
supabase/
  schema.sql         # Table + Row Level Security policy — run once in Supabase
.env.local.example   # Copy to .env.local and fill in your keys
```

## 1. Install & run locally

```bash
npm install
cp .env.local.example .env.local   # then edit with your Supabase keys
npm run dev                         # http://localhost:3000
```

> Note: dependencies could not be installed in the build sandbox (no network access),
> so run `npm install` on your own machine. If you hit a version issue, `npm install`
> will resolve the latest compatible versions automatically.

## 2. Set up Supabase (storage)

1. Create a project at https://supabase.com.
2. Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it.
   This creates the `pre_applications` table and a policy that lets the public page
   **insert** applications but **not read** them (only you, via the dashboard, can read).
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (SECRET — only for the admin panel)
4. Put all keys into `.env.local`, and set an `ADMIN_PASSWORD` of your choice.

Submitted applications appear under **Table Editor → pre_applications** in Supabase,
or in the built-in admin panel (see below).

## Admin panel — view all applications

Open **`/admin`** (e.g. `http://localhost:3000/admin` or `https://yourdomain.com/admin`).
Enter the `ADMIN_PASSWORD` you set. You'll see every application with search, a
one-click WhatsApp link per owner, a Refresh button, and CSV export.

How it stays secure: the public landing page can only *insert* (RLS blocks reads with
the anon key). The admin panel reads through a server-only API route
(`app/api/admin/list`) that uses the `service_role` key — this key lives only on the
server and is never sent to the browser. Access is gated by `ADMIN_PASSWORD`.

## SEO

On-page SEO is already built in:

- `app/layout.js` — page title, meta description (~155 chars), canonical URL, keywords,
  robots directives, OpenGraph + Twitter card (banner image), theme colour, favicon.
- `app/layout.js` also embeds JSON-LD structured data (Organization, WebSite, WebPage,
  SoftwareApplication) including your social profile links, so Google can connect the
  brand to your Instagram / YouTube / X / Facebook accounts.
- `app/robots.js` → serves `/robots.txt` (allows the site, blocks `/admin` and `/api`).
- `app/sitemap.js` → serves `/sitemap.xml`.
- `app/admin/layout.js` — marks the admin panel `noindex, nofollow`.

The site URL used for canonical/sitemap defaults to `https://pathyatra.com`. To change it,
set `NEXT_PUBLIC_SITE_URL` in Vercel's Environment Variables.

### Getting Google to show title + description

Code alone does not put a site in Google — it must be submitted and crawled:

1. Go to https://search.google.com/search-console and add your domain as a property
   (Domain property → `pathyatra.com` → add the TXT record it gives you at your
   registrar's DNS, same place you added the Vercel records).
2. Once verified, open **Sitemaps**, enter `sitemap.xml`, and submit.
3. Open **URL Inspection**, paste `https://pathyatra.com/`, then click
   **Request Indexing**. Repeat after any big content change.
4. Also add the site to Bing: https://www.bing.com/webmasters (one-click import from
   Google Search Console).

Re-crawling usually takes a few days to two weeks. Until then the old bare-URL listing
may still show.

### Checking your work

- Structured data: https://search.google.com/test/rich-results
- Social preview: paste the URL into WhatsApp or https://www.opengraph.xyz
- Speed / SEO score: https://pagespeed.web.dev

## 3. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project**, import the repo (framework auto-detects as Next.js).
3. Under **Environment Variables**, add all four values:
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_PASSWORD`.
4. Deploy.

## 4. Connect your domain

1. In Vercel: **Project → Settings → Domains → Add**, enter your domain.
2. At your domain registrar, add the DNS records Vercel shows (usually an `A` record
   to `76.76.21.21` for the root, and a `CNAME` to `cname.vercel-dns.com` for `www`).
3. Wait for DNS to propagate — Vercel issues the SSL certificate automatically.

## Customisation checklist

- **WhatsApp group link:** replace `WHATSAPP_GROUP_URL` in `app/page.js`.
- **Copy / wording:** everything lives in `lib/translations.js` (both languages).
- **Colours:** edit the `brand` / `accent` palette in `tailwind.config.js`.
- **Add fields later:** add to the form in `page.js`, the insert object, and a column in `schema.sql`.

## Security notes

- Only the **anon** key is exposed to the browser — never the service-role key.
- Row Level Security is ON: the public can add applications but cannot list or read them.
- Basic client-side validation (name, 10-digit mobile, city, fleet size) is in place;
  for extra safety you can later add a Supabase database check constraint or a captcha.
