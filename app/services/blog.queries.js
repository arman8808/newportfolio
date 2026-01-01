import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsAdmin,
} from "./blog.service";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
    queryFn: () => getBlogById(id),
    enabled: !!id,
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
