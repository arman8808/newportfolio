"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, Save, Eye, Calendar, Clock, Tag } from "lucide-react";

import {
  useBlogs,
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
} from "@app/services/blog.queries";

/* -------------------- Status Badge -------------------- */
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status || "Draft"}
    </span>
  );
};

/* -------------------- Rich Text Editor -------------------- */
const RichTextEditor = ({ content, setContent }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Content</label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      placeholder="Write your blog content here... (Markdown supported)"
    />
    <p className="text-xs text-gray-500">Supports Markdown formatting</p>
  </div>
);

/* -------------------- Blog Modal -------------------- */
const BlogModal = ({ isOpen, onClose, mode, blog, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    readTime: "",
    hashtags: "",
    content: "",
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (mode === "edit" && blog) {
      setFormData({
        title: blog.title,
        category: blog.category,
        author: blog.author,
        readTime: blog.readTime,
        hashtags: blog.hashtags?.join(", ") || "",
        content: blog.content || "",
        status: blog.status,
      });
      if (blog.image) {
        setImagePreview(blog.image);
      }
    } else {
      // Reset form for add mode
      setFormData({
        title: "",
        category: "",
        author: "",
        readTime: "",
        hashtags: "",
        content: "",
        status: "draft",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [mode, blog, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "hashtags") {
        // Handle hashtags array
        const tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        tags.forEach((tag) => form.append("hashtags[]", tag));
      } else {
        form.append(key, value);
      }
    });

    // Append single image with key "image"
    if (imageFile) {
      form.append("image", imageFile);
    }

    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === "add" ? "Create New Blog Post" : "Edit Blog Post"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "add" ? "Add a new blog post to your site" : "Make changes to your blog post"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Single Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="mx-auto w-8 h-8 bg-gray-200 rounded-full mb-2" />
                        <p className="text-xs text-gray-500">No image</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required={mode === "add"}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: 1200x630px • Max 2MB • Single image only
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., Technology, Lifestyle"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Read Time
                    </label>
                    <input
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., 5 min"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hashtags
                    </label>
                    <input
                      value={formData.hashtags}
                      onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="webdev, react, tutorial (comma separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Editor - Full Width */}
              <RichTextEditor
                content={formData.content}
                setContent={(content) => setFormData({ ...formData, content })}
              />
            </form>
          </div>

          {/* Modal Footer */}
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {mode === "add" ? "Create Post" : "Update Post"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* -------------------- Blog Table -------------------- */
const BlogTable = ({ blogs, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
            <p className="text-sm text-gray-500">{blogs.length} total posts</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr 
                key={blog._id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {blog.image && (
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{blog.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{blog.readTime || '--'}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {blog.author?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{blog.author}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-700">{blog.category || '--'}</span>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={blog.status} />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(blog.createdAt || blog.updatedAt)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(blog)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this blog post?')) {
                          onDelete(blog._id);
                        }
                      }}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {blog.status === 'published' && (
                      <button
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Edit className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h4>
          <p className="text-gray-500 max-w-sm mx-auto">
            Get started by creating your first blog post. Click the "New Blog" button above.
          </p>
        </div>
      )}
    </div>
  );
};

/* -------------------- Main Page -------------------- */
export default function AdminBlogsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { data: blogs = [], isLoading, refetch } = useBlogs();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  const handleSubmit = (formData) => {
    const mutation = modalMode === "add" ? createBlog : updateBlog;
    
    mutation.mutate(
      modalMode === "add" ? formData : { id: selectedBlog._id, payload: formData },
      {
        onSuccess: () => {
          setModalOpen(false);
          refetch();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage your blog posts</p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setModalMode("add");
                setSelectedBlog(null);
                setModalOpen(true);
              }}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Blog Post
            </button>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:shadow rounded-lg transition">
                All
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-white hover:shadow rounded-lg transition">
                Published
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-white hover:shadow rounded-lg transition">
                Draft
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                {blogs.filter(b => b.status === 'published').length} Published
              </div>
              <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                {blogs.filter(b => b.status === 'draft').length} Drafts
              </div>
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <BlogTable
          blogs={blogs}
          onEdit={(blog) => {
            setSelectedBlog(blog);
            setModalMode("edit");
            setModalOpen(true);
          }}
          onDelete={(id) => deleteBlog.mutate(id)}
        />

        {/* Blog Modal */}
        <BlogModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          blog={selectedBlog}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}