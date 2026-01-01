"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsAdmin,
} from "./blog.service";

/* ===================== PUBLIC ===================== */

export const useBlogs = (params) =>
  useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
    keepPreviousData: true,
  });

export const useBlog = (id) =>
  useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("No blog ID provided");
      const response = await getBlogById(id);
      return response;
    },
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    // Important: Disable suspense to prevent async/await issues
    suspense: false,
  });

/* ===================== ADMIN ===================== */
export const useAdminBlogs = (params) =>
  useQuery({
    queryKey: ["admin-blogs", params],
    queryFn: () => getBlogsAdmin(params),
    keepPreviousData: true,

  });

/* ===================== MUTATIONS ===================== */

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateBlog(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    },
  });
};
