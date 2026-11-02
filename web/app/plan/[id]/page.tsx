import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Database } from '@/lib/database.types';
import PlanDetails from './plan-details';
import { DEMO_PLAN } from './demo';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (id === 'demo') return <PlanDetails plan={DEMO_PLAN} demo />;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Plan storage is unavailable.');
  const db = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
  const { data, error } = await db.from('plans').select('id,name,location,start_date,end_date').eq('id', id).maybeSingle();
  if (error) throw new Error('Could not load this plan.');
  if (!data) notFound();
  return <PlanDetails plan={{
    id: data.id, name: data.name || 'Untitled plan', location: data.location || '',
    startDate: data.start_date,
    endDate: data.end_date,
    events: [],
  }} />;
}
