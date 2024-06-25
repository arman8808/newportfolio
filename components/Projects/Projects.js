import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";
import React from "react";

function Projects() {
  return (
    <section className="project flex items-center justify-center" id="project">
      <div className="project_contianer flex items-start justify-start flex-col ">
        <p>PORTFOLIO</p>
        <h3>Each project is a unique piece of development 🧩</h3>
        <ProjectCard/>
      </div>
    </section>
  );
}

export default Projects;
