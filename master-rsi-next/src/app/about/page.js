import Link from "next/link";
import SimpleLayout from "../components/SimpleLayout";

const skills = ["Next.js", "MySQL", "ChartJS", "Leaflet", "JavaScript", "PHP", "Reseaux", "Linux"];

export default function AboutPage() {
  return (
    <SimpleLayout title="About me" subtitle="Profil personnel" backTo="/home">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-36 h-36 rounded-full bg-orange-500/10 border-2 border-orange-500/40 text-orange-400 flex items-center justify-center text-3xl font-bold shrink-0">
            CB
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              Chouaib Bouslamti
            </h2>
            <p className="text-orange-400 font-semibold mb-4">
              Etudiant en Master Reseaux et Systemes Informatiques
            </p>
            <p className="text-gray-400 leading-relaxed">
              Passionne par le developpement web, les bases de donnees, les
              systemes intelligents et les nouvelles technologies. Cette
              plateforme a ete developpee avec Next.js, MySQL, ChartJS et
              Leaflet dans le cadre du module Langage du Web.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                Telecharger CV
              </a>
              <Link
                href="/projets"
                className="bg-gray-800 hover:bg-gray-700 text-orange-400 border border-gray-700 px-5 py-3 rounded-lg font-semibold transition"
              >
                Voir mes projets
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mt-6">
        <h3 className="text-xl font-bold text-white mb-5">Competences</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-800 border border-gray-700 hover:border-orange-500/50 text-orange-400 px-4 py-2 rounded-lg font-semibold transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
