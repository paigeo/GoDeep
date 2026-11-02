'use client';
import Link from 'next/link';

export default function PlanError({ reset }: { reset: () => void }) {
  return <main className="min-h-screen bg-[#09090b] px-6 py-24 text-white">
    <div className="mx-auto max-w-lg space-y-5">
      <h1 className="text-2xl font-semibold">We couldn&apos;t load this plan.</h1>
      <p className="text-sm text-white/60">Please try again in a moment.</p>
      <button onClick={reset} className="rounded-lg bg-white px-5 py-3 text-sm text-black">Try again</button>
      <Link href="/" className="ml-5 text-sm text-white/60 underline">GoDeep home</Link>
    </div>
  </main>;
}
