"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { useBlogs } from "@app/services/blog.queries";
import Link from "next/link";

function BlogSection() {
  // Fetch blogs from API - only first 3 for the homepage
  const { data: blogsResponse, isLoading, error } = useBlogs({
    page: 1,
    limit: 3,
  });

  const blogData = blogsResponse?.data || [];

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.15 * i },
    }),
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

  // Loading state - Same skeleton as BlogPage
  if (isLoading) {
    return (
      <section
        className="w-full flex flex-col items-center justify-center gap-8 py-12 px-4 bg-white"
        id="blogs"
      >
        <div className="w-full max-w-6xl">
          {/* Header Skeleton */}
          <div className="w-full flex items-center justify-between mb-6">
            <div className="h-10 bg-gray-100 rounded-full w-48 animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-lg w-32 animate-pulse"></div>
          </div>

          {/* Subtitle Skeleton */}
          <div className="h-6 bg-gray-100 rounded w-3/4 max-w-2xl mb-8 animate-pulse"></div>

          {/* Grid Skeleton - Same as BlogPage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
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
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        className="w-full flex flex-col items-center justify-center gap-8 py-12 px-4 bg-white"
        id="blogs"
      >
        <div className="w-full max-w-6xl text-center">
          <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Error Loading Blogs</h2>
          <p className="text-gray-500">Failed to load blogs. Please try again later.</p>
        </div>
      </section>
    );
  }

  // If no blogs found
  if (blogData.length === 0) {
    return null; // Or you can return a message like "No blogs yet"
  }

  return (
    <section
      className="w-full flex flex-col items-center justify-center gap-8 py-12 px-4 bg-white"
      id="blogs"
    >
      <div className="w-full max-w-6xl flex items-center justify-between">
        <motion.h2
          className="font-semibold text-cyan-400/80  text-3xl md:text-4xl "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Latest Articles
        </motion.h2>
        <Link href="/blogs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-cyan-500 px-6 py-3 text-white shadow-lg  text-sm font-medium transition-all duration-200 hover:bg-blue-700 hover:bg-cyan-600"
          >
            View All Posts
          </motion.button>
        </Link>
      </div>

      <motion.p
        className="w-full max-w-6xl text-gray-600 text-lg"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Discover insights, tutorials, and stories from web development,
        mobile applications, backend systems, and modern software engineering
      </motion.p>

      {/* Desktop Grid Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              initial="hidden"
              animate="visible"
              custom={index + 2}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <BlogCard blog={formattedBlog} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default BlogSection;