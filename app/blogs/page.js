"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@components/Blogs/BlogCard";
import { useBlogs } from "@app/services/blog.queries";


function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogsResponse,
    isLoading,
    error,
  } = useBlogs({
    page: currentPage,
    limit: 10,
  });

  const blogData = blogsResponse?.data || [];
  const totalPages = blogsResponse?.meta?.totalPages || 1;
  const totalBlogs = blogsResponse?.meta?.total || 0;

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

  // Format date from API response
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format read time from minutes to "X min" format
  const formatReadTime = (minutes) => {
    return `${minutes} min`;
  };

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Latest Blogs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading blogs...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Latest Blogs
            </h1>
            <p className="text-lg text-red-600 max-w-2xl mx-auto">
              Error loading blogs. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          <motion.p className="text-sm text-gray-500 mt-2" variants={fadeUp}>
            Showing {blogData.length} of {totalBlogs} total blogs
          </motion.p>
        </motion.div>

        {blogData.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="text-lg text-gray-600">No blogs found.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="
                grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {blogData.map((blog, index) => {
                // Format the blog data for the BlogCard component
                const formattedBlog = {
                  id: blog._id || blog.id,
                  title: blog.title,
                  category: blog.category,
                  date: formatDate(blog.createdAt),
                  readTime: formatReadTime(blog.readTime),
                  // You can add additional fields if your BlogCard needs them
                  description: blog.description,
                  imageUrl: blog.imageUrl,
                  author: blog.author,
                  hashtags: blog.hashtags,
                };

                return (
                  <motion.div
                    key={blog._id || blog.id}
                    variants={fadeUp}
                    whileHover={{
                      y: -4,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="w-full"
                  >
                    <BlogCard blog={formattedBlog} />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination - Only show if there are multiple pages */}
            {totalPages > 1 && (
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
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
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
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
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
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default BlogPage;
