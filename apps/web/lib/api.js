import api from "./axios";

// workspace
export const getWorkspaces = async () => {
  const res = await api.get("/workspaces");
  return res.data;
};

export const createWorkspace = async (payload) => {
  const res = await api.post("/workspaces", payload);
  return res.data;
};

export const getWorkspaceById = async (id) => {
  const res = await api.get(`/workspaces/single/${id}`);
  return res.data;
};

// GOALS
export const getGoals = async (workspaceId) => {
  const res = await api.get(`/workspaces/${workspaceId}/goals`);
  return res.data;
};

export const createGoal = async (workspaceId, data) => {
  const res = await api.post(`/workspaces/${workspaceId}/goals`, data);
  return res.data;
};

// TASKS
export const getTasks = async (workspaceId) => {
  const res = await api.get(`/workspaces/${workspaceId}/tasks`);
  return res.data;
};

export const createTask = async (workspaceId, data) => {
  const res = await api.post(`/workspaces/${workspaceId}/tasks`, data);
  return res.data;
};

export const updateTaskStatus = async (workspaceId, taskId, status) => {
  const res = await api.patch(
    `/workspaces/${workspaceId}/tasks/${taskId}`,
    { status }
  );
  return res.data;
};