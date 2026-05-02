import api from "./axios";

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