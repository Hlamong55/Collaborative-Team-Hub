"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);

      alert("Account created!");

      router.push("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Register failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account 🚀
        </h1>

        <p className="text-center font-medium text-gray-400 mb-8">
          Start managing your team
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-80 hover:scale-105 transition"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-400 cursor-pointer hover:underline hover:font-bold"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}