"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const BlogCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100/30 dark:border-cyan-800/30"
    >
      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-cyan-500/20 blur-xl"></div>
      
      {/* Image Container with Overlay Effect */}
      <div className="relative h-60 w-full overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="Blog cover image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl"
          />
          {/* Gradient Overlay matching your theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 via-cyan-700/40 to-transparent opacity-80"></div>
        </motion.div>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md shadow-cyan-500/30"
        >
          June 15, 2023
        </motion.div>

        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-cyan-700 dark:text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border border-cyan-200/50 dark:border-cyan-700/30"
        >
          Technology
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 dark:text-white mb-3 leading-tight bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
        >
          The Future of Web Development in 2023
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3"
        >
          Explore the latest trends and technologies that are shaping the future
          of web development this year, from AI-powered tools to serverless
          architectures.
        </motion.p>

        {/* Author and Read Time */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-0.5 mr-3">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt="Author"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
              Arman Ali
            </span>
          </div>
          <div className="text-sm text-cyan-500 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/40 px-2 py-1 rounded-md">
            5 min read
          </div>
        </div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium px-4 py-2 rounded-md shadow-lg shadow-cyan-500/30 group"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogCard;