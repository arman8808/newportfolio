"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@components/Blogs/BlogCard";

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;
  const totalPages = 3;

  const blogData = [
    {
      id: 1,
      title: "The Future of Web Development",
      category: "Technology",
      date: "June 15, 2023",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Mastering Next.js 14",
      category: "Development",
      date: "June 12, 2023",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      category: "Design",
      date: "June 10, 2023",
      readTime: "4 min",
    },
    {
      id: 4,
      title: "TypeScript Best Practices",
      category: "Development",
      date: "June 8, 2023",
      readTime: "6 min",
    },
    {
      id: 5,
      title: "React Performance Tips",
      category: "Development",
      date: "June 5, 2023",
      readTime: "8 min",
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      category: "Design",
      date: "June 3, 2023",
      readTime: "5 min",
    },
    {
      id: 7,
      title: "Database Optimization",
      category: "Backend",
      date: "June 1, 2023",
      readTime: "6 min",
    },
    {
      id: 8,
      title: "Mobile First Approach",
      category: "Design",
      date: "May 28, 2023",
      readTime: "4 min",
    },
    {
      id: 9,
      title: "API Security Best Practices",
      category: "Security",
      date: "May 25, 2023",
      readTime: "7 min",
    },
    {
      id: 10,
      title: "Cloud Deployment Strategies",
      category: "DevOps",
      date: "May 22, 2023",
      readTime: "5 min",
    },
    {
      id: 11,
      title: "State Management in React",
      category: "Development",
      date: "May 20, 2023",
      readTime: "6 min",
    },
    {
      id: 12,
      title: "Web Accessibility Guide",
      category: "Design",
      date: "May 18, 2023",
      readTime: "8 min",
    },
  ];

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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
      {/* Hero-style glow effects */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-36 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative ">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            variants={fadeUp}
          >
            Latest Blogs
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Discover insights, tutorials, and stories from the world of web
            development and design
          </motion.p>
        </motion.div>

        <motion.div
          className="
            grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {blogData.map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="w-full"
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          className="flex justify-center items-center space-x-2"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-600"
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
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(index + 1)}
              className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-gray-600 hover:bg-cyan-100 hover:text-cyan-600"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-600"
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
      </div>
    </section>
  );
}

export default BlogPage;
