"use client";
import Image from "next/image";
import Link from "next/link";
import { GitHub, LinkedIn, Instagram, Facebook } from "@mui/icons-material";
import HeroImage from "./HeroImage";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getHeroData } from "@app/services/hero.service";
import { useQuery } from "@tanstack/react-query";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const imageVariant = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 1, type: "spring", bounce: 0.4 },
  },
};

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Mouse movement for Spotlight & Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement for tilt effect
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  // Fetch Hero Data
  const { data: heroData } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      try {
        const res = await getHeroData();
        return res.data;
      } catch (error) {
        return null;
      }
    },
  });

  const titles = heroData?.titles?.length > 0 ? heroData.titles : [
    "AI-First Full-Stack Developer",
    "Full-Stack Developer",
    "Backend & ML Engineer",
    "Conversational AI Engineer",
  ];

  const resumeUrl = heroData?.resumeUrl || "/Asset/ArmanAliResume.pdf";
  const socialLinks = heroData?.socialLinks || {};

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 3000);
    return () => clearInterval(id);
  }, [titles]);

  const techStack = [
    { src: "/Asset/images/icons8-html-logo-480.png", name: "HTML", url: "https://developer.mozilla.org/docs/Web/HTML" },
    { src: "/Asset/images/icons8-css-logo-400.png", name: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS" },
    { src: "/Asset/images/icons8-javascript-480.png", name: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { src: "/Asset/images/icons8-typescript-480.png", name: "TypeScript", url: "https://www.typescriptlang.org/" },
    { src: "/Asset/images/icons8-node-js-240.png", name: "Node.js", url: "https://nodejs.org/" },
    { src: "/Asset/images/icons8-tailwind-css-400.png", name: "TailwindCSS", url: "https://tailwindcss.com/" },
    { src: "/Asset/images/icons8-react-400.png", name: "React", url: "https://react.dev/" },
    { src: "/Asset/images/next-js.svg", name: "Next.js", url: "https://nextjs.org/" },
    { src: "/Asset/images/docker-svgrepo-com.svg", name: "Docker", url: "https://www.docker.com/" },
    { src: "/Asset/images/nestjs.png", name: "NestJS", url: "https://nestjs.com/" },
    { src: "/Asset/images/react-native.png", name: "React Native", url: "https://reactnative.dev/" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-12 gap-16"
      id="home"
      onMouseMove={handleMouseMove}
    >
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-Right Cyan Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        {/* Bottom-Left Blue Glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slower" />

        {/* Dynamic Spotlight following mouse */}
        <motion.div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(0,0,0,0) 70%)",
            x: useTransform(
              mouseX,
              [-0.5, 0.5],
              [-200, typeof window !== "undefined" ? window.innerWidth : 1000]
            ),
            y: useTransform(
              mouseY,
              [-0.5, 0.5],
              [-200, typeof window !== "undefined" ? window.innerHeight : 800]
            ),
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* --- Left Column: Text --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Badge */}
            <motion.div
              variants={textVariant}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-500 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Available for Work
            </motion.div>

            {/* Animated Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              <span className="block text-gray-800">Hi, I'm</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 animate-gradient-x py-2">
                Arman Ali
              </span>
            </h1>

            {/* Role Switcher */}
            <div className="h-8 md:h-10 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl md:text-2xl font-semibold text-gray-600"
                >
                  {titles[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              variants={textVariant}
              className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Turning complex problems into elegant, scalable solutions.
              Specialized in <span className="text-cyan-600 font-semibold">Full-Stack Development</span> and <span className="text-blue-600 font-semibold">AI Integration</span>.
            </motion.p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <ShineButton href="#projects" primary >
              View Projects
            </ShineButton>
            <ShineButton href="#contact">
              Contact Me
            </ShineButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className="flex gap-6 pt-4"
          >
            {socialLinks.linkedin && <SocialLink href={socialLinks.linkedin} icon={<LinkedIn className="text-3xl" />} />}
            {socialLinks.github && <SocialLink href={socialLinks.github} icon={<GitHub className="text-3xl" />} />}
            {socialLinks.instagram && <SocialLink href={socialLinks.instagram} icon={<Instagram className="text-3xl" />} />}
            {socialLinks.facebook && <SocialLink href={socialLinks.facebook} icon={<Facebook className="text-3xl" />} />}
          </motion.div>
        </div>

        {/* --- Right Column: 3D Image --- */}
        <div className="hidden lg:flex items-center justify-center perspective-[1000px]">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            initial="hidden"
            animate="visible"
            variants={imageVariant}
            className="relative w-[600px] h-[500px]"
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>

      {/* --- Bottom: Tech Stack Marquee --- */}
      <div className="w-full mt-auto mb-8">
        <div className="text-center mb-6">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-500">Powering Next-Gen Apps With</p>
        </div>

        <div className="relative w-full overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/10 py-10">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

          <Marquee gradient={false} speed={40} pauseOnHover autoFill>
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center justify-center gap-2 mx-8 group cursor-default py-4"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-3 transition-all group-hover:border-cyan-300 group-hover:shadow-cyan-100/50">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-400 group-hover:text-cyan-600 transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default Hero;

// --- Helper Components ---

function ShineButton({ children, href, primary, download, isExternal }) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      download={download}
      className={`group relative px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg overflow-hidden ${primary
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-200"
        : "bg-white text-gray-700 border border-gray-200 hover:border-cyan-300 hover:text-cyan-600"
        }`}
    >
      <span className="relative z-10">{children}</span>
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
    </Link>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-cyan-50 hover:text-cyan-600 hover:scale-110 transition-all duration-300 border border-gray-200 hover:border-cyan-200 shadow-sm"
    >
      {icon}
    </a>
  );
}
