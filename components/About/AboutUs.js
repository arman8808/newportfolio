import { OpenInNew } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import AboutImg from "../../public/Asset/images/pikaso_enhance__custom_2K_Portrait_r100_c15_-_1_.webp";
import Image from "next/image";
function AboutUs() {
  return (
    <section
      className=" w-full flex items-center flex-col justify-center gap-4 about section "
      id="aboutus"
    >
      <h2 className="font-semibold text-[#555]">About me</h2>

      <div className="grid grid-cols-2 gap-4 w-9/12 mobile:flex mobile:flex-col-reverse mobile:w-11/12">
        <div className="about__data bd-grid mobile:text-start">
          <div className="flex items-start justify-start flex-col gap-1">
            <span className="text-[1.6rem] font-semibold text-[#147efb]">
              Hello, I am <br />
            </span>
            <p className="about__description text-[#555] text-[1.1rem] font-medium">
              Arman Ali, a passionate and dedicated MERN stack developer with
              1.5 years of hands-on experience in building dynamic and
              responsive web applications. My journey in web development began
              with a fascination for creating user-friendly interfaces and
              scalable backend systems. Over time, I've honed my skills in
              MongoDB, Express.js, React.js, and Node.js, allowing me to develop
              full-stack applications that are both efficient and innovative.
            </p>
            <p className="about__description text-[#555] text-[1.1rem] font-medium">
              Throughout my career, I've had the opportunity to work on various
              projects that have challenged me to think creatively and push the
              boundaries of what's possible with web technology. My commitment
              to continuous learning and staying updated with the latest
              industry trends ensures that I am always at the forefront of
              modern web development practices.
            </p>
            <div className="flex gap-4 pt-3 w-full items-center">
              <div className="flex flex-col items-center justify-center  w-[50%]">
                <strong className=" text text-[2.2rem] text-[#147efb] font-semibold">
                  1.5+
                </strong>
                <span className="about__achievement text-[#555]">
                  Years of Experience
                </span>
              </div>
              <div className="flex flex-col items-center justify-center  w-[50%]">
                <strong className=" text text-[2.2rem] text-[#147efb] font-semibold">
                  10+
                </strong>
                <span className="about__achievement text-[#555]">
                  Projects Completed
                </span>
              </div>
              <div className="flex flex-col items-center justify-center  w-[50%]">
                <strong
                  className=" text text-[2.2rem] text-[#147efb] font-semibold"
                  style={{ visibility: "hidden" }}
                >
                  1.5+
                </strong>
                <Link
                  href="/Asset/ArmanAliResmue.pdf"
                  target="_blank"
                  passHref
                  className="about__achievement text-[#555] download_button"
                >
                  Resume
                  <OpenInNew className="redirect_icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <Image
            src={AboutImg}
            className="rounded-2xl w-[90%] h-[85%] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
