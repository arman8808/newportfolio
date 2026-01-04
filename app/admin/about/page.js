"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutData, updateAboutData } from "@app/services/about.service";
import axiosClient from "@lib/axiosClient";
import toast from "react-hot-toast";
import { Save, Upload, Plus, X, Loader2, FileText, Trash2, GripVertical, Calendar } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AdminAboutPage() {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        bio: "",
        experienceStartDate: "2022-07-01",
        skills: [],
        resumeUrl: "",
        imageUrl: "",
        timeline: [],
    });
    const [skillInput, setSkillInput] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);

    // Timeline State
    const [newTimeline, setNewTimeline] = useState({
        title: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        desc: "",
        icon: "🚀",
        category: "fullstack",
    });

    // Fetch data
    const { data: aboutData, isLoading } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            try {
                const res = await getAboutData();
                return res.data;
            } catch (error) {
                // Fallback or empty if not found
                return null;
            }
        },
    });

    useEffect(() => {
        if (aboutData) {
            setFormData({
                bio: aboutData.bio || "",
                experienceStartDate: aboutData.experienceStartDate || "2022-07-01",
                skills: aboutData.skills || [],
                resumeUrl: aboutData.resumeUrl || "",
                imageUrl: aboutData.imageUrl || "",
                timeline: aboutData.timeline || [],
            });
        }
    }, [aboutData]);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: updateAboutData,
        onSuccess: () => {
            queryClient.invalidateQueries(["about"]);
            toast.success("About section updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update about section");
        },
    });

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBioChange = (value) => {
        setFormData((prev) => ({ ...prev, bio: value }));
    };

    const handleAddSkill = () => {
        if (skillInput.trim()) {
            if (!formData.skills.includes(skillInput.trim())) {
                setFormData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()],
                }));
            }
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    // Timeline Handlers
    const handleTimelineChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTimeline((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddTimeline = () => {
        // Validate
        if (!newTimeline.title || !newTimeline.startDate || (!newTimeline.isPresent && !newTimeline.endDate) || !newTimeline.desc) {
            toast.error("Please fill in all required timeline fields");
            return;
        }

        // Format Date String
        const startObj = new Date(newTimeline.startDate);
        const startStr = format(startObj, "MMM yyyy");

        let endStr = "Present";
        if (!newTimeline.isPresent && newTimeline.endDate) {
            const endObj = new Date(newTimeline.endDate);
            endStr = format(endObj, "MMM yyyy");
        }

        const formattedDate = `${startStr} • ${endStr}`;

        const timelineItem = {
            ...newTimeline,
            date: formattedDate, // Save the formatted string for frontend display
        };

        setFormData((prev) => ({
            ...prev,
            timeline: [...prev.timeline, timelineItem],
        }));

        // Reset form
        setNewTimeline({
            title: "",
            startDate: "",
            endDate: "",
            isPresent: false,
            desc: "",
            icon: "🚀",
            category: "fullstack",
        });
    };

    const handleRemoveTimeline = (index) => {
        setFormData((prev) => ({
            ...prev,
            timeline: prev.timeline.filter((_, i) => i !== index),
        }));
    };

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            if (type === "image") setUploadingImage(true);
            else setUploadingResume(true);

            const res = await axiosClient.post("/upload", uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const url = res.url || res.data?.url;

            setFormData((prev) => ({
                ...prev,
                [type === "image" ? "imageUrl" : "resumeUrl"]: url,
            }));

            toast.success(`${type === "image" ? "Image" : "Resume"} uploaded!`);
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            if (type === "image") setUploadingImage(false);
            else setUploadingResume(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center sticky top-0 bg-gray-50 py-4 z-10">
                <h1 className="text-2xl font-bold text-gray-800">Edit About Section</h1>
                <button
                    onClick={handleSubmit}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium"
                >
                    {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Bio */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                            Bio & Experience
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Introduction (Bio)</label>
                                <div className="bg-gray-50/50 rounded-xl overflow-hidden [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[150px]">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.bio}
                                        onChange={handleBioChange}
                                        placeholder="Hello, I am Arman Ali..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Career Start Date</label>
                                <input
                                    type="date"
                                    name="experienceStartDate"
                                    value={formData.experienceStartDate}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50/50 focus:bg-white"
                                />
                                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                    <Loader2 className="w-3 h-3" /> Used to calculate "Years of Experience"
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Timeline Management */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            Timeline / Work History
                        </h3>

                        {/* Add New Item Form */}
                        <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-200 mb-8">
                            <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Add New Experience</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <input
                                        type="text"
                                        name="title"
                                        value={newTimeline.title}
                                        onChange={handleTimelineChange}
                                        placeholder="Role • Company"
                                        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full"
                                    />
                                </div>

                                {/* Date Selection */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={newTimeline.startDate}
                                        onChange={handleTimelineChange}
                                        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full bg-white"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase flex justify-between">
                                        End Date
                                        <label className="flex items-center gap-1 cursor-pointer normal-case text-purple-600">
                                            <input
                                                type="checkbox"
                                                name="isPresent"
                                                checked={newTimeline.isPresent}
                                                onChange={handleTimelineChange}
                                                className="w-3.5 h-3.5 accent-purple-600 rounded"
                                            />
                                            Current
                                        </label>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={newTimeline.endDate}
                                        onChange={handleTimelineChange}
                                        disabled={newTimeline.isPresent}
                                        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                    />
                                </div>

                                {/* Category & Icon */}
                                <input
                                    type="text"
                                    name="icon"
                                    value={newTimeline.icon}
                                    onChange={handleTimelineChange}
                                    placeholder="Icon (e.g. 🚀)"
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full"
                                />
                                <select
                                    name="category"
                                    value={newTimeline.category}
                                    onChange={handleTimelineChange}
                                    className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full bg-white"
                                >
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="fullstack">Fullstack</option>
                                    <option value="product">Product</option>
                                    <option value="design">Design</option>
                                </select>

                                {/* Description */}
                                <textarea
                                    name="desc"
                                    value={newTimeline.desc}
                                    onChange={handleTimelineChange}
                                    placeholder="Description of the role and achievements..."
                                    rows={3}
                                    className="md:col-span-2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full resize-none"
                                />
                            </div>
                            <button
                                onClick={handleAddTimeline}
                                type="button"
                                className="mt-4 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium text-sm"
                            >
                                <Plus className="w-4 h-4" /> Add Experience
                            </button>
                        </div>

                        {/* List Items */}
                        <div className="space-y-3">
                            {formData.timeline?.length === 0 && (
                                <p className="text-center text-gray-500 py-4 italic">No timeline items yet.</p>
                            )}
                            {formData.timeline?.map((item, idx) => (
                                <div key={idx} className="group relative bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-lg">
                                        {item.icon}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="font-bold text-gray-800 truncate">{item.title}</h5>
                                                <p className="text-xs font-semibold text-purple-600 mb-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {item.date}
                                                </p>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 text-gray-500 rounded-md">{item.category}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveTimeline(idx)}
                                        className="absolute top-2 right-2 p-2 bg-white text-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all shadow-sm border border-gray-100"
                                        title="Remove Item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                            Skills
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-gray-50/50 focus:bg-white"
                                    placeholder="Add a skill (e.g. React.js)"
                                />
                                <button
                                    onClick={handleAddSkill}
                                    type="button"
                                    className="p-3 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                                {formData.skills.length === 0 && <span className="text-sm text-gray-400 italic">No skills added yet.</span>}
                                {formData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-white text-gray-700 rounded-lg text-sm border border-gray-200 shadow-sm group hover:border-teal-300 transition-colors"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="p-0.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Uploads */}
                <div className="space-y-8">
                    {/* Profile Image */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            Profile Image
                        </h3>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group hover:border-blue-500 transition-all cursor-pointer">
                                {formData.imageUrl ? (
                                    <Image src={formData.imageUrl} alt="Profile" fill className="object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="text-center text-gray-400 p-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-3">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-medium">Click to upload</span>
                                    </div>
                                )}

                                <label className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        {uploadingImage ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />}
                                        Change Photo
                                    </span>
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} disabled={uploadingImage} />
                                </label>
                            </div>
                            <p className="text-xs text-center text-gray-500 px-4">
                                Recommended: High-quality portrait (4:5 or 1:1 ratio)
                            </p>
                        </div>
                    </section>

                    {/* Resume */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                            Resume / CV
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 font-semibold uppercase mb-0.5">Current File</p>
                                    {formData.resumeUrl ? (
                                        <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" className="block font-medium truncate hover:text-red-600 transition-colors">
                                            View Resume.pdf
                                        </a>
                                    ) : <span className="text-gray-400 italic">No file uploaded</span>}
                                </div>
                            </div>

                            <label className="group flex items-center justify-center gap-2 w-full p-3.5 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-xl cursor-pointer hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all font-medium">
                                {uploadingResume ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
                                <span>Upload New PDF</span>
                                <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, "resume")} disabled={uploadingResume} />
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
