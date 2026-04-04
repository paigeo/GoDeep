export default function CreatePage() {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/60">
            Create a plan
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Start something worth showing up for.
          </h1>
          <p className="mt-4 text-white/70">
            This is the first version of the GoDeep planning flow.
          </p>
  
          <form className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Plan name
              </label>
              <input
                type="text"
                placeholder="Yosemite weekend"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              />
            </div>
  
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Location
              </label>
              <input
                type="text"
                placeholder="Yosemite"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              />
            </div>
  
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Dates
              </label>
              <input
                type="text"
                placeholder="May 16–18"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              />
            </div>
  
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Create plan
            </button>
          </form>
        </div>
      </main>
    );
  }