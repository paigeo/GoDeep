# Trip creation beta

`/create` now saves the plan name, destination text, and dates to Supabase and opens `/plan/<uuid>`. The shared page reads the saved record on every request. `/plan/demo` is the explicitly labeled sample. Unknown IDs show a not-found page; storage errors show a retry state.

Destination links use Google Maps Search URLs, which require no Google API key. This version stores the organizer's text, not verified coordinates or a Google Place ID. Google Places autocomplete remains future work pending Google Maps Platform setup.

## Sharing and scope

Trip records remain public, following the original `plans` policies. The create form states that destinations and dates are publicly viewable. UUIDs are identifiers, not access controls. Do not store private locations or sensitive details here. Signed-in visitors now have the same SELECT/INSERT access as anonymous visitors. There are no client UPDATE/DELETE policies. Private decision responses are unaffected.

New trips require valid dates from 2000 through 2100 and cannot exceed 366 inclusive days. Existing name-only records remain readable with destination/dates shown as undecided. Event editing, organizer ownership, trip lists, and public-write abuse protection are follow-up work.

## Migration application record

Applied `202611020001_plan_destinations.sql` to project `hhyrbwwskiuejwaznpfo` through the dashboard SQL Editor on November 2, 2026. The transaction succeeded. Preflight confirmed `plans` had only `id`, `name`, and `created_at`, with anonymous SELECT/INSERT policies. The migration adds nullable destination/date fields, checks the date range, and permits authenticated SELECT/INSERT on these already-public trips. No existing records were rewritten.

This is a manual application record. Supabase CLI migration history was not updated; reconcile both manually applied migrations before a future `db push` rather than rerunning them.

## Verification

- Embedded PostgreSQL tests run the actual migration over a legacy `plans` table and verify legacy data, anonymous creation, authenticated reads/creation, invalid ranges, and denied updates.
- Date helpers validate date-only values and encode Google Maps queries.
- Browser verification saved a sample Tahoe trip to hosted Supabase, reopened it after a full refresh, displayed five days spanning November/December, navigated both calendar months, and confirmed copy-link feedback and a missing-ID not-found page.
- Lint and TypeScript pass. The local Webpack production build passes; local Turbopack is blocked by a process/port permission error. Standard Turbopack remains the normal build command for CI/Vercel.
