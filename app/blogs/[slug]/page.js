"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function SingleBlogPage() {
  // Mock blog data - in real app, this would come from props or API
  const blogData = {
    id: 1,
    title: "The Future of Web Development in 2023",
    category: "Technology",
    date: "June 15, 2023",
    readTime: "5 min",
    author: "Arman Ali",
    image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    content: `
      <p>The landscape of web development is evolving at an unprecedented pace. As we move through 2023, several key trends are shaping how we build for the web.</p>
      
      <h2>The Rise of AI-Powered Development</h2>
      <p>Artificial Intelligence is no longer just a buzzword in web development. Tools like GitHub Copilot and ChatGPT are revolutionizing how developers write code, offering intelligent suggestions and automating repetitive tasks.</p>
      
      <p>This doesn't mean developers are being replaced, but rather empowered to focus on more complex problems while AI handles the boilerplate code.</p>
      
      <h2>Serverless Architecture Matures</h2>
      <p>Serverless computing has moved beyond the hype phase and is now a mainstream approach for building scalable applications. The pay-per-use model and automatic scaling make it ideal for projects of all sizes.</p>
      
      <p>With improved cold start times and better debugging tools, serverless is becoming the go-to choice for modern web applications.</p>
      
      <h2>WebAssembly Expands Possibilities</h2>
      <p>WebAssembly (WASM) continues to break down barriers, allowing developers to run high-performance code written in languages like Rust, C++, and Go directly in the browser.</p>
      
      <p>This opens up new possibilities for web-based video editing, 3D modeling, and scientific computing applications that were previously only possible as desktop applications.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting and full of possibilities. By embracing these trends and continuously learning, developers can build faster, more efficient, and more innovative web experiences.</p>
    `
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
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

      <div className="max-w-4xl mx-auto relative ">
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
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
          <motion.div
            variants={fadeUp}
            className="inline-block mb-6"
          >
            <span className="inline-block rounded-md border border-cyan-500 px-4 py-2 text-sm text-cyan-500 font-semibold bg-white/80 backdrop-blur-sm">
              {blogData.category}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
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
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {blogData.author}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>{blogData.date}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md font-medium">
                {blogData.readTime} read
              </span>
            </div>
          </motion.div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl"
        >
          <Image
            src={blogData.image}
            alt={blogData.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
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
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Blog Content */}
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="prose prose-lg max-w-none mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 md:p-12  border border-gray-100"
          >
            {/* Content sections with animations */}
            <motion.div
              variants={fadeUp}
              dangerouslySetInnerHTML={{ __html: blogData.content }}
              className="text-gray-700 leading-relaxed text-lg"
            />
          </motion.div>
        </motion.article>

        {/* Tags */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 mb-12"
        >
          <span className="text-gray-600 font-medium">Tags:</span>
          {["Web Development", "JavaScript", "React", "Next.js", "Technology"].map((tag, index) => (
            <motion.span
              key={tag}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="inline-block rounded-full bg-cyan-100 text-cyan-700 px-4 py-2 text-sm font-medium hover:bg-cyan-200 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Author Bio */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-8  border border-gray-100 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <Image
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt={blogData.author}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                About {blogData.author}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Full-Stack Developer passionate about creating modern web experiences. 
                Loves working with React, Next.js, and cutting-edge technologies. 
                Based in India and constantly exploring new ways to improve user experiences.
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
            <p className="mb-6 opacity-90">Check out more insights and tutorials on web development.</p>
            <Link href="/blogs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold  hover:bg-gray-50 transition-colors duration-200"
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