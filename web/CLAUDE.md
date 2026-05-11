@AGENTS.md

## Core feature: Sequential invite system

GoDeep's differentiator is priority-based friend invites for trips:
- Each trip has a **capacity** (max people)
- Organizers maintain **friend lists** with **custom tags** (hiking crew, college, frat, SF locals — fully user-defined)
- Invites go out in **tiers**: first-choice group first, then backfill from the next tier if someone declines or times out
- Data model needs: users, friend lists, tags (many-to-many), trip capacity, invite tiers with priority ordering, response tracking (accepted/declined/pending/expired)
- Database: Supabase (Postgres) — schema should support efficient sort/filter/priority on tags and lists
