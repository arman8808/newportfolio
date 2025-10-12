"use client";
import Image from "next/image";
import Link from "next/link";
import { GitHub, LinkedIn } from "@mui/icons-material";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";

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
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useTransform(mouseX, [-50, 0, 50], [-6, 0, 6]);
  const translateX = useTransform(mouseX, [-50, 0, 50], [-12, 0, 12]);
  const translateY = useTransform(mouseY, [-50, 0, 50], [-8, 0, 8]);

  const titles = [
    "AI-First Full-Stack Developer",
    "Full-Stack Developer",
    "Backend & ML Engineer",
    "Conversational AI Engineer",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseX.set(Math.max(-50, Math.min(50, x / 5)));
      mouseY.set(Math.max(-50, Math.min(50, y / 5)));
    },
    [mouseX, mouseY]
  );

  const techStack = [
    {
      src: "/Asset/images/icons8-html-logo-480.png",
      name: "HTML",
      url: "https://developer.mozilla.org/docs/Web/HTML",
    },
    {
      src: "/Asset/images/icons8-css-logo-400.png",
      name: "CSS",
      url: "https://developer.mozilla.org/docs/Web/CSS",
    },
    {
      src: "/Asset/images/icons8-javascript-480.png",
      name: "JavaScript",
      url: "https://developer.mozilla.org/docs/Web/JavaScript",
    },
    {
      src: "/Asset/images/icons8-typescript-480.png",
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
    },
    {
      src: "/Asset/images/icons8-node-js-240.png",
      name: "Node.js",
      url: "https://nodejs.org/",
    },
    {
      src: "/Asset/images/icons8-tailwind-css-400.png",
      name: "TailwindCSS",
      url: "https://tailwindcss.com/",
    },
    {
      src: "/Asset/images/icons8-react-400.png",
      name: "React",
      url: "https://react.dev/",
    },
    {
      src: "/Asset/images/next-js.svg",
      name: "Next.js",
      url: "https://nextjs.org/",
    },
    {
      src: "/Asset/images/docker-svgrepo-com.svg",
      name: "Docker",
      url: "https://www.docker.com/",
    },
    {
      src: "/Asset/images/nestjs.png",
      name: "NestJS",
      url: "https://nestjs.com/",
    },
  ];

  return (
    <section
      className="overflow- hero relative w-full flex items-center flex-col justify-start pt-20 pb-12 gap-12 min-h-[90vh] bg mobile:min-h-[85vh] mobile:pt-16 mobile:pb-8 mobile:gap-8"
      id="home"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl mobile:-top-20 mobile:-right-20 mobile:h-40 mobile:w-40"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-36 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl mobile:-bottom-24 mobile:-left-18 mobile:h-48 mobile:w-48"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="hero_div flex flex-col w-full max-w-6xl px-4 mobile:px-6">
        <div className="hero_top flex flex-col lg:flex-row items-center justify-between gap-12 mobile:gap-8">
          <div className="hero_top_text flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
            <motion.h1
              variants={textVariant}
              initial="hidden"
              animate="visible"
              className="text-4xl lg:text-5xl font-bold mb-4 mobile:text-3xl mobile:mb-3"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p 
              variants={textVariant} 
              initial="hidden" 
              animate="visible"
              className="text-lg lg:text-xl text-gray-300 mb-6 mobile:text-base mobile:mb-4"
            >
              Hi, I'm Arman Ali. A passionate Full-Stack Developer based in India. 📍
            </motion.p>

            <div className="mt-4 flex items-center gap-3 flex-wrap justify-center mobile:mt-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md bg-cyan-500 px-5 py-2 text-white shadow-lg shadow-cyan-500/30 mobile:px-4 mobile:py-2 mobile:text-sm"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md border border-cyan-500 px-5 py-2 text-cyan-400 hover:bg-cyan-500/10 mobile:px-4 mobile:py-2 mobile:text-sm"
              >
                Contact Me
              </motion.a>
            </div>

            <span className="mt-6 flex gap-4 mobile:mt-4 mobile:gap-3">
              <Link
                href="https://www.linkedin.com/in/arman-ali-0b7480147/"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <LinkedIn style={{ fontSize: "2.5rem" }} className="mobile:!text-3xl" />
              </Link>
              <Link 
                href="https://github.com/arman8808" 
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <GitHub style={{ fontSize: "2.5rem" }} className="mobile:!text-3xl" />
              </Link>
            </span>
          </div>
          
          <div
            className="hero_top_image lg:block hidden"
            onMouseMove={handleMouseMove}
          >
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              style={{ x: translateX, y: translateY, rotateZ: rotate }}
              className="relative"
            >
              <Image
                src="/Asset/images/Frame.png"
                alt="Arman Ali - Full Stack Developer"
                width={500}
                height={400}
                priority
                className="w-full max-w-[400px] lg:max-w-[500px]"
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(120px 120px at calc(50% + " +
                    mouseX.get() +
                    "px) calc(50% + " +
                    mouseY.get() +
                    "px), rgba(34,211,238,0.25), transparent 60%)",
                }}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="hero_bottom mt-8 flex w-full flex-col gap-3 mobile:mt-6">
          <p className="pl-1 text-sm uppercase tracking-widest text-cyan-400/80 mobile:text-xs">
            Tech Stack
          </p>
          <TechMarquee tech={techStack} reduce={shouldReduceMotion} />
        </div>
      </div>
      
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-400/70 mobile:bottom-4"
        animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.div>
    </section>
  );
}

