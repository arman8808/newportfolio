"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHeroData, updateHeroData } from "@app/services/hero.service";
import axiosClient from "@lib/axiosClient";
import toast from "react-hot-toast";
import { Save, Upload, Plus, X, Loader2, Link as LinkIcon, Download, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

export default function AdminHeroPage() {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        titles: [],
        resumeUrl: "",
        socialLinks: {
            github: "",
            linkedin: "",
            instagram: "",
            facebook: "",
        },
    });
    const [titleInput, setTitleInput] = useState("");
    const [uploadingResume, setUploadingResume] = useState(false);

    // Fetch data
    const { data: heroData, isLoading } = useQuery({
        queryKey: ["hero"],
        queryFn: async () => {
            try {
                const res = await getHeroData();
                return res.data;
            } catch (error) {
                return null;
            }
        },
    });

    useEffect(() => {
        if (heroData) {
            setFormData({
                titles: heroData.titles || [],
                resumeUrl: heroData.resumeUrl || "",
                socialLinks: {
                    github: heroData.socialLinks?.github || "",
                    linkedin: heroData.socialLinks?.linkedin || "",
                    instagram: heroData.socialLinks?.instagram || "",
                    facebook: heroData.socialLinks?.facebook || "",
                },
            });
        }
    }, [heroData]);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: updateHeroData,
        onSuccess: () => {
            queryClient.invalidateQueries(["hero"]);
            toast.success("Hero section updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update hero section");
        },
    });

    // Handlers
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value },
        }));
    };

    const handleAddTitle = () => {
        if (titleInput.trim()) {
            if (!formData.titles.includes(titleInput.trim())) {
                setFormData((prev) => ({
                    ...prev,
                    titles: [...prev.titles, titleInput.trim()],
                }));
            }
            setTitleInput("");
        }
    };

    const handleRemoveTitle = (titleToRemove) => {
        setFormData((prev) => ({
            ...prev,
            titles: prev.titles.filter((title) => title !== titleToRemove),
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            setUploadingResume(true);
            const res = await axiosClient.post("/upload", uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const url = res.url || res.data?.url;

            setFormData((prev) => ({
                ...prev,
                resumeUrl: url,
            }));

            toast.success("Resume uploaded!");
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploadingResume(false);
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
                <h1 className="text-2xl font-bold text-gray-800">Edit Hero Section</h1>
                <button
                    onClick={handleSubmit}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium"
                >
                    {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Titles Section */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                        Rotating Titles
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={titleInput}
                                onChange={(e) => setTitleInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddTitle()}
                                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50/50 focus:bg-white"
                                placeholder="Add a title (e.g. Full Stack Developer)"
                            />
                            <button
                                onClick={handleAddTitle}
                                type="button"
                                className="p-3 bg-cyan-50 text-cyan-700 rounded-xl hover:bg-cyan-100 transition-colors"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 min-h-[60px] p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                            {formData.titles.length === 0 && <span className="text-sm text-gray-400 italic">No titles added yet.</span>}
                            {formData.titles.map((title) => (
                                <div
                                    key={title}
                                    className="flex items-center justify-between p-3 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm"
                                >
                                    <span className="font-medium">{title}</span>
                                    <button
                                        onClick={() => handleRemoveTitle(title)}
                                        className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Links & Resume */}
                <div className="space-y-8">
                    {/* Social Links */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            Social Links
                        </h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Github className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.socialLinks.github}
                                    onChange={handleSocialChange}
                                    placeholder="GitHub URL"
                                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.socialLinks.linkedin}
                                    onChange={handleSocialChange}
                                    placeholder="LinkedIn URL"
                                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                            <div className="relative">
                                <Instagram className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="instagram"
                                    value={formData.socialLinks.instagram}
                                    onChange={handleSocialChange}
                                    placeholder="Instagram URL"
                                    className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Resume Upload */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                            Resume / CV
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                    <Download className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 font-semibold uppercase mb-0.5">Current File</p>
                                    {formData.resumeUrl ? (
                                        <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" className="block font-medium truncate hover:text-red-600 transition-colors">
                                            View Uploaded Resume
                                        </a>
                                    ) : <span className="text-gray-400 italic">No file uploaded</span>}
                                </div>
                            </div>

                            <label className="group flex items-center justify-center gap-2 w-full p-3.5 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-xl cursor-pointer hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all font-medium">
                                {uploadingResume ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
                                <span>Upload New PDF</span>
                                <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={uploadingResume} />
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
