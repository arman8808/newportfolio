"use client";
import Image from "next/image";
import Link from "next/link";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
const heroVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delayChildren: 0.2,
      staggerChildren: 0.3,
    },
  },
};
const textRevealVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.5 },
  },
};
const headingTextRevealVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, delay: 0.7 },
  },
};
const iconVariant = {
  hover: {
    scale: 1.2,
    transition: { duration: 0.3 },
  },
};
const imageVariant = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
};
function Hero() {
  const techStack = [
    "/Asset/images/icons8-html-logo-480.png",
    "/Asset/images/icons8-css-logo-400.png",
    "/Asset/images/icons8-javascript-480.png",
    "/Asset/images/icons8-typescript-480.png",
    "/Asset/images/icons8-node-js-240.png",
    "/Asset/images/icons8-tailwind-css-400.png",
    "/Asset/images/icons8-react-400.png",
    "/Asset/images/next-js.svg",
    "/Asset/images/docker-svgrepo-com.svg",
  ];
  return (
    <section
      className="hero w-full flex items-center flex-col justify-center gap-20 py-4 h-screen bg mobile:h-[70vh]"
      id="home"
    >
      <div className="hero_div flex flex-col">
        <div className="hero_top ">
          <div className="hero_top_text">
            <motion.h1
              variants={textVariant}
              initial="hidden"
              animate="visible"
            >
              Full-Stack Mern Developer
            </motion.h1>

            <motion.p variants={textVariant} initial="hidden" animate="visible">
              Hi, I'm Arman Ali. A passionate Full-Stack Mern Developer based in
              Lucknow, India. 📍
            </motion.p>

            <span className="flex gap-2">
              <Link
                href="https://www.linkedin.com/in/arman-ali-0b7480147/"
                target="_blank"
              >
                <LinkedIn style={{ fontSize: "2.5rem" }} />
              </Link>
              <Link href="https://github.com/arman8808" target="_blank">
                <GitHub style={{ fontSize: "2.5rem" }} />
              </Link>
            </span>
          </div>
          <div className="hero_top_image mobile:hidden">
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
            >
              <Image
                src="/Asset/images/Frame.png"
                alt="Arman Ali - Full Stack Developer"
                width={500}
                height={400}
              />
            </motion.div>
          </div>
        </div>
        <div className="hero_bottom flex items-center">
          <p className="pr-6 mr-3 ">Tech Stack</p>
          <span>
            <ul className="flex items-center gap-2">
              {techStack?.map((img, index) => (
                <li key={index}>
                  <motion.div
                    whileHover="hover"
                    variants={iconVariant}
                    className="rounded-sm"
                  >
                    <Image
                      src={img}
                      alt={`Tech stack icon ${index + 1}`}
                      width={70}
                      height={50}
                    />
                  </motion.div>
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
