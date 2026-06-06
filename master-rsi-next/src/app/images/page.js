"use client";

import { useEffect, useState } from "react";
import SimpleLayout from "../components/SimpleLayout";

export default function ImagesPage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    if (data.success) setImages(data.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Choisissez une image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setMessage(data.message);
    setFile(null);
    fetchImages();
  };

  return (
    <SimpleLayout title="Gestion des images" subtitle="Insertion et affichage d'images">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        {message && (
          <div className="bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded-lg p-4 mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg p-3 w-full outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:cursor-pointer"
          />
          <button
            onClick={handleUpload}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap"
          >
            Inserer image
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition"
          >
            <img src={img.image} alt={img.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <p className="font-bold text-white text-sm">{img.name}</p>
              <p className="text-gray-500 text-xs mt-1">{img.type}</p>
            </div>
          </div>
        ))}
      </div>
    </SimpleLayout>
  );
}
