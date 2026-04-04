import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/60">
          GoDeep
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
          Go deeper with the right people.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
          Coordinate trips, plans, and meaningful time together without the group chat chaos.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/create"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">
            Start planning
        </Link>
          <Link
            href="/how-it-works"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See how it works
          </Link>
        </div>
      </section>
    </main>
  );
}