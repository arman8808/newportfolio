"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";
import { useProjects } from "@app/services/project.queries";
import { useRouter } from "next/navigation";

function AllProjectsPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 9; // 9 projects per page (3x3 grid)

    const {
        data: projectsResponse,
        isLoading,
        error,
    } = useProjects({
        page: currentPage,
        limit: limit,
    });

    const projects = projectsResponse?.data || [];
    const totalPages = projectsResponse?.meta?.totalPages || 1;
    const totalProjects = projectsResponse?.meta?.total || 0;

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const handlePageChange = (page) => {
        // Ensure page is a number
        const pageNumber = Number(page);

        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <section className="min-h-screen bg-[#f9f9f9] py-12 px-4 md:px-6">
                <div className="max-w-7xl mx-auto relative">
                    {/* Page Header Skeleton */}
                    <div className="text-center mb-12">
                        <div className="h-10 bg-gray-200 rounded-full w-48 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 max-w-2xl mx-auto mb-2 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 max-w-2xl mx-auto animate-pulse"></div>
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl h-[450px] border border-gray-100 animate-pulse shadow-sm p-4">
                                <div className="h-[200px] bg-gray-200 rounded-xl mb-4" />
                                <div className="space-y-3">
                                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center items-center space-x-2 animate-pulse">
                        <div className="w-24 h-10 bg-gray-200 rounded"></div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-10 h-10 bg-gray-200 rounded"></div>
                        ))}
                        <div className="w-20 h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen bg-[#f9f9f9] py-12 px-4 md:px-6">
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center py-20">
                        <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                            <svg
                                className="w-full h-full"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-medium text-gray-800 mb-2">
                            Error Loading Projects
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Failed to load projects. Please try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f9f9f9] py-12 px-4 md:px-6">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Page Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        variants={fadeUp}
                    >
                        All Projects
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-500 max-w-2xl mx-auto"
                        variants={fadeUp}
                    >
                        Explore our complete collection of case studies, from fintech dashboards to e-commerce platforms.
                    </motion.p>
                </motion.div>

                {projects.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                            <svg
                                className="w-full h-full"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">
                            No projects found
                        </h3>
                        <p className="text-gray-500">Check back soon for new case studies.</p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={project._id || index}
                                    project={project}
                                    index={index}
                                    onClick={() => router.push(`Projects/${project._id}`)}
                                />
                            ))}
                        </motion.div>

                        {totalPages > 1 && (
                            <motion.div
                                className="flex justify-center items-center space-x-2"
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                            >
                                {/* Previous Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        currentPage > 1 && handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${currentPage === 1
                                        ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "border-cyan-400/80 bg-transparent text-cyan-600 hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-700"
                                        }`}
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    Previous
                                </motion.button>

                                {/* Page Numbers */}
                                {(() => {
                                    const pages = [];
                                    const maxVisiblePages = 5;

                                    const currentPageNum = Number(currentPage);
                                    const totalPagesNum = Number(totalPages);

                                    let startPage = Math.max(
                                        1,
                                        currentPageNum - Math.floor(maxVisiblePages / 2)
                                    );
                                    let endPage = Math.min(
                                        totalPagesNum,
                                        startPage + maxVisiblePages - 1
                                    );

                                    if (endPage - startPage + 1 < maxVisiblePages) {
                                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                    }

                                    // Always show first page
                                    if (startPage > 1) {
                                        pages.push(
                                            <motion.button
                                                key={1}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePageChange(1)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${currentPageNum === 1
                                                    ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-md shadow-cyan-200"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 border border-gray-200 hover:border-cyan-300"
                                                    }`}
                                            >
                                                1
                                            </motion.button>
                                        );

                                        if (startPage > 2) {
                                            pages.push(
                                                <span key="ellipsis1" className="text-gray-400">
                                                    ...
                                                </span>
                                            );
                                        }
                                    }

                                    // Show pages in range
                                    for (let i = startPage; i <= endPage; i++) {
                                        pages.push(
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePageChange(i)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${currentPageNum === i
                                                    ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-md shadow-cyan-200"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 border border-gray-200 hover:border-cyan-300"
                                                    }`}
                                            >
                                                {i}
                                            </motion.button>
                                        );
                                    }

                                    // Always show last page
                                    if (endPage < totalPagesNum) {
                                        if (endPage < totalPagesNum - 1) {
                                            pages.push(
                                                <span key="ellipsis2" className="text-gray-400">
                                                    ...
                                                </span>
                                            );
                                        }

                                        pages.push(
                                            <motion.button
                                                key={totalPagesNum}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePageChange(totalPagesNum)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${currentPageNum === totalPagesNum
                                                    ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-md shadow-cyan-200"
                                                    : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 border border-gray-200 hover:border-cyan-300"
                                                    }`}
                                            >
                                                {totalPagesNum}
                                            </motion.button>
                                        );
                                    }

                                    return pages;
                                })()}

                                {/* Next Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        const nextPage = Number(currentPage) + 1;
                                        if (nextPage <= totalPages) {
                                            handlePageChange(nextPage);
                                        }
                                    }}
                                    disabled={currentPage >= totalPages}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${currentPage >= totalPages
                                        ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "border-cyan-400/80 bg-transparent text-cyan-600 hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-700"
                                        }`}
                                >
                                    Next
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default AllProjectsPage;
