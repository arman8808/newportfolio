"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { projectInfo } from "../../components/projectInfo";
import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";

function Projects() {
  const router = useRouter();
  const featuredProjects = projectInfo.slice(0, 3);
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.15 * i },
    }),
  };
  return (
    <section className="project flex items-center justify-center" id="projects">
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
            href="/projects"
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
              key={project.title}
              project={project}
              index={index}
              onClick={() => router.push("Projects/SingleProjectPage")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
