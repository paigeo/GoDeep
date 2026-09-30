begin;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 first_name text not null check (length(btrim(first_name)) between 1 and 100),
 last_name text not null check (length(btrim(last_name)) between 1 and 100),
 display_name text not null check (length(btrim(display_name)) between 1 and 100),
 avatar_url text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create function public.profile_defaults() returns trigger language plpgsql set search_path = '' as $$
begin
 new.first_name := btrim(new.first_name); new.last_name := btrim(new.last_name);
 new.display_name := coalesce(nullif(btrim(new.display_name), ''), new.first_name);
 if TG_OP = 'UPDATE' then new.created_at := old.created_at; end if;
 new.updated_at := now(); return new;
end $$;
create trigger profile_defaults before insert or update on public.profiles for each row execute function public.profile_defaults();
create table public.decisions (
 id uuid primary key default gen_random_uuid(), organizer_id uuid not null references public.profiles(id),
 title text not null check (length(btrim(title)) between 1 and 200), created_at timestamptz not null default now()
);
create table public.decision_participants (
 id uuid primary key default gen_random_uuid(), decision_id uuid not null references public.decisions(id) on delete cascade,
 user_id uuid references public.profiles(id), first_name text not null check (length(btrim(first_name)) between 1 and 100),
 last_name text check (last_name is null or length(btrim(last_name)) between 1 and 100),
 invited_email text check (invited_email is null or (invited_email = lower(btrim(invited_email)) and invited_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')),
 invited_phone text check (invited_phone is null or invited_phone ~ '^\+[1-9][0-9]{7,14}$'),
 invite_status text not null default 'pending' check (invite_status in ('pending', 'joined', 'revoked')),
 invited_at timestamptz not null default now(), joined_at timestamptz,
 check (invited_email is not null or invited_phone is not null),
 check ((user_id is null and joined_at is null and invite_status <> 'joined') or (user_id is not null and joined_at is not null and invite_status in ('joined','revoked'))),
 unique (id, decision_id)
);
create index decisions_organizer_idx on public.decisions(organizer_id);
create index participants_decision_idx on public.decision_participants(decision_id);
create index participants_user_idx on public.decision_participants(user_id) where user_id is not null;
create unique index participants_email_idx on public.decision_participants(decision_id, invited_email) where invited_email is not null and invite_status <> 'revoked';
create unique index participants_phone_idx on public.decision_participants(decision_id, invited_phone) where invited_phone is not null and invite_status <> 'revoked';
create unique index participants_member_idx on public.decision_participants(decision_id, user_id) where user_id is not null and invite_status <> 'revoked';
create table public.perspectives (
 id uuid primary key default gen_random_uuid(), decision_id uuid not null references public.decisions(id) on delete cascade,
 participant_id uuid not null unique,
 body text not null check (length(btrim(body)) between 1 and 20000),
 created_at timestamptz not null default now(),
 -- No sharing toggle: responses submitted under this private promise remain private.
 foreign key (participant_id, decision_id) references public.decision_participants(id, decision_id)
);
create index perspectives_decision_idx on public.perspectives(decision_id);

-- Helpers bypass RLS only for narrow ownership checks; never trust user_metadata/JWT contact claims.
create function public.is_organizer(target uuid) returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.decisions where id = target and organizer_id = (select auth.uid()));
$$;
create function public.is_member(target uuid) returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.decision_participants where decision_id = target and user_id = (select auth.uid()) and invite_status = 'joined');
$$;
create function public.contact_verified(invite_email text, invite_phone text) returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users u where u.id = (select auth.uid()) and not u.is_anonymous and
 ((invite_email is not null and u.email_confirmed_at is not null and lower(u.email) = invite_email)
 or (invite_phone is not null and u.phone_confirmed_at is not null and '+' || ltrim(u.phone, '+') = invite_phone)));
