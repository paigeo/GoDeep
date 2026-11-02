import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import { mapsSearchUrl, parseTripDate, validateTripDates } from '../lib/plans.ts';

test('trip dates remain calendar dates and reject invalid or excessive ranges', () => {
  assert.equal(parseTripDate('2026-11-11').getDate(), 11);
  assert.equal(parseTripDate('2026-02-30'), null);
  assert.equal(parseTripDate('0099-01-01'), null);
  assert.equal(validateTripDates('2026-11-11', '2026-11-11'), null);
  assert.ok(validateTripDates('2026-11-20', '2026-11-11'));
  assert.ok(validateTripDates('2026-01-01', '2028-01-01'));
  const url = new URL(mapsSearchUrl('Tahoe & Truckee, CA'));
  assert.equal(url.origin, 'https://www.google.com');
  assert.equal(url.searchParams.get('query'), 'Tahoe & Truckee, CA');
  assert.equal(url.searchParams.get('api'), '1');
});

test('plan migration preserves legacy data and enforces dates for public and signed-in visitors', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated;
      create table public.plans(id uuid primary key default gen_random_uuid(), name text, created_at timestamp default now());
      alter table public.plans enable row level security;
      grant usage on schema public to anon, authenticated;
      grant select, insert on public.plans to anon;
      create policy "Allow public insert plans" on public.plans for insert to anon with check (true);
      create policy "Allow public read plans" on public.plans for select to anon using (true);
      insert into public.plans(name) values ('Legacy plan');`);
    await db.exec(await readFile(new URL('../../supabase/migrations/202611020001_plan_destinations.sql', import.meta.url), 'utf8'));
    await db.exec('set role anon');
    assert.equal((await db.query('select name, start_date from public.plans')).rows[0].start_date, null);
    const saved = await db.query(`insert into public.plans(name,location,start_date,end_date) values ('Tahoe trip','Tahoe, CA','2026-11-11','2026-11-20') returning id`);
    await db.exec('reset role; set role authenticated');
    assert.equal((await db.query(`select location from public.plans where id='${saved.rows[0].id}'`)).rows[0].location, 'Tahoe, CA');
    await db.exec(`insert into public.plans(name,start_date,end_date) values ('Signed in trip','2026-11-11','2026-11-11')`);
    await assert.rejects(db.exec(`insert into public.plans(name,start_date,end_date) values ('Invalid','2026-11-20','2026-11-11')`));
    await assert.rejects(db.exec(`insert into public.plans(name,start_date) values ('Missing end','2026-11-11')`));
    await assert.rejects(db.exec(`insert into public.plans(name,start_date,end_date) values ('Too long','2026-01-01','2028-01-01')`));
    await assert.rejects(db.exec(`update public.plans set name='Overwrite'`));
  } finally { await db.close(); }
});
