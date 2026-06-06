"use client";

import { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SimpleLayout from "../components/SimpleLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatistiquesPage() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    fetch("/api/statistiques")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEtudiants(data.data);
      });
  }, []);

  const data = {
    labels: etudiants.map((e) => e.nom),
    datasets: [
      {
        label: "Moyenne des etudiants",
        data: etudiants.map((e) => e.moyenne),
        backgroundColor: "#f97316",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#d1d5db" },
      },
      title: {
        display: true,
        text: "Statistiques depuis MySQL",
        color: "#f97316",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
      y: {
        min: 0,
        max: 20,
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
    },
  };

  return (
    <SimpleLayout title="Statistiques" subtitle="Moyennes des etudiants">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        {etudiants.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="text-center text-gray-500 py-8">
            Aucun etudiant trouve dans la base de donnees.
          </p>
        )}
      </div>
    </SimpleLayout>
  );
}