export default Hero;

function TechMarquee({ tech, reduce }) {
  const row1 = [...tech, ...tech];
  const row2 = [...tech, ...tech];
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);

  const pause = () => {
    controls1.stop();
    controls2.stop();
  };
  const play = () => {
    if (reduce || isMobile) return;
    controls1.start({
      x: ["0%", "-100%"],
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
    });
    controls2.start({
      x: ["-100%", "0%"],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    });
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    play();
  }, [reduce, isMobile]);

  if (isMobile) {
    return (
      <div className="relative w-full min-h-[100px] mobile:min-h-[80px]">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {tech.map((t, index) => (
            <a
              key={`tms-${index}`}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center justify-center cursor-pointer p-1 rounded-lg hover:bg-cyan-50/50 transition-colors mobile:p-1"
            >
              <motion.div
                whileHover="hover"
                variants={iconVariant}
                className="rounded-sm mb-1 mobile:mb-0"
              >
                <Image
                  src={t.src}
                  alt={t.name}
                  width={0}
                  height={0}
                  sizes="48px"
                  className="h-auto w-10 mobile:w-8"
                />
              </motion.div>
              <span className="text-xs text-slate-600 text-center leading-tight mobile:text-[10px]">
                {t.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden min-h-[64px]">
      <motion.div
        className="flex items-center gap-6 min-h-[56px] md:min-h-[64px]"
        animate={controls1}
        onMouseEnter={pause}
        onMouseLeave={play}
        drag="x"
        dragConstraints={{ left: -400, right: 400 }}
        dragElastic={0.1}
      >
        {row1.map((t, index) => (
          <a
            key={`tm1-${index}`}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block cursor-pointer"
          >
            <motion.div
              whileHover="hover"
              variants={iconVariant}
              className="rounded-sm"
            >
              <Image
                src={t.src}
                alt={t.name}
                width={0}
                height={0}
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                className="h-auto w-16 sm:w-20 md:w-24"
              />
            </motion.div>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {t.name}
            </span>
          </a>
        ))}
      </motion.div>
      <motion.div
        className="mt-3 flex items-center gap-6 opacity-80 min-h-[52px] md:min-h-[60px]"
        animate={controls2}
        onMouseEnter={pause}
        onMouseLeave={play}
        drag="x"
        dragConstraints={{ left: -400, right: 400 }}
        dragElastic={0.1}
      >
        {row2.map((t, index) => (
          <a
            key={`tm2-${index}`}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="group relative block cursor-pointer"
          >
            <motion.div
              whileHover="hover"
              variants={iconVariant}
              className="rounded-sm"
            >
              <Image
                src={t.src}
                alt={t.name}
                width={0}
                height={0}
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 72px, 88px"
                className="h-auto w-14 sm:w-18 md:w-22"
              />
            </motion.div>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {t.name}
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}