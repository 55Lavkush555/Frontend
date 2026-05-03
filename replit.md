# Lavkush — Portfolio

A production-ready full-stack personal portfolio built with Next.js 16 (App Router), Tailwind CSS v4, and MongoDB.

## Tech Stack
- **Framework:** Next.js 16.2.4 (App Router, JavaScript only)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB via Mongoose
- **Markdown:** `marked`
- **Port:** 5000

## Folder Structure

```
portfolio/
├── app/
│   ├── page.js                     # Home page (server component, uses services)
│   ├── layout.js                   # Root layout (Navbar + Footer)
│   ├── globals.css                 # Global styles + prose + animations
│   ├── blog/
│   │   ├── page.js                 # Blog listing (client — search + pagination)
│   │   └── [slug]/page.js          # Blog detail (server, uses blogService)
│   ├── work/
│   │   ├── page.js                 # Work/Projects listing (server, uses projectService)
│   │   └── [slug]/page.js          # Project detail (server, uses projectService)
│   ├── contact/page.js             # Contact form (client — POST /api/messages)
│   ├── admin/
│   │   ├── page.js                 # Login page
│   │   ├── dashboard/page.js       # Dashboard with stats
│   │   ├── blogs/page.js           # Blog CRUD panel
│   │   ├── projects/page.js        # Project CRUD panel
│   │   └── messages/page.js        # Messages inbox
│   └── api/
│       ├── admin/login/route.js    # Auth: POST (login), DELETE (logout)
│       ├── blogs/route.js          # GET all, POST create
│       ├── blogs/[slug]/route.js   # GET, PUT, DELETE by slug
│       ├── projects/route.js       # GET all (+ ?featured=true), POST create
│       ├── projects/[slug]/route.js # GET, PUT, PATCH (featured toggle), DELETE
│       ├── messages/route.js       # GET, POST, PATCH (mark read), DELETE
│       └── test-db/route.js        # DB connection health check
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── BlogCard.js
│   └── ProjectCard.js
├── lib/
│   ├── db/connect.js               # Canonical MongoDB connection (cached)
│   ├── mongodb.js                  # Re-export shim (backward compat)
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Project.js
│   │   └── Message.js
│   └── utils/
│       ├── slugify.js              # Shared slug generator
│       └── apiResponse.js          # ok() / fail() response helpers
└── services/
    ├── blogService.js              # Server-side blog queries (direct DB)
    └── projectService.js           # Server-side project queries (direct DB)
```

## Architecture Decisions

### Data Fetching Strategy
- **Server components** (page.js, blog/[slug], work/*, work/[slug]) call **service functions directly** — no HTTP fetch to own API. This avoids circular SSR issues.
- **Client components** (admin pages, blog listing, contact form) call **`/api/...` routes** via `fetch()`.

### API Response Format (Standardized)
All API routes return a consistent shape:
```json
{ "success": true, "data": { ... } }
{ "success": false, "error": "message" }
```

### Admin Security
- `/admin/*` routes are protected via `proxy.js` (Next.js 16 middleware, runs before any page)
- Cookie: `admin_auth = adm_sess_lk6269121509_secure` (httpOnly, 7-day expiry)
- Admin password: stored in `proxy.js` and `api/admin/login/route.js`

## Environment Variables

```env
MONGODB_URI=mongodb+srv://...   # Required — real MongoDB connection string
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

## Development

```bash
cd portfolio && npm run dev -- -p 5000
```

## Workflow
Name: `Start application`
Command: `cd portfolio && npm run dev -- -p 5000`
