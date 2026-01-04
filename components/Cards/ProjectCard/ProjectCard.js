import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative w-full max-w-sm mx-auto md:mx-0 cursor-pointer"
      onClick={onClick}
    >
      {/* 1. Gradient Border Glow (Hidden by default, reveals on hover) */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur-md" />

      {/* Main Card Content */}
      <div className="relative h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-[0.99] border border-gray-100/50">

        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={project.imageUrl || project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ objectFit: "cover" }}
          />

          {/* 2. Interactive Overlay with Button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-md text-gray-900 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl hover:bg-cyan-50">
              <span>View Project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-600"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 relative">

          {/* Meta header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase bg-cyan-50/80 px-3 py-1 rounded-full border border-cyan-100">
              {project.category || "Development"}
            </span>
            <div className="flex gap-1.5 align-middle">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mt-1"></span>
              <span className="text-xs text-gray-400 font-medium">Active</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
            {project.subDesc || "Explore this innovative project designed to solve real-world problems with cutting-edge technology."}
          </p>

          {/* 3. Glass Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100/80">
            {project.techStack?.slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-xs font-semibold text-gray-600 bg-gray-50/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-gray-200/60 hover:border-cyan-200 hover:bg-cyan-50/50 transition-colors"
              >
                {item}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;