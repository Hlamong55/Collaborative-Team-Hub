import { create } from "zustand";

/* ================= AUTH STORE ================= */
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

/* ================= WORKSPACE STORE ================= */
export const useWorkspaceStore = create((set) => ({
  currentWorkspace: null,

  goals: [],
  tasks: [],
  members: [],

  /* SETTERS */
  setWorkspace: (ws) => set({ currentWorkspace: ws }),
  setGoals: (goals) => set({ goals }),
  setTasks: (tasks) => set({ tasks }),
  setMembers: (members) => set({ members }),

  /* ADD HELPERS (🔥 important) */
  addGoal: (goal) =>
    set((state) => ({
      goals: [goal, ...state.goals],
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  updateTask: (taskId, updatedData) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updatedData } : t
      ),
    })),

  resetWorkspace: () =>
    set({
      currentWorkspace: null,
      goals: [],
      tasks: [],
      members: [],
    }),
}));