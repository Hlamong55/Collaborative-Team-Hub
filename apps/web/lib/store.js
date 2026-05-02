import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: false,
  loading: true,

  setUser: (user) => set({ user, isAuth: true, loading: false }),
  logout: () => set({ user: null, isAuth: false, loading: false }),
  stopLoading: () => set({ loading: false }),
}));