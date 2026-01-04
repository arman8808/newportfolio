"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProjects } from "@app/services/project.queries";
import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";

function Projects() {
  const router = useRouter();
  /* 
     Integrated API: Fetching latest 3 projects 
     (limit: 3, sort: '-createdAt' assumed default or handled by backend) 
  */
  const { data, isLoading, error } = useProjects({ limit: 3 });
  const featuredProjects = data?.data || [];

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.15 * i },
    }),
  };

  if (isLoading) {
    return (
      <section className="project flex items-center justify-center py-20" id="projects">
        <div className="w-full max-w-6xl flex gap-8 flex-col md:flex-row">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-full md:w-1/3 bg-gray-100/50 rounded-2xl h-[400px] animate-pulse border border-gray-100" />
          ))}
        </div>
      </section>
    );
  }

  // Fallback to empty if error or no data (or handle error UI)
  if (error) {
    console.error("Failed to load projects:", error);
    // Optionally render static fallback or error message
  }

  return (
    <section className="project flex items-center justify-center pb-24" id="projects">
      <div className="project_contianer flex items-start justify-start flex-col w-full">
        {/* Header with View All button at top right - EXACTLY YOUR REFERENCE */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-6">
          <div className="flex items-start justify-start gap-2 flex-col">
            <motion.h2
              className="font-semibold text-cyan-400/80 text-3xl md:text-4xl "
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              PORTFOLIO
            </motion.h2>
            <motion.p
              className="w-full max-w-6xl text-gray-600 text-2xl font-[600] mb-8"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Each project is a Unique Piece of Development 🧩
            </motion.p>
          </div>

          <motion.a
            href="/Projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg bg-cyan-500 px-6 py-3 text-white shadow-lg  text-sm font-medium transition-all duration-200 hover:bg-blue-700 hover:bg-cyan-600"
          >
            View All Posts
          </motion.a>
        </div>


        {/* Three cards in a row using flex - EXACTLY YOUR REFERENCE LAYOUT */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {featuredProjects?.map((project, index) => (
            <ProjectCard
              key={project._id || index}
              project={project}
              index={index}
              onClick={() => router.push(`Projects/${project._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
