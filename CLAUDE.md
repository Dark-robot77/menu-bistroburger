# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Digital menu system for **Bistroburger Toledo** restaurant. Two surfaces sharing one Supabase real-time database:

- **Carta digital** (`app/page.tsx`) — public, QR-accessible, mobile-first menu. No login, no cart (v1).
- **Panel de administración** (`app/admin/`) — private dashboard for the owner. Product/category management, inline price editing, AI promo generator, PDF export.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (Postgres + real-time + Auth) |
| Styles | Tailwind CSS |
| Images | ImageKit (upload, optimization, transformations) |
| AI captions | OpenAI API (GPT-4o) |
| AI images | KIE AI |
| PDF export | Puppeteer (server) + Ghostscript (CMYK conversion) |
| Deploy | Vercel |

## Common commands

```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Folder architecture

```
app/
  page.tsx                   # Carta pública (public menu)
  admin/
    page.tsx                 # Admin dashboard
    productos/page.tsx
    categorias/page.tsx
    promos/page.tsx          # AI promo generator
    configuracion/page.tsx
  api/
    products/route.ts        # CRUD
    generate-promo/route.ts  # OpenAI + KIE AI
    export-pdf/route.ts      # Puppeteer + Ghostscript
components/
  menu/                      # Public-facing components
  admin/                     # Admin-only components
    PriceEditor.tsx          # Inline price editing
    PromoModal.tsx           # AI promo modal
    PrintModal.tsx           # Print/export options
  ui/                        # Shared reusable components
lib/
  supabase.ts
  openai.ts
  kieai.ts
  pdf.ts                     # Puppeteer logic
types/
  menu.ts                    # TS types for products, categories, etc.
```

## Data model

### `categories`
`id · name · slug · includes_note · addon_note · sort_order · visible · created_at`

### `products`
`id · category_id (fk) · name · description · price · image_url · available · is_new · is_featured · sort_order · created_at · updated_at`

### `extras`
`id · name · price · available · sort_order`

### `price_history`
`id · product_id (fk) · old_price · new_price · changed_at · changed_by (email)`

### `settings`
`key · value` — keys: `logo_url`, `brand_color`, `phone`, `address`, `instagram`

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=

KIEAI_API_KEY=

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
```

## Key implementation notes

**Real-time sync:** Any admin change must reflect immediately on the public menu. Use Supabase real-time subscriptions on the client side for the carta pública.

**PDF CMYK export:** Browser cannot output CMYK natively. Flow: Puppeteer renders to PDF in RGB on the server → Ghostscript converts to CMYK using ISO Coated v2 ICC profile. Minimum 300 DPI for print.

**AI promo flow:** Admin selects product → chooses promo type (Lanzamiento / Descuento / Destacado del día / Vuelta al menú) + target network + optional details → `generate-promo` route calls OpenAI for caption (tone: casual Spanish Spain) and KIE AI for image → modal shows preview + download/copy buttons.

**Admin auth:** Supabase Auth (email + password). All `/admin/*` routes and `/api/*` routes that mutate data must be protected.

**Images:** Products use ImageKit URLs (`ik.imagekit.io`). Use ImageKit's URL transformation parameters for lazy loading and responsive sizing. The `imagekitio-next` package provides `<IKImage>` and `<IKUpload>` components for Phase 2.

**`available` vs deletion:** Products and categories are hidden via `available`/`visible` toggle, never hard-deleted, to preserve price history integrity.

## Development phases (from brief)

- **Fase 1** — Next.js + Supabase setup, data model + seed, public carta (no images), admin login + price editing, Vercel deploy
- **Fase 2** — Cloudinary integration, product images, mobile polish
- **Fase 3** — OpenAI + KIE AI promo generator
- **Fase 4** — Puppeteer + Ghostscript PDF export
- **Fase 5** — SEO, price history log, QR generation, owner docs
