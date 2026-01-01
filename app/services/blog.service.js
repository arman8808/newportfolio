// @app/services/blog.service.ts
import axiosClient from "@lib/axiosClient";

/* ===================== PUBLIC ===================== */
export const getBlogs = (params = {}) => {
  return axiosClient.get("/blogs", { params });
};

export const getBlogById = (id) => {
  return axiosClient.get(`/blogs/${id}`);
};

/* ===================== ADMIN ===================== */
export const getBlogsAdmin = (params = {}) => {
  return axiosClient.get("/blogs/admin", { params });
};

export const createBlog = (payload) => {
  return axiosClient.post("/blogs", payload);
};

export const updateBlog = (id, payload) => {
  return axiosClient.patch(`/blogs/${id}`, payload);
};

export const deleteBlog = (id) => {
  return axiosClient.delete(`/blogs/${id}`);
};