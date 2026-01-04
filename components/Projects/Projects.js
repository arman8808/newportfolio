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
    <section className="w-full flex flex-col items-center justify-center gap-8 py-12 px-4" id="projects">
      {/* Header with View All button at top right */}
      <div className="w-full max-w-6xl flex items-center justify-between">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 text-3xl md:text-4xl mb-2 inline-block">
            PORTFOLIO
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
        </motion.div>

        <motion.a
          href="/Projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-cyan-500 px-6 py-3 text-white shadow-lg text-sm font-medium transition-all duration-200 hover:bg-blue-700 hover:bg-cyan-600"
        >
          View All Posts
        </motion.a>
      </div>

      <motion.p
        className="w-full max-w-6xl text-gray-600 text-lg"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        Each project is a Unique Piece of Development 🧩
      </motion.p>


      {/* Three cards in a row using flex - EXACTLY YOUR REFERENCE LAYOUT */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {featuredProjects?.map((project, index) => (
          <ProjectCard
            key={project._id || index}
            project={project}
            index={index}
            onClick={() => router.push(`Projects/${project._id}`)}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
