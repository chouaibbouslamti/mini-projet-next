import Link from "next/link";
import SimpleLayout from "../components/SimpleLayout";

const projets = [
  ["Manipulation de matrices", "Calcul de somme et produit des matrices.", "/matrices", "JS", "text-orange-400 bg-orange-500/10 border-orange-500/20"],
  ["Formulaires & fichiers", "Gestion des etudiants avec base de donnees.", "/formulaire", "DB", "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"],
  ["Statistiques ChartJS", "Visualisation graphique des moyennes.", "/statistiques", "Chart", "text-violet-400 bg-violet-500/10 border-violet-500/20"],
  ["Geolocalisation", "Carte des etudiants selon leurs positions.", "/geolocalisation", "Map", "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"],
  ["Upload d'images", "Insertion et affichage d'images depuis MySQL.", "/images", "File", "text-amber-400 bg-amber-500/10 border-amber-500/20"],
  ["Quiz interactif", "Quiz JavaScript avec calcul automatique.", "/quiz", "Quiz", "text-rose-400 bg-rose-500/10 border-rose-500/20"],
];

export default function ProjetsPage() {
  return (
    <SimpleLayout title="Mes projets" subtitle="Plateforme web developpee avec Next.js" backTo="/home">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projets.map(([title, desc, link, tag, color], index) => (
          <Link
            key={link}
            href={link}
            className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
                {tag}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 mb-6 text-sm">{desc}</p>
            <span className="inline-flex items-center gap-2 text-orange-400 font-semibold text-sm">
              Ouvrir <span className="transition group-hover:translate-x-1">-&gt;</span>
            </span>
          </Link>
        ))}
      </div>
    </SimpleLayout>
  );
}
