import { create } from "zustand";

/* Auth Store */
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

/* Workspace Store */
export const useWorkspaceStore = create((set) => ({
  currentWorkspace: null,
  setWorkspace: (ws) => set({ currentWorkspace: ws }),
}));