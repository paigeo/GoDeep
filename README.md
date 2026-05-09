# GoDeep

Go deeper with the right people. Coordinate trips, plans, and meaningful time together without the group chat chaos.

## What it is

A trip planning app for real people — not corporate events, not travel agencies. Just you and the people you actually want to go places with.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist / Geist Mono
- **Database:** Supabase (coming soon)
- **Deployment:** Vercel

## Getting started

```bash
cd web
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Structure

```
web/
  app/
    page.tsx          # Landing page
    create/
      page.tsx        # Create a new plan
    plan/
      [id]/
        page.tsx      # Plan detail — list view + calendar view
```

## Current state

- Landing page with hero and app preview
- Create plan form
- Plan detail page with list view and calendar view
- Share link (copies URL to clipboard)
- Mock data wired in — Supabase persistence coming next

## Roadmap

- [ ] Supabase integration — plans actually save
- [ ] Shareable links that load real plan data
- [ ] Add / edit events within a plan
- [ ] Invite collaborators
- [ ] Auth (later)
- [ ] iOS app via Expo (later)
