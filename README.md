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
- Create plan form with beta waitlist modal + email collection
- Plan detail page with list view and calendar view
- How-it-works page (5 steps including smart matching / tiered invites)
- Share link (copies URL to clipboard)
- Mock data wired in — Supabase persistence coming next

## Roadmap

### Next up
- [ ] Merge PR #4 (beta waitlist modal)
- [ ] Supabase setup — provision project, connect via Vercel integration
- [ ] Waitlist table — persist emails from `/api/waitlist` to Supabase instead of console logs
- [ ] Data model for core feature — users, friend lists, tags (many-to-many), trips with capacity, invite tiers with priority ordering, response tracking (accepted/declined/pending/expired)

### Then
- [ ] Auth (Supabase Auth or Clerk) — sign up, log in, own your friend lists
- [ ] Friend list management UI — add friends, create/edit tags, drag to reorder priority
- [ ] Trip creation wired to DB — plans actually save
- [ ] Invite flow — send invites by tier, track responses, auto-backfill from next tier on decline/timeout
- [ ] Shareable links that load real plan data

### Later
- [ ] Smart matching — describe who you're looking for in natural language, surface matching friends from tags
- [ ] Add / edit events within a plan
- [ ] Notifications (email or push) for invite responses and plan updates
- [ ] Rate limiting on public endpoints (`/api/waitlist`)
- [ ] iOS app via Expo
