import ImageSequence from "@/components/image-sequence";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-7xl md:text-9xl font-bodoni italic tracking-tight mb-4">
          Rolex
        </h1>
        <p className="text-xl md:text-2xl font-garamond tracking-[0.2em] uppercase text-zinc-400">
          Oyster Perpetual
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="font-inter text-xs tracking-widest uppercase opacity-50">
            Scroll to Explore
          </p>
          <div className="animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-30"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Image Sequence Section */}
      <section className="relative">
        <ImageSequence />
      </section>

      {/* Legacy Section */}
      <section className="flex flex-col items-center justify-center text-white bg-zinc-950 py-32 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bodoni mb-8">The Rolex Way</h2>
        <div className="max-w-3xl space-y-8 font-garamond text-2xl text-zinc-300 leading-relaxed">
          <p>
            It is about a sense of detail. About a way of seeing the world.
            About a desire to go further.
          </p>
          <p className="text-zinc-500 italic">
            Every component is designed, developed and produced in-house to the
            most exacting standards.
          </p>
        </div>
        <button className="mt-16 px-8 py-3 border border-white/20 font-inter text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500">
          Discover the Collection
        </button>
      </section>

      {/* Footer Section */}
      <footer className="h-32 flex flex-col items-center justify-center text-white bg-black border-t border-white/5">
        <div className="mb-4">
          <h3 className="text-2xl font-bodoni italic tracking-widest">Rolex</h3>
        </div>
        <p className="text-[10px] font-inter tracking-[0.4em] uppercase opacity-40">
          © {new Date().getFullYear()} — The Perpetual Spirit
        </p>
      </footer>
    </main>
  );
}
