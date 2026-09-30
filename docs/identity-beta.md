# Decision identity foundation

## Existing implementation inspected

GitHub main at 63e3b99 is a Next.js 16 / React 19 / TypeScript / Tailwind 4 trip prototype. No shadcn, Supabase client, auth, decision routes, migrations, or invite delivery existed. The resumed Supabase project `hhyrbwwskiuejwaznpfo` contains a public `plans` table with anonymous read/insert policies. This change leaves plans and its policies alone. The `/decisions` flow is separate from the trip prototype.

## Identity and privacy

- Supabase `auth.users` owns email/phone and verification; `public.profiles` owns required first/last/display names, avatar and timestamps. No duplicated `user_identities` table. Blank/omitted display name defaults to first name.
- Profiles are created only after verified auth and required name confirmation. Invite snapshots prefill onboarding only after the invited contact is verified. Profile changes never overwrite snapshots.
- A participant is an invitation to one decision, initially unclaimed, with first name and at least one contact. Emails are lowercase; phones use E.164 including `+`.
- Invite links identify one UUID participant. Links alone do not authorize preview, claim, decision access or response submission. `claim_participant` locks that row, checks current `auth.users` confirmed contact fields and profile existence, and is idempotent for its owner. It does not claim other historical rows. Revoked invitations cannot claim or submit.
- Auth email and phone confirmations must remain enabled. Do not auto-confirm accounts; verification timestamps are the database's proof of contact ownership. JWT/user metadata never decides ownership.
- Perspectives reference the participant and decision through a composite foreign key. One submission per participant. Participants may submit but cannot read responses, including their own, through the API; the organizer alone can read. No client can update/reassign participants or expose responses.
- No sharing policy or toggle is shipped. The UI promises privacy; these responses must stay private. Future sharing needs a separately consented submission mode, explicit organizer grants, and RLS tests that preserve this cohort's private expectation.
- Current display identity comes from profiles via a narrowly authorized display-name RPC; historical snapshot names remain available to the organizer.
- Email and phone can sign in independently. To attach an additional contact to an existing account, use Supabase's verified contact update flow in an authenticated session; never merge accounts by matching unverified strings. Additional-contact settings are future scope.

## Review and launch sequence

1. Review and merge the PR. Do not deploy directly over main to bypass review.
2. Inspect the target schema, then apply `supabase/migrations/202609300001_identity_foundation.sql` once, with Supabase CLI migrations or SQL editor. It runs transactionally and intentionally fails on colliding table names rather than overwriting them. No existing data is rewritten. Record the migration if applied manually.
3. In Supabase Authentication, keep email confirmations enabled, anonymous sign-in disabled, and signups enabled. Use custom SMTP with a verified sending domain for external beta users. The built-in email sender is insufficient for general beta delivery.
4. Set BOTH Confirm sign up and Magic link or OTP email templates to `supabase/templates/otp.html` (subject: `Your GoDeep verification code`). The UI expects a code rather than a magic-link callback. Configure a suitably short OTP expiry and provider rate limits.
5. For phone auth, configure the SMS provider credentials, enable phone sign-in, and require phone confirmation. Verify real SMS delivery before inviting phone-only testers. Do not enable phone auth without a working provider.
6. Set Site URL to `https://go-deep.vercel.app`. OTP entry returns to the current page and preserves the invitation query string.
7. Set Vercel variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the same project. Redeploy the reviewed branch preview and main after merging. Never use service-role or database secrets in browser variables. Copy `web/.env.example` to `web/.env.local` for local development.
8. Visit `/decisions`. With separate organizer and invitee browser sessions, test signup/profile, decision creation, email invitation, code verification, name prefill, claim, private submission and organizer refresh. Repeat with SMS after provider setup. Confirm a different verified account cannot claim the invitation or read any responses.

## Build compatibility

Next.js was updated to 16.3.7 to resolve dependency advisories. Both bundlers encountered Google font loader failures locally or on Vercel. The existing font families are now bundled using Fontsource packages and `next/font/local`, preserving their CSS variables and avoiding build-time remote font requests. The normal Turbopack build is retained.

## Validation

From `web`: `npm ci`, `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`.
The automated test executes the actual migration in embedded PostgreSQL with Supabase auth schema/roles emulated. It exercises RLS, constraints, verified email and phone claims, wrong-contact rejection, cross-decision rejection, profile defaults, historical snapshots, private reads and anonymous denial. This is not a substitute for hosted Supabase OTP and delivery testing.

## MVP next steps

Configure providers and validate preview end-to-end before inviting testers. Invitation delivery is currently manual: organizer copies the generated link to the named person; OTP delivery is handled by Supabase. Then add structured decision context/questions, response editing, invitation revocation/resend/delivery, authenticated additional-contact settings, synthesis/results, and consent-aware organizer sharing. Add provider anti-abuse controls and monitor auth/delivery failures as beta volume grows.
