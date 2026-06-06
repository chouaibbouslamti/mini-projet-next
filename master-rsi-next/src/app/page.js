"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, pass }),
    });
    const data = await res.json();

    if (data.success) {
      router.push("/home");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500" />

        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-lg">
            C
          </span>
          <h1 className="text-2xl font-bold text-white">Master RSI</h1>
        </div>
        <p className="text-gray-500 text-center text-sm mb-8">
          Connexion a la plateforme
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Login"
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            required
          />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Mot de passe"
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 p-3 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            required
          />
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition">
            Se connecter
          </button>
          <Link
            href="/home"
            className="block text-center bg-gray-800 hover:bg-gray-700 text-orange-400 border border-gray-700 p-3 rounded-lg font-semibold transition"
          >
            Entrer sans connexion
          </Link>
        </div>

        {message && (
          <p className="text-red-400 text-center mt-5 text-sm">{message}</p>
        )}
      </form>
    </main>
  );
}
