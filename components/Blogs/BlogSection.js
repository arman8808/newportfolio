"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

function BlogSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.15 * i },
    }),
  };

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
  ];

  return (
    <section
      className="w-full flex flex-col items-center justify-center gap-8 py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50"
      id="blogs"
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6">
        <motion.h2
          className="font-semibold text-[#555] text-3xl md:text-4xl "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Latest Blogs
        </motion.h2>
        <motion.a
          href="/blogs"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-cyan-500 px-6 py-3 text-white shadow-lg  text-sm font-medium transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-500/40"
        >
          View All Posts
        </motion.a>
      </div>

      <motion.p
        className="w-full max-w-6xl text-gray-600 text-lg mb-8"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Discover insights, tutorials, and stories from our team
      </motion.p>

      {/* Desktop Grid Layout */}
      <div className="w-full max-w-6xl  grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-2 gap-8">
        {blogData.map((blog, index) => (
          <motion.div
            key={blog.id}
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
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
