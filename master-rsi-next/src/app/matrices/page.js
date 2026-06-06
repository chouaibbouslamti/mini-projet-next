"use client";

import { useState } from "react";
import SimpleLayout from "../components/SimpleLayout";

export default function MatricesPage() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix1, setMatrix1] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const [sumResult, setSumResult] = useState([]);
  const [productResult, setProductResult] = useState([]);

  const generateMatrix = () => {
    const r = Number(rows);
    const c = Number(cols);

    if (r <= 0 || c <= 0) {
      alert("Veuillez entrer des dimensions valides");
      return;
    }

    const m1 = [];
    const m2 = [];

    for (let i = 0; i < r; i++) {
      const row1 = [];
      const row2 = [];

      for (let j = 0; j < c; j++) {
        row1.push(Math.floor(Math.random() * 10));
        row2.push(Math.floor(Math.random() * 10));
      }

      m1.push(row1);
      m2.push(row2);
    }

    setMatrix1(m1);
    setMatrix2(m2);
    setSumResult([]);
    setProductResult([]);
  };

  const calculateSum = () => {
    if (!matrix1.length) {
      alert("Generez les matrices d'abord");
      return;
    }

    setSumResult(matrix1.map((row, i) => row.map((value, j) => value + matrix2[i][j])));
  };

  const calculateProduct = () => {
    if (!matrix1.length) {
      alert("Generez les matrices d'abord");
      return;
    }

    if (matrix1[0].length !== matrix2.length) {
      alert("Produit impossible : colonnes de M1 doivent etre egales aux lignes de M2");
      return;
    }

    const result = [];

    for (let i = 0; i < matrix1.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        let somme = 0;
        for (let k = 0; k < matrix2.length; k++) {
          somme += matrix1[i][k] * matrix2[k][j];
        }
        result[i][j] = somme;
      }
    }

    setProductResult(result);
  };

  const renderMatrix = (matrix) => {
    if (!matrix.length)
      return <p className="text-gray-600 text-sm">Aucune valeur</p>;

    return (
      <div className="space-y-2">
        {matrix.map((row, i) => (
          <div key={i} className="font-mono text-cyan-400 text-sm">
            [ {row.join("  ")} ]
          </div>
        ))}
      </div>
    );
  };

  const inputClass =
    "w-full mt-2 bg-gray-800 border border-gray-700 text-white p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition";

  return (
    <SimpleLayout title="Manipulation de matrices" subtitle="Somme et produit">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="font-semibold text-gray-300 text-sm">
            Lignes
            <input
              type="number"
              min="1"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="font-semibold text-gray-300 text-sm">
            Colonnes
            <input
              type="number"
              min="1"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              className={inputClass}
            />
          </label>

          <button
            onClick={generateMatrix}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold px-5 py-3 self-end transition"
          >
            Generer
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Matrice 1</h2>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-40 mb-4">
            {renderMatrix(matrix1)}
          </div>
          <button
            onClick={calculateSum}
            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg px-5 py-3 font-semibold transition"
          >
            Calculer Somme
          </button>
          <h3 className="font-bold text-gray-300 mt-6 mb-2 text-sm">Resultat somme</h3>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-32">
            {renderMatrix(sumResult)}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Matrice 2</h2>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-40 mb-4">
            {renderMatrix(matrix2)}
          </div>
          <button
            onClick={calculateProduct}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-5 py-3 font-semibold transition"
          >
            Calculer Produit
          </button>
          <h3 className="font-bold text-gray-300 mt-6 mb-2 text-sm">Resultat produit</h3>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 min-h-32">
            {renderMatrix(productResult)}
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
