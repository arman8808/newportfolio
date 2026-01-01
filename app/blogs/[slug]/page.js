"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBlog } from "@app/services/blog.queries";

function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blogId, setBlogId] = useState(null);

  // Extract blogId from params after component mounts
  useEffect(() => {
    if (params?.slug) {
      setBlogId(params.slug);
    }
  }, [params]);

  // Fetch single blog from API only when blogId is available
  const { data: blogData, isLoading, error } = useBlog(blogId);

  // Handle initial state when blogId is not yet available
  if (!blogId) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center py-20">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </section>
    );
  }

  // Loading state with skeleton loader
  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 relative overflow-hidden">
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

        <div className="max-w-4xl mx-auto relative">
          {/* Back Button Skeleton */}
          <motion.div className="mb-8">
            <div className="flex items-center text-gray-400 animate-pulse">
              <div className="w-5 h-5 mr-2 bg-gray-200 rounded"></div>
              <div className="w-24 h-5 bg-gray-200 rounded"></div>
            </div>
          </motion.div>

          {/* Blog Header Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 animate-pulse">
              <div className="w-32 h-10 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-lg mb-6 max-w-2xl mx-auto animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded-lg mb-6 max-w-3xl mx-auto animate-pulse"></div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-pulse">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Featured Image Skeleton */}
          <div className="h-80 md:h-96 lg:h-[500px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl mb-12 animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-gradient-x rounded-2xl"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4 mb-16 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mt-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-3 mb-12 animate-pulse">
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-20 h-8 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Author Bio Skeleton */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12 animate-pulse">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="w-40 h-6 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Error Loading Blog
            </h2>
            <p className="text-gray-600 mb-6">
              Failed to load blog post. Please try again later.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.refresh()}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200"
              >
                Try Again
              </button>
              <Link href="/blogs">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
                  Back to Blogs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle 404 - blog not found
  if (!blogData || !blogData._id) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Blog Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors duration-200"
            >
              Back to Blogs
            </motion.button>
          </Link>
        </div>
      </section>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Format date from API response
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format read time
  const formatReadTime = (minutes) => {
    return `${minutes} min`;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 relative overflow-hidden">
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

      <div className="max-w-5xl mx-auto relative ">
        {/* Back Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <Link href="/blogs">
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
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
              Back to Blogs
            </motion.button>
          </Link>
        </motion.div>

        {/* Blog Header */}
        <motion.header
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-block mb-6">
            <span className="inline-block rounded-md border border-cyan-500 px-4 py-2 text-sm text-cyan-500 font-semibold bg-white/80 backdrop-blur-sm">
              {blogData.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {blogData.title}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5 mr-3">
                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  <Image
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    alt={blogData.author}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {blogData.author}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>{formatDate(blogData.createdAt)}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md font-medium">
                {formatReadTime(blogData.readTime)} read
              </span>
            </div>
          </motion.div>
        </motion.header>

        {/* Featured Image */}
        {blogData.imageUrl && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <Image
              src={blogData.imageUrl}
              alt={blogData.title}
              fill
              style={{ objectFit: "fill" }}
              className="rounded-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Subtle glow effect */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  "radial-gradient(300px 300px at 30% 20%, rgba(34,211,238,0.15), transparent 60%)",
                  "radial-gradient(300px 300px at 70% 80%, rgba(59,130,246,0.15), transparent 60%)",
                  "radial-gradient(300px 300px at 30% 20%, rgba(34,211,238,0.15), transparent 60%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* Blog Content */}
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="prose prose-lg max-w-none mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100"
          >
            {/* Render the description */}
            {blogData.description && (
              <motion.div
                variants={fadeUp}
                className="text-gray-700 leading-relaxed text-lg mb-8 p-4  rounded-lg italic whitespace-pre-line"
              >
                {blogData.description}
              </motion.div>
            )}

            {/* Render the HTML content */}
            {blogData.content && (
              <motion.div
                variants={fadeUp}
                dangerouslySetInnerHTML={{ __html: blogData.content }}
                className="text-gray-700 leading-relaxed text-lg blog-content"
              />
            )}
          </motion.div>
        </motion.article>

        {/* Tags */}
        {blogData.hashtags && blogData.hashtags.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mb-12"
          >
            <span className="text-gray-600 font-medium">Tags:</span>
            {blogData.hashtags.map((hashtagString, stringIndex) => {
              // Split the string into individual hashtags
              const hashtags = hashtagString
                .split(/\s+/)
                .filter((tag) => tag.trim() !== "");

              return (
                <React.Fragment key={stringIndex}>
                  {hashtags.map((tag, index) => {
                    // Extract hashtag text (remove # if it's the first character)
                    const tagText = tag.startsWith("#")
                      ? tag.substring(1)
                      : tag;

                    return (
                      <motion.span
                        key={`${stringIndex}-${index}`}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: (stringIndex + index) * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block rounded-full bg-cyan-100 text-cyan-700 px-4 py-2 text-sm font-medium hover:bg-cyan-200 transition-colors duration-200 cursor-pointer"
                      >
                        #{tagText}
                      </motion.span>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}
        {/* Author Bio */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-8 border border-gray-100 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt={blogData.author}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                About {blogData.author}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {blogData.author} is a passionate developer and writer in the
                field of {blogData.category}. With expertise in modern web
                technologies, they share insights and experiences to help other
                developers grow and succeed in their careers.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white shadow-2xl shadow-cyan-500/25">
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="mb-6 opacity-90">
              Check out more insights and tutorials on web development.
            </p>
            <Link href="/blogs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                Explore More Blogs
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SingleBlogPage;
