"use client";
import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination } from "swiper/modules";

function Projects() {
  return (
    <section className="project flex items-center justify-center" id="project">
      <div className="project_contianer flex items-start justify-start flex-col ">
        <p>PORTFOLIO</p>
        <h3>Each project is a unique piece of development 🧩</h3>
        {/* <div style={{ overflow: "hidden", display: "flex" }}>
          {Array(1)
            .fill()
            .map((_, index) => (
              <div key={index}>
                <ProjectCard />
              </div>
            ))}
        </div> */}
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <ProjectCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProjectCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Projects;
