import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      className="group flex flex-col cursor-pointer bg-transparent border-none w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Card Container - Fixed dimensions with shadow */}
      <div className="w-full h-[500px] flex flex-col bg-white/5 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Image - Fixed height within card */}
        <div className="relative w-full h-56 overflow-hidden rounded-lg mb-4 flex-shrink-0 shadow-md">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            placeholder="blur"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content - Fixed height remaining space */}
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Meta info */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>June 15, 2023</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>Technology</span>
          </div>

          {/* Title - Fixed height with line clamp - REDUCED MARGIN */}
          <h3 className="text-xl md:text-[1.4rem] font-bold text-gray-600 mb-2 leading-tight line-clamp-2  overflow-hidden">
            {project.title}
          </h3>

          {/* Description - Flexible height with line clamp */}
          <div className="flex-1 min-h-0">
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 h-full overflow-hidden">
              {project.subDesc || "Project description goes here..."}
            </p>
          </div>

          {/* Tech Stack - Fixed height - REMOVED MARGIN BOTTOM */}
          <div className="flex gap-2 flex-wrap mt-2 h-10 overflow-hidden">
            {project.techStack?.slice(0, 4).map((item) => (
              <span 
                key={item}
                className="bg-gray-800/60 text-gray-300 px-2 py-2 flex items-center justify-center rounded-md text-xs shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Read More - Fixed at bottom */}
          {/* <div className="mt-auto pt-2">
            <div className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium group w-fit">
              <span>Read More</span>
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
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div> */}
          
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;