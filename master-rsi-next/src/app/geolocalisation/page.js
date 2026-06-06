"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SimpleLayout from "../components/SimpleLayout";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function GeolocalisationPage() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    fetch("/api/geolocalisation")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEtudiants(data.data);
      });
  }, []);

  return (
    <SimpleLayout title="Geolocalisation" subtitle="Carte des etudiants">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="overflow-hidden rounded-xl border border-gray-700">
          <MapContainer
            center={[31.7917, -7.0926]}
            zoom={5}
            scrollWheelZoom
            style={{ height: "440px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {etudiants
              .filter((e) => e.latitude && e.longitude)
              .map((etudiant, index) => (
                <Marker
                  key={index}
                  position={[Number(etudiant.latitude), Number(etudiant.longitude)]}
                >
                  <Popup>
                    <strong>{etudiant.nom}</strong>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </SimpleLayout>
  );
}
