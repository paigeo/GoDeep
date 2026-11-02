begin;

-- Extend the existing public trip prototype. Existing anonymous policies stay intact.
alter table public.plans
  add column location text,
  add column start_date date,
  add column end_date date,
  add constraint plans_location_length check (location is null or length(location) <= 300),
  add constraint plans_date_range check (
    (start_date is null and end_date is null) or
    (start_date is not null and end_date is not null and
      start_date >= date '2000-01-01' and end_date <= date '2100-12-31' and
      end_date >= start_date and end_date - start_date <= 365)
  );

-- A signed-in visitor should have the same public-trip access as a signed-out one.
grant select, insert on public.plans to authenticated;
create policy plans_signed_in_read on public.plans for select to authenticated using (true);
create policy plans_signed_in_insert on public.plans for insert to authenticated with check (true);

commit;
