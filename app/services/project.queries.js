"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectsAdmin,
} from "./project.service";

/* ===================== PUBLIC ===================== */

export const useProjects = (params) =>
    useQuery({
        queryKey: ["projects", params],
        queryFn: () => getProjects(params),
        keepPreviousData: true,
    });

export const useProject = (id) =>
    useQuery({
        queryKey: ["project", id],
        queryFn: async () => {
            if (!id) throw new Error("No project ID provided");
            const response = await getProjectById(id);
            return response;
        },
        enabled: !!id,
        retry: 1,
        refetchOnWindowFocus: false,
        suspense: false,
    });

/* ===================== ADMIN ===================== */
export const useAdminProjects = (params) =>
    useQuery({
        queryKey: ["admin-projects", params],
        queryFn: () => getProjectsAdmin(params),
        keepPreviousData: true,
    });

/* ===================== MUTATIONS ===================== */

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => updateProject(id, payload),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", id] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
        },
    });
};
