import axiosClient from "@lib/axiosClient";

/* ===================== PUBLIC ===================== */

// GET /blogs?page=1&limit=10
export const getBlogs = (params = {}) => {
  return axiosClient.get("/blogs", { params });
};

// GET /blogs/:id
export const getBlogById = (id) => {
  return axiosClient.get(`/blogs/${id}`);
};

/* ===================== ADMIN ===================== */

// GET /blogs/admin?page=1&limit=10
export const getBlogsAdmin = (params = {}) => {
  return axiosClient.get("/blogs/admin", { params });
};

// POST /blogs
export const createBlog = (payload) => {
  return axiosClient.post("/blogs", payload);
};

// PATCH /blogs/:id
export const updateBlog = (id, payload) => {
  return axiosClient.patch(`/blogs/${id}`, payload);
};

// DELETE /blogs/:id
export const deleteBlog = (id) => {
  return axiosClient.delete(`/blogs/${id}`);
};
