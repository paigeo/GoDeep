import Link from 'next/link';

export default function PlanNotFound() {
  return <main className="min-h-screen bg-[#09090b] px-6 py-24 text-white">
    <div className="mx-auto max-w-lg space-y-5">
      <h1 className="text-2xl font-semibold">Plan not found.</h1>
      <p className="text-sm text-white/60">Check that you copied the whole link, or start a new plan.</p>
      <Link href="/create" className="inline-block rounded-lg bg-white px-5 py-3 text-sm text-black">Create a plan</Link>
    </div>
  </main>;
}
