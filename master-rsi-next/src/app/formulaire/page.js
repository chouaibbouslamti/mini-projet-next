"use client";

import { useState } from "react";
import SimpleLayout from "../components/SimpleLayout";

export default function FormulairePage() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [login, setLogin] = useState("");
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [liste, setListe] = useState([]);

  const ajouterEtudiant = async () => {
    if (!nom || !prenom || !login || !note1 || !note2) {
      alert("Remplir tous les champs");
      return;
    }

    const moyenne = (Number(note1) + Number(note2)) / 2;
    const etudiant = { login, nom, prenom, note1, note2, moyenne };

    const res = await fetch("/api/etudiants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(etudiant),
    });
    const data = await res.json();

    if (data.success) {
      setListe([...liste, etudiant]);
      setNom("");
      setPrenom("");
      setLogin("");
      setNote1("");
      setNote2("");
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const telechargerFichier = () => {
    const contenu = liste
      .map((e) => `${e.login}; ${e.nom}; ${e.prenom}; ${e.note1}; ${e.note2}; ${e.moyenne}`)
      .join("\n");

    const blob = new Blob([contenu], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "master_rsi2020.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass =
    "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition";

  return (
    <SimpleLayout title="Formulaire & Fichier" subtitle="Gestion des etudiants">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="CNE / Login" className={inputClass} />
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className={inputClass} />
          <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prenom" className={inputClass} />
          <input type="number" value={note1} onChange={(e) => setNote1(e.target.value)} placeholder="Note 1" className={inputClass} />
          <input type="number" value={note2} onChange={(e) => setNote2(e.target.value)} placeholder="Note 2" className={inputClass} />
          <input
            value={note1 && note2 ? ((Number(note1) + Number(note2)) / 2).toFixed(2) : ""}
            placeholder="Moyenne"
            readOnly
            className="bg-gray-800 border border-gray-700 text-gray-400 placeholder-gray-600 p-3 rounded-lg cursor-not-allowed"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            onClick={ajouterEtudiant}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            Ajouter
          </button>
          <button
            onClick={telechargerFichier}
            className="bg-gray-800 hover:bg-gray-700 text-orange-400 border border-gray-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            Telecharger master_rsi2020.txt
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">CNE/Login</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Prenom</th>
              <th className="px-4 py-3">Note 1</th>
              <th className="px-4 py-3">Note 2</th>
              <th className="px-4 py-3">Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {liste.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-gray-500 text-center">
                  Aucun etudiant ajoute.
                </td>
              </tr>
            ) : (
              liste.map((e, index) => (
                <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3 text-gray-300">{e.login}</td>
                  <td className="px-4 py-3 text-gray-300">{e.nom}</td>
                  <td className="px-4 py-3 text-gray-300">{e.prenom}</td>
                  <td className="px-4 py-3 text-gray-300">{e.note1}</td>
                  <td className="px-4 py-3 text-gray-300">{e.note2}</td>
                  <td className="px-4 py-3 text-orange-400 font-bold">{e.moyenne}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SimpleLayout>
  );
}
