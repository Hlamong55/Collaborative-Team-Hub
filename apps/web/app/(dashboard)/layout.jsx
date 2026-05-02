"use client";

import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/store";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { setUser, logout, loading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 🔥 backend already has /api/me
        const res = await api.get("/me");
        setUser(res.data);
      } catch (err) {
        logout();
        router.push("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return <div>{children}</div>;
}