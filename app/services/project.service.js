// @app/services/project.service.ts
import axiosClient from "@lib/axiosClient";

/* ===================== PUBLIC ===================== */
export const getProjects = (params = {}) => {
    return axiosClient.get("/projects", { params });
};

export const getProjectById = (id) => {
    return axiosClient.get(`/projects/${id}`);
};

/* ===================== ADMIN ===================== */
export const getProjectsAdmin = (params = {}) => {
    return axiosClient.get("/projects/admin", { params });
};

export const createProject = (payload) => {
    return axiosClient.post("/projects", payload);
};

export const updateProject = (id, payload) => {
    return axiosClient.patch(`/projects/${id}`, payload);
};

export const deleteProject = (id) => {
    return axiosClient.delete(`/projects/${id}`);
};
