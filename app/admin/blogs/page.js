"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Eye,
  Calendar,
  Clock,
  Tag,
  Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

import {
  useCreateBlog,
  useUpdateBlog,
  useDeleteBlog,
  useAdminBlogs,
} from "@app/services/blog.queries";

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 p-4 border rounded-lg animate-pulse bg-gray-100"></div>
  ),
});

// Import Quill CSS on client side only
if (typeof window !== "undefined") {
  require("react-quill/dist/quill.snow.css");
}

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
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {status || "Draft"}
    </span>
  );
};

/* -------------------- Rich Text Editor -------------------- */
const RichTextEditor = ({ content, setContent }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Content</label>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme="snow"
        className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p className="text-xs text-gray-500">
        Rich text editor with formatting options
      </p>
    </div>
  );
};

/* -------------------- Blog Modal -------------------- */
const BlogModal = ({ 
  isOpen, 
  onClose, 
  mode, 
  blog, 
  onSubmit, 
  isLoading,
  resetForm 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    readTime: "",
    hashtags: "",
    content: "",
    status: "draft",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && blog) {
        setFormData({
          title: blog.title,
          description: blog.description || "",
          category: blog.category,
          author: blog.author,
          readTime: blog.readTime?.toString() || "",
          hashtags: Array.isArray(blog.hashtags)
            ? blog.hashtags.join(", ")
            : blog.hashtags || "",
          content: blog.content || "",
          status: blog.status,
        });
        if (blog.image || blog.imageUrl) {
          setImagePreview(blog.image || blog.imageUrl);
        }
      } else {
        // Reset form for add mode
        setFormData({
          title: "",
          description: "",
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
    }
  }, [isOpen, mode, blog]);

  // Clean up image preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clean up previous preview URL
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  const handleClose = () => {
    // Clean up image preview URL
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    onClose();
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === "add" ? "Create New Blog Post" : "Edit Blog Post"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {mode === "add"
                  ? "Add a new blog post to your site"
                  : "Make changes to your blog post"}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      required={mode === "add"}
                      disabled={isLoading}
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
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter blog title"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      required
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter author name"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="e.g., Technology, Lifestyle"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="e.g., 5"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hashtags
                    </label>
                    <input
                      value={formData.hashtags}
                      onChange={(e) =>
                        setFormData({ ...formData, hashtags: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="webdev, react, tutorial (comma separated)"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter a brief description of the blog post (2-3 sentences)"
                  rows={3}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will appear as a summary on blog listing pages
                </p>
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
                onClick={handleClose}
                disabled={isLoading}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === "add" ? "Creating..." : "Updating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {mode === "add" ? "Create Post" : "Update Post"}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* -------------------- Blog Table -------------------- */
const BlogTable = ({
  blogs,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
  deleteLoading,
  deleteLoadingId,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to strip HTML tags for description preview
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
            <p className="text-sm text-gray-500">
              {pagination?.total || 0} total posts • Page{" "}
              {pagination?.page || 1} of {pagination?.totalPages || 1}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {(blog.image || blog.imageUrl) && (
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={blog.image || blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {blog.readTime ? `${blog.readTime} min` : "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.description ||
                      stripHtml(blog.content).substring(0, 100) ||
                      "No description"}
                    {(blog.description || stripHtml(blog.content)).length > 100
                      ? "..."
                      : ""}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {blog.author?.charAt(0) || "A"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{blog.author}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-700">
                    {blog.category || "--"}
                  </span>
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
                      disabled={deleteLoading}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this blog post?"
                          )
                        ) {
                          onDelete(blog._id);
                        }
                      }}
                      disabled={deleteLoading && deleteLoadingId === blog._id}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      {deleteLoading && deleteLoadingId === blog._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    {blog.status === "published" && (
                      <button
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="View"
                        disabled={deleteLoading}
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
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No blog posts yet
          </h4>
          <p className="text-gray-500 max-w-sm mx-auto">
            Get started by creating your first blog post. Click the "New Blog"
            button above.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{blogs.length}</span> of{" "}
              <span className="font-medium">{pagination.total}</span> posts
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(Number(pagination.page) - 1)}
                disabled={Number(pagination.page) <= 1}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  Number(pagination.page) <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (Number(pagination.page) <= 3) {
                      pageNum = i + 1;
                    } else if (
                      Number(pagination.page) >=
                      pagination.totalPages - 2
                    ) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = Number(pagination.page) - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-8 h-8 rounded-md text-sm font-medium ${
                          Number(pagination.page) === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>
              <button
                onClick={() => onPageChange(Number(pagination.page) + 1)}
                disabled={Number(pagination.page) >= pagination.totalPages}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  Number(pagination.page) >= pagination.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: limit,
    ...(statusFilter !== "all" && { status: statusFilter }),
  };

  const { data, isLoading, refetch } = useAdminBlogs(queryParams);

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  // Extract data from response
  const blogs = data?.data || [];
  const pagination = data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const handleSubmit = (formData, imageFile) => {
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
      } else if (key === "readTime" && value) {
        form.append(key, parseInt(value) || 0);
      } else {
        form.append(key, value);
      }
    });

    // Append single image with key "image"
    if (imageFile) {
      form.append("image", imageFile);
    }

    const mutation = modalMode === "add" ? createBlog : updateBlog;

    mutation.mutate(
      modalMode === "add"
        ? form
        : { id: selectedBlog._id, payload: form },
      {
        onMutate: () => {
          toast.loading(
            modalMode === "add"
              ? "Creating blog post..."
              : "Updating blog post...",
            {
              id: "blog-operation",
            }
          );
        },
        onSuccess: (response) => {
          toast.success(
            modalMode === "add"
              ? "Blog post created successfully!"
              : "Blog post updated successfully!",
            {
              id: "blog-operation",
            }
          );
          setModalOpen(false);
          refetch();
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message ||
              (modalMode === "add"
                ? "Failed to create blog post"
                : "Failed to update blog post"),
            {
              id: "blog-operation",
            }
          );
        },
      }
    );
  };

  const handleDelete = (id) => {
    setDeleteLoadingId(id);
    deleteBlog.mutate(id, {
      onMutate: () => {
        toast.loading("Deleting blog post...", {
          id: "delete-blog",
        });
      },
      onSuccess: () => {
        toast.success("Blog post deleted successfully!", {
          id: "delete-blog",
        });
        refetch();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to delete blog post",
          {
            id: "delete-blog",
          }
        );
      },
      onSettled: () => {
        setDeleteLoadingId(null);
      },
    });
  };

  const handlePageChange = (newPage) => {
    const pageNumber = Number(newPage);
    setCurrentPage(pageNumber);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    // Clear selected blog when modal closes
    if (modalMode === "edit") {
      setSelectedBlog(null);
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setModalMode("edit");
    setModalOpen(true);
  };

  // Calculate stats
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const scheduledCount = blogs.filter((b) => b.status === "scheduled").length;

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Toaster position="top-right" />
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">
            Create, edit, and manage your blog posts
          </p>
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
              disabled={createBlog.isLoading || updateBlog.isLoading || deleteBlog.isLoading}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Blog Post
            </button>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCurrentPage(1);
                }}
                disabled={
                  createBlog.isLoading ||
                  updateBlog.isLoading ||
                  deleteBlog.isLoading
                }
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                  statusFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-white hover:shadow"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setStatusFilter("published");
                  setCurrentPage(1);
                }}
                disabled={
                  createBlog.isLoading ||
                  updateBlog.isLoading ||
                  deleteBlog.isLoading
                }
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                  statusFilter === "published"
                    ? "bg-green-600 text-white"
                    : "text-gray-500 hover:bg-white hover:shadow"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Published
              </button>
              <button
                onClick={() => {
                  setStatusFilter("draft");
                  setCurrentPage(1);
                }}
                disabled={
                  createBlog.isLoading ||
                  updateBlog.isLoading ||
                  deleteBlog.isLoading
                }
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                  statusFilter === "draft"
                    ? "bg-gray-600 text-white"
                    : "text-gray-500 hover:bg-white hover:shadow"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  createBlog.isLoading ||
                  updateBlog.isLoading ||
                  deleteBlog.isLoading
                }
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                {publishedCount} Published
              </div>
              <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                {draftCount} Drafts
              </div>
              <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                {scheduledCount} Scheduled
              </div>
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <BlogTable
          blogs={blogs}
          pagination={pagination}
          onEdit={handleEditBlog}
          onDelete={handleDelete}
          onPageChange={handlePageChange}
          deleteLoading={deleteBlog.isLoading}
          deleteLoadingId={deleteLoadingId}
        />

        {/* Blog Modal */}
        <BlogModal
          key={selectedBlog?._id || 'add'}
          isOpen={modalOpen}
          onClose={handleModalClose}
          mode={modalMode}
          blog={selectedBlog}
          onSubmit={handleSubmit}
          isLoading={createBlog.isLoading || updateBlog.isLoading}
        />
      </div>
    </div>
  );
}