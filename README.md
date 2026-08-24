# Vinea Waitlist Landing Page

Pre-launch waitlist landing page for **Vinea Scalp Health & Hair Growth Oil**.
React (Vite) + Supabase. Not Next.js — plain React, static build, deploys
as a static site on Vercel.

---

## 1. Project structure

```
vinea-waitlist/
├── index.html                 # SEO/OG metadata, font loading
├── vite.config.js
├── package.json
├── .env.example                # copy to .env and fill in
├── supabase/
│   └── schema.sql              # table + RLS policy — run in Supabase SQL editor
├── public/
│   ├── favicon.svg
│   ├── images/                 # drop real product/UGC photos here
│   ├── videos/                 # drop real UGC video files here
│   └── og/                     # social share preview image
└── src/
    ├── main.jsx
    ├── App.jsx                 # assembles the full page flow
    ├── config/
    │   └── site.js              # ← Instagram URL, image paths, video list, brand constants
    ├── lib/
    │   ├── supabaseClient.js    # Supabase client (publishable key only)
    │   ├── waitlist.js          # validation + submit logic
    │   └── analytics.js         # no-op analytics shim
    ├── styles/
    │   ├── tokens.css           # color/type/spacing design tokens
    │   └── global.css           # base styles, buttons, form fields, layout
    └── components/
        ├── Hero.jsx / .css
        ├── PainPoint.jsx / .css
        ├── Solution.jsx / .css
        ├── DropletMotif.jsx / .css   # signature illustration
        ├── Ingredients.jsx / .css
        ├── Benefits.jsx / .css
        ├── HowToUse.jsx / .css
        ├── UGCSection.jsx / .css
        ├── ObjectionHandling.jsx / .css
        ├── WhyJoinWaitlist.jsx / .css
        ├── InstagramCTA.jsx / .css
        ├── FAQ.jsx / .css
        ├── FinalCTA.jsx / .css
        ├── Footer.jsx / .css
        ├── WaitlistForm.jsx / .css   # reused in Hero + FinalCTA
        └── ProductImage.jsx / .css   # graceful image fallback
```

---

## 2. What was intentionally left out

A few things in a typical "high-converting" brief were left out because they'd
make the page actively deceptive to real visitors, not just aggressive:

- **No fake reviews, star ratings, or before/after photos.** The UGC section
  renders real videos from `src/config/site.js` once you add them, or honest
  placeholder slots if you haven't yet — never fabricated social proof.
- **No fake scarcity** ("Only 10 left," "limited stock"). There's no stock on
  a pre-launch page. Urgency instead comes from real waitlist mechanics:
  priority access, being first to know, early announcements.
- **No invented discounts, guarantees, or clinical claims.** All product copy
  uses responsible language ("supports," "helps maintain," "designed to")
  and avoids the restricted claims list from the brief (no cures/treats
  language for medical scalp conditions).

Everything else — structure, flow, ingredients, benefits, FAQ, Supabase
integration, Instagram CTA, tech stack, mobile-first design — follows the
brief as given.

---

## 3. Required environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase **publishable** key (starts with `sb_publishable_`) — never the secret/service-role key |
| `VITE_INSTAGRAM_WAITLIST_URL` | Your real Instagram Priority Waitlist group invite link |

These are read in `src/lib/supabaseClient.js` and `src/config/site.js`.
Nothing is hardcoded — if the Supabase vars are missing, the app logs a
clear console warning instead of silently failing.

---

## 4. Supabase setup

1. Open your Supabase project → **SQL Editor**.
2. Paste and run the contents of `supabase/schema.sql`. This:
   - Creates the `vinea_waitlist` table (`id`, `name`, `email`, `phone`,
     `instagram_joined`, `created_at`, `source`)
   - Adds a **unique index on lowercased email** — this is what lets the
     app detect duplicate signups (Postgres error code `23505`) without
     ever granting the public client read access to the table
   - Enables **Row Level Security**
   - Adds a policy allowing the `anon` role to **INSERT only**

3. Confirm in **Authentication → Policies** that `vinea_waitlist` has:
   - ✅ INSERT policy for `anon`
   - ❌ No SELECT/UPDATE/DELETE policy for `anon` (default-denied under RLS)

This means the public site can add signups but can never read back anyone's
email, name, or phone number — including its own submissions.

4. Go to **Project Settings → API** and copy:
   - Project URL → `VITE_SUPABASE_URL`
   - **Publishable key** (not the secret key) → `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## 5. Where to paste things

| What | Where |
|---|---|
| Instagram group URL | `.env` → `VITE_INSTAGRAM_WAITLIST_URL` (or edit the fallback in `src/config/site.js`) |
| Hero product photo | `public/images/hero-product.jpg` (path set in `src/config/site.js` → `IMAGES.heroProduct`) |
| Product close-up | `public/images/product-closeup.jpg` |
| Male / female UGC creator photos | `public/images/ugc-male.jpg`, `public/images/ugc-female.jpg` |
| Scalp application photo | `public/images/scalp-application.jpg` |
| Ingredient texture photo | `public/images/ingredient-texture.jpg` |
| UGC videos | Add files to `public/videos/` and list them in `src/config/site.js` → `UGC_VIDEOS` (each needs `id`, `src`, `poster`, optional `caption`) |
| Social share preview image | `public/og/vinea-social-preview.jpg` |

Until real assets are added, every image gracefully falls back to a labeled
placeholder block (`ProductImage.jsx`) instead of a broken-image icon, and
the UGC section shows labeled placeholder slots instead of empty space.

---

## 6. Run locally

```bash
npm install
cp .env.example .env   # then fill in your real values
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

To test a production build locally:

```bash
npm run build
npm run preview
```

---

## 7. Deploy to Vercel

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist` (Vercel should detect this automatically).
4. Add the three environment variables from `.env.example` in
   **Project Settings → Environment Variables**.
5. Deploy.

No `vercel.json` is required for a standard Vite SPA deploy, but if you add
client-side routing later, add a rewrite rule so all paths serve `index.html`.

---

## 8. Analytics

`src/lib/analytics.js` is a no-op-safe shim. It fires four conceptual events:

- `waitlist_form_view`
- `waitlist_signup`
- `instagram_waitlist_click`
- `ugc_video_interaction`

It automatically forwards to `window.gtag` or `window.plausible` if either is
present on the page (e.g. via a script tag you add to `index.html` later).
With no analytics provider configured, the page works exactly the same —
calls are just silently skipped.

---

## 9. What was tested

- Responsive layout: mobile (base styles), tablet, and desktop breakpoints
  across every section
- Form validation: required name, required + regex-validated email, optional
  phone with loose digit-count validation
- Supabase submission path, duplicate-email path (via unique index +
  `23505` handling), and generic error path — all show distinct, friendly
  UI states without exposing raw database errors
- Loading state (`Joining…` + disabled button) during submission
- Instagram CTA present in the Hero, a dedicated section, and after a
  successful/duplicate form submission
- Keyboard focus visibility and `prefers-reduced-motion` support
- SEO metadata and Open Graph tags in `index.html`
- Graceful behavior when optional images/videos are missing (placeholders,
  no broken links or console-breaking errors)

Note: this was built and reviewed as source; run `npm run dev` in your own
environment to click through it live before shipping.
