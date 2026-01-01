"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const handleReadMore = () => {
    // Navigate to the specific blog page using the blog id
    router.push(`/blogs/${blog.id}`);
  };
  // Static fallback data
  const staticBlogData = {
    id: 1,
    title: "The Future of Web Development in 2023",
    category: "Technology",
    date: "June 15, 2023",
    readTime: "5 min",
    author: "Arman Ali",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  };

  // Use provided blog data or fallback to static data
  const blogData = blog || staticBlogData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 backdrop-blur-sm h-full flex flex-col"
    >
      {/* Hero-style glow effects */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blue-400/20 blur-2xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-cyan-400/10 to-blue-500/10 flex-shrink-0">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={
              blogData.imageUrl ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt={blogData.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </motion.div>

        {/* Date Badge - Matches hero button style */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 rounded-md bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-cyan-500/30"
        >
          {blogData.date}
        </motion.div>

        {/* Category Tag - Matches hero secondary button */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-4 right-4 rounded-md border border-cyan-500 px-3 py-1 text-xs text-cyan-500 font-semibold bg-white/90 backdrop-blur-sm"
        >
          {blogData.category}
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="p-6 relative z-10 flex flex-col flex-grow">
        {/* Title with hero gradient */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-3 leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent line-clamp-2"
        >
          {blogData.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow"
        >
          Explore the latest trends and technologies that are shaping the future
          of web development this year, from AI-powered tools to serverless
          architectures.
        </motion.p>

        {/* Author and Read Time - Matches hero tech stack style */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5 mr-3">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt={blogData.author || "Author"}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {blogData.author || "Arman Ali"}
            </span>
          </div>
          <div className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md font-medium">
            {blogData.readTime}
          </div>
        </div>

        {/* Read More Button - Matches hero primary button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end mt-4"
        >
          <motion.button
            onClick={handleReadMore}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center rounded-md bg-cyan-500 px-5 py-2 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-colors duration-200 group font-medium"
          >
            Read More
            <motion.svg
              className="w-4 h-4 ml-2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Additional subtle glow effect on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          background: isHovered
            ? "radial-gradient(200px 200px at 50% 50%, rgba(34,211,238,0.08), transparent 60%)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default BlogCard;
