import axiosClient from "@lib/axiosClient";

// Get all blogs
export const getBlogs = (params = {}) => {
  return axiosClient.get("/blogs", { params });
};

// Get single blog by id
export const getBlogById = (id) => {
  return axiosClient.get(`/blogs/${id}`);
};

/**
 * 🔒 Protected APIs (JWT via cookies)
 */

// Create blog
export const createBlog = (payload) => {
  return axiosClient.post("/blogs", payload);
};

// Update blog
export const updateBlog = (id, payload) => {
  return axiosClient.patch(`/blogs/${id}`, payload);
};

// Delete blog
export const deleteBlog = (id) => {
  return axiosClient.delete(`/blogs/${id}`);
};
