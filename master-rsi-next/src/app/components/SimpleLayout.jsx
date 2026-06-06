import Link from "next/link";

export default function SimpleLayout({ title, subtitle, backTo = "/projets", children }) {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-lg mt-0.5">
              C
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                Master RSI
              </p>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link
              href="/home"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg transition"
            >
              Accueil
            </Link>
            {backTo && (
              <Link
                href={backTo}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Retour
              </Link>
            )}
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">{children}</section>

      <footer className="max-w-6xl mx-auto px-6 pb-8 text-center text-sm text-gray-600">
        Module : Langage du Web — Annee 2025-2026
      </footer>
    </main>
  );
}