$$;
alter table public.profiles enable row level security;
alter table public.decisions enable row level security;
alter table public.decision_participants enable row level security;
alter table public.perspectives enable row level security;
create policy profile_read on public.profiles for select to authenticated using (id = (select auth.uid()));
create function public.has_verified_contact() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users where id = (select auth.uid()) and not is_anonymous and (email_confirmed_at is not null or phone_confirmed_at is not null));
$$;
create policy profile_insert on public.profiles for insert to authenticated with check (id = (select auth.uid()) and public.has_verified_contact());
create policy profile_update on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy decision_read on public.decisions for select to authenticated using (public.is_organizer(id) or public.is_member(id));
create policy decision_insert on public.decisions for insert to authenticated with check (organizer_id = (select auth.uid()));
create policy participant_read on public.decision_participants for select to authenticated using (public.is_organizer(decision_id) or (user_id = (select auth.uid()) and invite_status = 'joined'));
create policy participant_invite on public.decision_participants for insert to authenticated with check (public.is_organizer(decision_id) and user_id is null and joined_at is null and invite_status = 'pending');
create policy perspective_read on public.perspectives for select to authenticated using (public.is_organizer(decision_id));
create policy perspective_insert on public.perspectives for insert to authenticated with check (exists(select 1 from public.decision_participants p where p.id = participant_id and p.decision_id = perspectives.decision_id and p.user_id = (select auth.uid()) and p.invite_status = 'joined'));

-- Return current display identity only to the organizer or that participant.
create function public.participant_labels(target uuid) returns table (id uuid, display_name text) language sql stable security definer set search_path = '' as $$
 select p.id, coalesce(u.display_name, concat_ws(' ',p.first_name,p.last_name)) from public.decision_participants p left join public.profiles u on u.id=p.user_id
 where p.decision_id=target and (public.is_organizer(target) or (p.user_id=auth.uid() and p.invite_status='joined'));
$$;
revoke all on function public.participant_labels(uuid) from public, anon;
grant execute on function public.participant_labels(uuid) to authenticated;

-- Only a verified invitee can retrieve the snapshot used for onboarding.
create function public.invite_preview(target uuid) returns table (first_name text, last_name text) language sql stable security definer set search_path = '' as $$
 select p.first_name, p.last_name from public.decision_participants p where p.id = target and p.invite_status = 'pending' and p.user_id is null and public.contact_verified(p.invited_email, p.invited_phone);
$$;
create function public.claim_participant(target uuid) returns uuid language plpgsql security definer set search_path = '' as $$
declare p public.decision_participants;
begin
 if auth.uid() is null or not exists(select 1 from public.profiles where id = auth.uid()) then raise exception 'Complete your profile first'; end if;
 select * into p from public.decision_participants where id = target for update;
 if not found or p.invite_status = 'revoked' then raise exception 'Invitation unavailable'; end if;
 if p.user_id = auth.uid() then return p.decision_id; end if;
 if p.user_id is not null or p.invite_status <> 'pending' or not public.contact_verified(p.invited_email, p.invited_phone) then raise exception 'Verify the invited contact to join'; end if;
 update public.decision_participants set user_id = auth.uid(), joined_at = now(), invite_status = 'joined' where id = target;
 return p.decision_id;
end $$;
-- Ordinary clients cannot relink participants, alter snapshots, or widen response visibility.
revoke all on public.profiles, public.decisions, public.decision_participants, public.perspectives from anon, authenticated;
grant select, insert on public.profiles to authenticated;
grant update (first_name,last_name,display_name,avatar_url) on public.profiles to authenticated;
grant select, insert on public.decisions, public.decision_participants, public.perspectives to authenticated;
revoke all on function public.profile_defaults(), public.is_organizer(uuid), public.is_member(uuid), public.contact_verified(text,text), public.has_verified_contact(), public.invite_preview(uuid), public.claim_participant(uuid) from public, anon;
grant execute on function public.is_organizer(uuid), public.is_member(uuid), public.contact_verified(text,text), public.has_verified_contact(), public.invite_preview(uuid), public.claim_participant(uuid) to authenticated;
commit;
