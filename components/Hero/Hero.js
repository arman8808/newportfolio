"use client";
import Image from "next/image";
import Link from "next/link";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { AnimatePresence, motion, useMotionValue, useTransform, useReducedMotion, useAnimationControls } from "framer-motion";
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
    "Full-Stack Developer",
    "UI-Focused Engineer",
    "Performance Optimizer",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(Math.max(-50, Math.min(50, x / 5)));
    mouseY.set(Math.max(-50, Math.min(50, y / 5)));
  }, [mouseX, mouseY]);
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
  ];
  return (
    <section
      className="hero relative w-full flex items-center flex-col justify-center gap-20 py-4 h-screen bg mobile:h-[70vh] overflow-hidden"
      id="home"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-36 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="hero_div flex flex-col">
        <div className="hero_top ">
          <div className="hero_top_text">
            <motion.h1 variants={textVariant} initial="hidden" animate="visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            <motion.p variants={textVariant} initial="hidden" animate="visible">
              Hi, I'm Arman Ali. A passionate Full-Stack Mern Developer based in
              Lucknow, India. 📍
            </motion.p>

            <div className="mt-4 flex items-center gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md bg-cyan-500 px-5 py-2 text-white shadow-lg shadow-cyan-500/30"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md border border-cyan-500 px-5 py-2 text-cyan-400 hover:bg-cyan-500/10"
              >
                Contact Me
              </motion.a>
            </div>

            <span className="mt-4 flex gap-2">
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
          <div className="hero_top_image mobile:hidden" onMouseMove={handleMouseMove}>
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              style={{ x: translateX, y: translateY, rotateZ: rotate }}
            >
              <Image
                src="/Asset/images/Frame.png"
                alt="Arman Ali - Full Stack Developer"
                width={500}
                height={400}
                priority
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(120px 120px at calc(50% + " + mouseX.get() + "px) calc(50% + " + mouseY.get() + "px), rgba(34,211,238,0.25), transparent 60%)",
                }}
              />
            </motion.div>
          </div>
        </div>
        <div className="hero_bottom mt-6 flex w-full max-w-4xl flex-col gap-3">
          <p className="pl-1 text-sm uppercase tracking-widest text-cyan-400/80">Tech Stack</p>
          <TechMarquee tech={techStack} reduce={shouldReduceMotion} />
        </div>
      </div>
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-400/70"
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

  const pause = () => { controls1.stop(); controls2.stop(); };
  const play = () => {
    if (reduce) return;
    controls1.start({ x: ["0%", "-100%"], transition: { duration: 20, repeat: Infinity, ease: "linear" } });
    controls2.start({ x: ["-100%", "0%"], transition: { duration: 22, repeat: Infinity, ease: "linear" } });
  };

  useEffect(() => { play(); }, [reduce]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center gap-6"
        animate={controls1}
        onMouseEnter={pause}
        onMouseLeave={play}
        drag="x"
        dragConstraints={{ left: -400, right: 400 }}
        dragElastic={0.1}
      >
        {row1.map((t, index) => (
          <a key={`tm1-${index}`} href={t.url} target="_blank" rel="noreferrer" className="group relative block cursor-pointer">
            <motion.div whileHover="hover" variants={iconVariant} className="rounded-sm">
              <Image src={t.src} alt={t.name} width={72} height={48} />
            </motion.div>
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {t.name}
            </span>
          </a>
        ))}
      </motion.div>
      <motion.div
        className="mt-3 flex items-center gap-6 opacity-80"
        animate={controls2}
        onMouseEnter={pause}
        onMouseLeave={play}
        drag="x"
        dragConstraints={{ left: -400, right: 400 }}
        dragElastic={0.1}
      >
        {row2.map((t, index) => (
          <a key={`tm2-${index}`} href={t.url} target="_blank" rel="noreferrer" className="group relative block cursor-pointer">
            <motion.div whileHover="hover" variants={iconVariant} className="rounded-sm">
              <Image src={t.src} alt={t.name} width={100} height={75} />
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
