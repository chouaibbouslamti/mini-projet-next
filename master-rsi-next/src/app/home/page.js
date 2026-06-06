import Link from "next/link";

const cards = [
  {
    title: "About me",
    desc: "Profil, informations personnelles et competences.",
    link: "/about",
    tag: "CV",
    color: "text-orange-400",
  },
  {
    title: "Mes projets",
    desc: "Matrices, formulaire, quiz, images, statistiques et carte.",
    link: "/projets",
    tag: "6 modules",
    color: "text-cyan-400",
  },
  {
    title: "Geolocalisation",
    desc: "Carte des positions des etudiants.",
    link: "/geolocalisation",
    tag: "Leaflet",
    color: "text-emerald-400",
  },
];

const stats = [
  ["Next.js", "Frontend"],
  ["MySQL", "Database"],
  ["ChartJS", "Graphiques"],
  ["Leaflet", "Carte"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-lg">
              C
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold">
                Plateforme web
              </p>
              <h1 className="text-xl font-bold text-white">Master RSI</h1>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg transition"
            >
              About me
            </Link>
            <Link
              href="/projets"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Mes projets
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10 text-center mb-10 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500" />

          <span className="inline-flex bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Next.js + MySQL
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">
            Chouaib Bouslamti
          </h2>
          <p className="text-gray-400 text-lg">
            Application web realisee avec Next.js, MySQL, ChartJS et Leaflet.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {stats.map(([name, label]) => (
              <div
                key={name}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4"
              >
                <p className="text-orange-400 font-bold">{name}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.link}
              href={card.link}
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="inline-flex bg-gray-800 text-gray-400 border border-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {card.tag}
              </span>
              <h3 className={`text-xl font-bold mb-2 ${card.color}`}>
                {card.title}
              </h3>
              <p className="text-gray-400 mb-5">{card.desc}</p>
              <span className={`font-semibold ${card.color}`}>Ouvrir -&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-8 text-center text-sm text-gray-600">
        Module : Langage du Web — Annee 2025-2026
      </footer>
    </main>
  );
}
