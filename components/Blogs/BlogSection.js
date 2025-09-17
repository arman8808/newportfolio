"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

function BlogSection() {
    const fadeUp = {
        hidden: { opacity: 0, y: 12 },
        visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 * i } })
      };
    
  return (
    <section
      className=" w-full flex items-center flex-col justify-center gap-4 about section "
      id="blogs"
    >
      <motion.h2
        className="font-semibold text-[#555]"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        Blogs
      </motion.h2>
      <BlogCard />
    </section>
  );
}

export default BlogSection;
