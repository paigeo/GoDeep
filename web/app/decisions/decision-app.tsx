'use client';
import Link from 'next/link';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/client';
import type { Decision, Participant, Perspective, Profile } from '@/lib/database.types';

const field = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900';
function Input({name, label, required = false, value, type = 'text'}: {name: string; label: string; required?: boolean; value?: string; type?: string}) {
 return <label className="block text-sm">{label}<input className={field} name={name} type={type} required={required} defaultValue={value} maxLength={type === 'email' ? 254 : 100} /></label>;
}
function Button({children}: {children: ReactNode}) { return <button className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50" type="submit">{children}</button>; }
const value = (data: FormData, name: string) => String(data.get(name) ?? '').trim();
export default function DecisionApp() {
 const [db] = useState(getSupabase);
 const [user, setUser] = useState<User | null>(null);
 const [profile, setProfile] = useState<Profile | null>(null);
 const [preview, setPreview] = useState<{first_name: string; last_name: string | null} | null>(null);
 const [invite, setInvite] = useState<string | null>(null);
 const [decisions, setDecisions] = useState<Decision[]>([]);
 const [selected, setSelected] = useState<Decision | null>(null);
 const [labels, setLabels] = useState<Record<string,string>>({});
 const [participants, setParticipants] = useState<Participant[]>([]);
 const [responses, setResponses] = useState<Perspective[]>([]);
 const [contact, setContact] = useState<{kind: 'email' | 'phone'; address: string} | null>(null);
 const [message, setMessage] = useState('');
 const [busy, setBusy] = useState(false);
 const [ready, setReady] = useState(false);
 const [submitted, setSubmitted] = useState(false);
 const [inviteLink, setInviteLink] = useState('');
 async function run(action: () => Promise<void>) {
  setBusy(true); setMessage('');
  try { await action(); } catch(e) { setMessage(e instanceof Error ? e.message : 'Something went wrong. Please try again.'); } finally { setBusy(false); }
 }
 useEffect(() => {
  if (!db) return;
  setInvite(new URLSearchParams(window.location.search).get('invite'));
  let live = true;
  db.auth.getUser().then(({data}) => { if(live) {setUser(data.user); setReady(true);} });
  const {data} = db.auth.onAuthStateChange((_event, session) => {setUser(session?.user ?? null);});
  return () => {live = false; data.subscription.unsubscribe();};
 }, [db]);
 useEffect(() => {
  if (!db || !user) {setProfile(null); setDecisions([]); setSelected(null); setPreview(null); return;}
  let live = true;
  async function load() {
   const result = await db!.from('profiles').select('*').eq('id',user!.id).maybeSingle();
   if (!live) return;
   if(result.error) {setMessage(result.error.message); return;}
   setProfile(result.data);
   const list = await db!.from('decisions').select('*').order('created_at', {ascending:false});
   if(live) {setDecisions(list.data ?? []); if(list.error) setMessage(list.error.message);}
   if(invite) {
    const snapshot = await db!.rpc('invite_preview', {target:invite});
    if(live) {setPreview(snapshot.data?.[0] ?? null); if(snapshot.error) setMessage(snapshot.error.message);}
   }
  }
  void load(); return () => {live = false;};
 }, [db,user,invite]);
 async function openDecision(decision: Decision) {
  if(!db) return;
  const people = await db.from('decision_participants').select('*').eq('decision_id',decision.id);
  if(people.error) throw new Error(people.error.message);
  const identities = await db.rpc('participant_labels', {target:decision.id});
  if(identities.error) throw new Error(identities.error.message);
  setLabels(Object.fromEntries((identities.data ?? []).map(p => [p.id,p.display_name])));
  let entries: Perspective[] = [];
  if(decision.organizer_id === user?.id) {
   const result = await db.from('perspectives').select('*').eq('decision_id',decision.id);
   if(result.error) throw new Error(result.error.message); entries = result.data ?? [];
  }
  setSelected(decision); setParticipants(people.data ?? []); setResponses(entries); setSubmitted(false); setInviteLink('');
 }
 function form(action: (data: FormData) => Promise<void>) {return (event: FormEvent<HTMLFormElement>) => {event.preventDefault(); const data = new FormData(event.currentTarget); void run(() => action(data));};}
 if(!db) return <main className="mx-auto max-w-xl p-10"><h1 className="text-2xl font-semibold">GoDeep decisions</h1><p>Decision beta setup is in progress. Please check back soon.</p></main>;
 const organizer = selected?.organizer_id === user?.id;
 const me = participants.find(p => p.user_id === user?.id && p.invite_status === 'joined');
 return <main className="mx-auto max-w-3xl w-full space-y-8 p-6 text-gray-900 bg-white min-h-screen">
  <header className="flex justify-between"><Link href="/">GoDeep</Link><h1 className="text-2xl font-semibold">Decisions</h1>{user && <button onClick={() => void run(async () => {const {error} = await db.auth.signOut(); if(error) throw error;})}>Sign out</button>}</header>
  <p role="status" aria-live="polite">{message}</p>
  {!ready ? <p>Loading…</p> : !user ? <section className="space-y-4"><h2 className="text-xl">{invite ? 'Verify your invitation' : 'Sign in to GoDeep'}</h2><p>Use your invited email or phone number. Phone numbers need a country code, such as +14155551234.</p>
   <fieldset disabled={busy}><form className="space-y-4" onSubmit={form(async data => {
    const kind = value(data,'kind') as 'email' | 'phone'; const address = kind === 'email' ? value(data,'contact').toLowerCase() : value(data,'contact');
    if(kind === 'phone' && !/^\+[1-9][0-9]{7,14}$/.test(address)) throw new Error('Enter a phone number with its country code.');
    const {error} = await db.auth.signInWithOtp(kind === 'email' ? {email:address} : {phone:address});
    if(error) throw error; setContact({kind,address}); setMessage('Check your email or phone for your verification code.');
   })}><label className="block">Sign in with<select name="kind" className={field}><option value="email">Email</option><option value="phone">Phone</option></select></label><Input name="contact" label="Email or phone" required/><Button>Send code</Button></form></fieldset>
   {contact && <fieldset disabled={busy}><form className="space-y-4" onSubmit={form(async data => {
    const token = value(data,'code'); const {error} = await db.auth.verifyOtp(contact.kind === 'email' ? {email:contact.address,token,type:'email'} : {phone:contact.address,token,type:'sms'});
    if(error) throw error; setContact(null);
   })}><Input name="code" label="Verification code" required/><Button>Verify</Button></form></fieldset>}
  </section> : <>
   <section className="space-y-3"><h2 className="text-xl">{profile ? 'Profile settings' : 'Welcome to GoDeep'}</h2><p>Your display name is how you appear in GoDeep.</p><fieldset disabled={busy}><form key={`${user.id}:${profile?.updated_at ?? preview?.first_name ?? 'new'}`} className="grid gap-4 sm:grid-cols-2" onSubmit={form(async data => {
    const payload = {first_name:value(data,'first_name'),last_name:value(data,'last_name'),display_name:value(data,'display_name') || value(data,'first_name'),avatar_url:value(data,'avatar_url') || null};
    const query = profile ? db.from('profiles').update(payload).eq('id',user.id) : db.from('profiles').insert({id:user.id,...payload});
    const result = await query.select('*').single(); if(result.error) throw result.error; setProfile(result.data); setMessage('Profile saved.');
   })}><Input name="first_name" label="First name" value={profile?.first_name ?? preview?.first_name} required/><Input name="last_name" label="Last name" value={profile?.last_name ?? preview?.last_name ?? ''} required/><Input name="display_name" label="Display name (defaults to first name)" value={profile?.display_name ?? preview?.first_name}/><Input name="avatar_url" label="Avatar URL (optional)" type="url" value={profile?.avatar_url ?? ''}/><Button>Save profile</Button></form></fieldset></section>
   {invite && <section><p>Join using the verified email or phone that received this invitation.</p><button disabled={!profile || busy} className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50" onClick={() => void run(async () => {
    const result = await db.rpc('claim_participant',{target:invite}); if(result.error) throw result.error;
    const list = await db.from('decisions').select('*'); if(list.error) throw list.error; setDecisions(list.data ?? []);
    const joined = list.data?.find(d => d.id === result.data); if(joined) await openDecision(joined);
    setInvite(null); window.history.replaceState(null,'','/decisions'); setMessage('You joined the decision.');
   })}>Join decision</button></section>}
   {profile && <><fieldset disabled={busy}><form className="flex gap-3" onSubmit={form(async data => {
    const result = await db.from('decisions').insert({organizer_id:user.id,title:value(data,'title')}).select('*').single(); if(result.error) throw result.error;
    setDecisions([result.data,...decisions]); await openDecision(result.data);
   })}><Input name="title" label="What are you deciding?" required/><Button>Create decision</Button></form></fieldset>
   <nav aria-label="Your decisions" className="flex flex-wrap gap-3">{decisions.map(d => <button key={d.id} className="rounded border px-3 py-2" onClick={() => void run(() => openDecision(d))}>{d.title}</button>)}</nav></>}
   {selected && <section className="space-y-5"><h2 className="text-xl font-semibold">{selected.title}</h2>
    {organizer ? <><fieldset disabled={busy}><form className="space-y-3" onSubmit={form(async data => {
     const email = value(data,'email').toLowerCase() || null; const phone = value(data,'phone') || null;
     if(!email && !phone) throw new Error('Enter an email or phone number.');
     const result = await db.from('decision_participants').insert({decision_id:selected.id,first_name:value(data,'first_name'),last_name:value(data,'last_name') || null,invited_email:email,invited_phone:phone}).select('*').single();
     if(result.error) throw result.error; setParticipants([...participants,result.data]); setInviteLink(`${window.location.origin}/decisions?invite=${result.data.id}`); setMessage('Invitation created. Share its link with this person.');
    })}><h3>Invite someone</h3><Input name="first_name" label="Invitee first name" required/><Input name="last_name" label="Invitee last name (optional)"/><Input name="email" label="Invitee email" type="email"/><Input name="phone" label="Invitee phone (with country code)"/><Button>Create invitation</Button></form></fieldset>
    {inviteLink && <p>Invitation link: <a className="underline break-all" href={inviteLink}>{inviteLink}</a></p>}
    <ul className="space-y-2">{participants.map(p => <li key={p.id}>{labels[p.id] ?? [p.first_name,p.last_name].filter(Boolean).join(' ')} — {p.invite_status}{p.invite_status === 'pending' && <button className="ml-3 underline" onClick={() => setInviteLink(`${window.location.origin}/decisions?invite=${p.id}`)}>Show invite link</button>}</li>)}</ul>
    <h3 className="text-lg">Private responses</h3>{responses.length === 0 ? <p>No responses yet.</p> : responses.map(r => <article key={r.id} className="rounded-lg border p-4"><p className="font-medium">{labels[r.participant_id] ?? participants.find(p => p.id === r.participant_id)?.first_name}</p><p className="whitespace-pre-wrap">{r.body}</p></article>)}<button className="underline" onClick={() => void run(() => openDecision(selected))}>Refresh responses</button>
    </> : me && <><p>Your response is visible only to the organizer. Responses submitted here remain private.</p>{submitted ? <p>Your response was submitted.</p> : <fieldset disabled={busy}><form className="space-y-3" onSubmit={form(async data => {
     const result = await db.from('perspectives').insert({decision_id:selected.id,participant_id:me.id,body:value(data,'body')});
     if(result.error) {if(result.error.code === '23505') throw new Error('You have already submitted a response for this decision.'); throw result.error;} setSubmitted(true);
    })}><label>Your perspective<textarea className={field} name="body" required maxLength={20000} rows={6}/></label><Button>Submit private response</Button></form></fieldset>}</>}
   </section>}
  </>}
 </main>;
}
