"use client";
import ProjectCard from "@components/Cards/ProjectCard/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Pagination } from "swiper/modules";
import { projectInfo } from "../../components/projectInfo";
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
          {projectInfo?.map((item) => (
            <SwiperSlide key={item?.title}>
              <ProjectCard
                image={item?.image}
                title={item?.title}
                subDesc={item?.subDesc}
                techStack={item?.techStack}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Projects;
