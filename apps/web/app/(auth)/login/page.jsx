"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";
import { useAuthStore } from "../../../lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await api.post("/auth/login", form);
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };


   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to your workspace
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-80 hover:scale-105 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

