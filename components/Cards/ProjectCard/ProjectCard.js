import Image from "next/image";
import React from "react";
import projectImage from "../../../public/Asset/images/car-rental-full.c58b37da333d73238fdd.webp";
import Link from "next/link";

function ProjectCard({ image, title, subDesc, techStack }) {
  return (
    <div className="project_card flex items-center justify-between gap-3 min-w-[100%] cursor-pointer">
      <div className="project_card_img">
        <Image
          src={image ? image : projectImage}
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          alt={image ? image : projectImage}
          placeholder="blur"
          layout="responsive"
        />
      </div>
      <div className="project_card_text flex items-center justify-center flex-col gap-3">
        <h3>{title ? title : "New Project"}</h3>
        <p>
          {subDesc
            ? subDesc
            : " A car rental website is an online platform that allows users to rent cars for personal or business use. The website provides an interface for searching, comparing, and reserving cars."}
        </p>
        <div className="project_card_text_tech flex gap-3 flex-wrap">
          {techStack?.map((item) => (
            <p className="min-w-fit">{item}</p>
          ))}
        </div>
        {/* <div className="project_card_text_share flex gap-3">
          <Link href="#" className="flex items-center justify-center">
            Vist
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="tabler-icon tabler-icon-brand-github"
            >
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </Link> 
          <Link href="#" className="flex items-center justify-center">
            Git
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="tabler-icon tabler-icon-brand-github"
            >
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default ProjectCard;
