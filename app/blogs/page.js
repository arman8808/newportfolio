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
      <section className="min-h-screen bg-white py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto relative">
          {/* Page Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-100 rounded-full w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-100 rounded w-3/4 max-w-2xl mx-auto mb-2"></div>
            <div className="h-6 bg-gray-100 rounded w-1/2 max-w-2xl mx-auto"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                {/* Image Skeleton */}
                <div className="h-48 md:h-56 bg-gray-100 rounded-xl mb-4"></div>

                {/* Category Skeleton */}
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>

                {/* Title Skeleton */}
                <div className="h-6 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>

                {/* Description Skeleton */}
                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-4"></div>

                {/* Meta Info Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-100 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center space-x-2 animate-pulse">
            <div className="w-24 h-10 bg-gray-100 rounded"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-gray-100 rounded"></div>
            ))}
            <div className="w-20 h-10 bg-gray-100 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white py-12 px-4 md:px-6">
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
              Error Loading Blogs
            </h2>
            <p className="text-gray-500 mb-6">
              Failed to load blogs. Please try again later.
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
    <section className="min-h-screen bg-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto relative">
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
            Latest Articles
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Discover insights, tutorials, and stories from web development,
            mobile applications, backend systems, and modern software
            engineering
          </motion.p>
        </motion.div>

        {blogData.length === 0 ? (
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
              No articles yet
            </h3>
            <p className="text-gray-500">Check back soon for new content.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
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
                  description: blog.description,
                  imageUrl: blog.imageUrl,
                  author: blog.author,
                  hashtags: blog.hashtags,
                };

                return (
                  <motion.div
                    key={blog._id || blog.id}
                    variants={fadeUp}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-black"
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(index + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      currentPage === index + 1
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-black"
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
