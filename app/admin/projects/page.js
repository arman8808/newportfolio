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
    Layers,
    Code,
    Globe,
    Github,
    Loader2,
    CheckCircle2,
    Target,
    Lightbulb,
    ChevronLeft,
    ChevronRight,
    Lock,
} from "lucide-react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => (
        <div className="h-40 p-4 border rounded-lg animate-pulse bg-gray-100"></div>
    ),
});

// Import Quill CSS on client side only
if (typeof window !== "undefined") {
    require("react-quill/dist/quill.snow.css");
}

import {
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
    useAdminProjects,
} from "@app/services/project.queries";

/* -------------------- Rich Text Editor -------------------- */
const RichTextEditor = ({ content, setContent, label, placeholder }) => {
    const modules = {
        toolbar: [
            [{ header: [2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                theme="snow"
                placeholder={placeholder}
                className="rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 bg-white"
            />
        </div>
    );
};

/* -------------------- Project Modal -------------------- */
const ProjectModal = ({
    isOpen,
    onClose,
    mode,
    project,
    onSubmit,
    isLoading
}) => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        subDesc: "",
        techStack: "", // Comma separated string
        liveLink: "",
        githubLink: "",
        isNDA: false,
        challenge: "",
        solution: "",
        outcomes: "", // Rich text string
        status: "draft",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (mode === "edit" && project) {
                setFormData({
                    title: project.title,
                    category: project.category || "",
                    subDesc: project.subDesc || "",
                    techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
                    liveLink: project.liveLink || "",
                    githubLink: project.githubLink || "",
                    isNDA: project.isNDA || false,
                    status: project.status || "draft",
                    challenge: project.caseStudy?.challenge || "",
                    solution: project.caseStudy?.solution || "",
                    outcomes: project.caseStudy?.outcomes || "",
                });
                if (project.image || project.imageUrl) {
                    setImagePreview(project.image || project.imageUrl);
                }
            } else {
                // Reset
                setFormData({
                    title: "",
                    category: "",
                    subDesc: "",
                    techStack: "",
                    liveLink: "",
                    githubLink: "",
                    liveLink: "",
                    githubLink: "",
                    isNDA: false,
                    status: "draft",
                    challenge: "",
                    solution: "",
                    outcomes: "",
                });
                setImageFile(null);
                setImagePreview(null);
            }
        }
    }, [isOpen, mode, project]);

    // Cleanup preview
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
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, imageFile);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b bg-gray-50/50">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {mode === "add" ? "Add New Project" : "Edit Project"}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Showcase your latest work.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form Body */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Image & Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Cover *</label>
                                    <div className="w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors relative group cursor-pointer">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400">
                                                    <Layers className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs text-gray-500">Upload Image</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required={mode === "add"}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <p className="text-xs text-center text-gray-400 mt-2">Recommended: 1600x1200px</p>
                                </div>

                                {/* Basic Fields */}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                            placeholder="e.g. E-Commerce Dashboard"
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                            <input
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                                placeholder="e.g. Fintech"
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack</label>
                                            <input
                                                value={formData.techStack}
                                                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                                placeholder="React, Node.js, ..."
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Live Link</label>
                                            <input
                                                value={formData.liveLink}
                                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                                placeholder="https://..."
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Github Link <span className="text-gray-400 font-normal">(Optional)</span>
                                            </label>
                                            <input
                                                value={formData.githubLink}
                                                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                                placeholder="https://github.com/..."
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                            <input
                                                type="checkbox"
                                                checked={formData.isNDA}
                                                onChange={(e) => setFormData({ ...formData, isNDA: e.target.checked })}
                                                className="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500 border-gray-300"
                                            />
                                            <div>
                                                <span className="block text-sm font-semibold text-gray-900">NDA Protected Project</span>
                                                <span className="block text-xs text-gray-500">Enable to show NDA badge and hide source links automatically.</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                            disabled={isLoading}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="unpublished">Unpublished</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                                        <textarea
                                            value={formData.subDesc}
                                            onChange={(e) => setFormData({ ...formData, subDesc: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                            placeholder="Brief overview of the project..."
                                            rows={3}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            {/* Case Study Section */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-cyan-600" />
                                    Case Study Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <RichTextEditor
                                            label="The Challenge"
                                            content={formData.challenge}
                                            setContent={(val) => setFormData({ ...formData, challenge: val })}
                                            placeholder="What problem were you solving?"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <RichTextEditor
                                            label="The Solution"
                                            content={formData.solution}
                                            setContent={(val) => setFormData({ ...formData, solution: val })}
                                            placeholder="How did you solve it?"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h4 className="text-md font-bold text-gray-900 mb-4">Key Outcomes & Impact</h4>

                                    <div className="mb-6">
                                        <RichTextEditor
                                            label="Key Results"
                                            content={formData.outcomes}
                                            setContent={(val) => setFormData({ ...formData, outcomes: val })}
                                            placeholder="List the key results and impact..."
                                        />
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* Footer */}
                    <div className="border-t p-6 bg-gray-50 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-5 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-medium flex items-center transition shadow-lg shadow-cyan-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Project
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div >
        </AnimatePresence >
    );
};

/* -------------------- Project Table -------------------- */
const ProjectTable = ({
    projects,
    onEdit,
    onDelete,
    pagination,
    onPageChange,
    isLoading
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Values</h3>
                    <p className="text-xs text-gray-500">
                        {pagination?.total || 0} projects found
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase bg-gray-50/50">
                            <th className="px-6 py-3 font-medium">Project</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Tech Stack</th>
                            <th className="px-6 py-3 font-medium text-center">NDA</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                                            {project.image || project.imageUrl ? (
                                                <img src={project.image || project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Layers className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{project.title}</h4>
                                            <p className="text-gray-500 text-xs line-clamp-1 max-w-[200px]">
                                                {project.subDesc || "No description"}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
                                        {project.category || "General"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {project.techStack?.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack?.length > 3 && (
                                            <span className="text-[10px] text-gray-400 px-1">+ {project.techStack.length - 3}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {project.isNDA ? (
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500" title="NDA Protected">
                                            <Lock className="w-4 h-4" />
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-500" title="Public">
                                            <Globe className="w-4 h-4" />
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(project)}
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(project._id)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {projects.length === 0 && !isLoading && (
                <div className="text-center py-16 border-t border-gray-100">
                    <Layers className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <h3 className="text-gray-900 font-medium text-sm">No projects found</h3>
                    <p className="text-gray-500 text-xs mt-1">Get started by creating your first project.</p>
                </div>
            )}

            {/* Pagination Footer */}
            {projects.length > 0 && pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50/50">
                    <span className="text-xs text-gray-500">
                        Page <span className="font-medium text-gray-900">{pagination.page}</span> of <span className="font-medium text-gray-900">{pagination.totalPages}</span>
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(Math.max(pagination.page - 1, 1))}
                            disabled={pagination.page === 1}
                            className="p-1.5 border border-gray-200 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onPageChange(Math.min(pagination.page + 1, pagination.totalPages))}
                            disabled={pagination.page === pagination.totalPages}
                            className="p-1.5 border border-gray-200 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

/* -------------------- Main Page -------------------- */
export default function AdminProjectsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [selectedProject, setSelectedProject] = useState(null);

    // Basic pagination state (could be expanded)
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useAdminProjects({ page: currentPage, limit });
    const createProject = useCreateProject();
    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();

    const projects = data?.data || [];
    const pagination = data?.meta || { total: 0, page: 1, totalPages: 1 };

    const handleEdit = (project) => {
        setSelectedProject(project);
        setModalMode("edit");
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            await deleteProject.mutateAsync(id);
            toast.success("Project deleted successfully");
        }
    };

    const handleFormSubmit = async (formData, imageFile) => {
        const form = new FormData();

        // Process form data
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "techStack") {
                const stack = value.split(",").map(s => s.trim()).filter(Boolean);
                stack.forEach(s => form.append("techStack[]", s));
            } else if (["challenge", "solution", "outcomes"].includes(key)) {
                // Send as caseStudy[key]
                form.append(`caseStudy[${key}]`, value);
            } else {
                form.append(key, value);
            }
        });

        if (imageFile) {
            form.append("image", imageFile);
        }

        try {
            if (modalMode === "add") {
                await createProject.mutateAsync(form);
                toast.success("Project created successfully!");
            } else {
                await updateProject.mutateAsync({ id: selectedProject._id, payload: form });
                toast.success("Project updated successfully!");
            }
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to save project");
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-500">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => {
                        setModalMode("add");
                        setSelectedProject(null);
                        setModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </button>
            </div>

            {/* Project Table */}
            <ProjectTable
                projects={projects}
                onEdit={handleEdit}
                onDelete={handleDelete}
                pagination={pagination}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
            />

            {/* Modal */}
            <ProjectModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                mode={modalMode}
                project={selectedProject}
                onSubmit={handleFormSubmit}
                isLoading={createProject.isLoading || updateProject.isLoading}
            />
        </div>
    );
}
