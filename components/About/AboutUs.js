"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, FileText, Code2, Terminal, Cpu, Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAboutData } from "@app/services/about.service";

function AboutUs() {
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      try {
        const res = await getAboutData();
        return res.data;
      } catch (error) {
        return null; // Handle error or return null
      }
    },
  });

  function getExperienceYears(startDate) {
    if (!startDate) return 0;
    let today = new Date();
    let start = new Date(startDate);

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    return years + (months / 12); // accurate float for calculations
  }

  // Format for display (e.g., "3.5")
  const formatExperience = (startDate) => {
    const years = getExperienceYears(startDate);
    return years.toFixed(1);
  };

  // Defaults if no data
  const experienceStartDate = aboutData?.experienceStartDate || "2022-07-01";
  const experienceDisplay = formatExperience(experienceStartDate);
  const skills = aboutData?.skills || ["MERN", "REST APIs", "JWT/Auth", "Docker", "CI/CD", "SSR/Next.js", "TailwindCSS"];
  // Static Fallback Data
  const staticTimeline = [
    {
      title: "Product Developer • umwelt.ai",
      date: "Aug 2025 • Present",
      desc: "Building product features collaboratively with a focus on usability, reliability, and speed.",
      icon: "🌟",
      category: "product"
    },
    {
      title: "Full‑Stack MERN Developer • Branding 360 Neo Pvt Ltd",
      date: "Sep 2023 • Aug 2025",
      desc: "Owned end‑to‑end features across MongoDB, Express, React, and Node.js; focused on performance and DX.",
      icon: "🚀",
      category: "fullstack"
    },
    {
      title: "React Developer • Branding 360 Neo Pvt Ltd",
      date: "July 2022 • Sep 2023",
      desc: "Delivered SPA features in React, optimized rendering, and improved UX with modern patterns.",
      icon: "⚛️",
      category: "frontend"
    }
  ];

  const timelineItems = (aboutData?.timeline && aboutData.timeline.length > 0) ? aboutData.timeline : staticTimeline;
  const staticBio = `I’m a Full Stack Developer with ${experienceDisplay}+ years of experience building scalable, production-ready web applications using the MERN stack and cloud-native technologies.\n\nI specialize in designing role-based systems, multi-vendor platforms, and automation-driven products that solve real business problems. My work spans domains like healthcare, e-commerce, and event platforms, where I’ve built features such as automated billing, real-time workflows, secure authentication, and third-party integrations.\n\nI focus on clean architecture, performance optimization, and maintainable code, with hands-on experience deploying and scaling applications on AWS. I enjoy turning complex requirements into reliable, user-friendly products.`;
  const bio = staticBio; // aboutData?.bio || staticBio;
  const profileImage = aboutData?.imageUrl || "/Asset/images/pikaso_enhance__custom_2K_Portrait_r100_c15_-_1_.webp";
  const resumeUrl = aboutData?.resumeUrl || "/Asset/Arman Ali.pdf";

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 * i } })
  };

  if (isLoading) {
    return (
      <section className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-600" />
      </section>
    );
  }

  return (
    <section
      className="w-full flex flex-col items-center justify-center gap-16 py-20 px-4"
      id="aboutus"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Left Column: Text & Content */}
        <div className="order-2 lg:order-1 flex flex-col items-start gap-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 text-3xl md:text-4xl mb-2 inline-block">
              ABOUT ME
            </h2>
            <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
          </motion.div>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{ __html: bio.replace(/\n/g, '<br />') }}
            />
          </div>

          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: true }}
          >
            {skills.map((s, i) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(6,182,212,0.1)" }}
                className="px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-sm font-semibold border border-gray-200 cursor-default transition-colors hover:text-cyan-600 hover:border-cyan-200"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 w-full mt-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={4}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-1 hover:border-cyan-200 hover:shadow-cyan-100/50 transition-all group">
              <span className="text-3xl font-black text-cyan-500 group-hover:scale-110 transition-transform duration-300">{Math.floor(experienceDisplay)}+</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider text-center">Years Exp.</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-1 hover:border-cyan-200 hover:shadow-cyan-100/50 transition-all group">
              <span className="text-3xl font-black text-cyan-500 group-hover:scale-110 transition-transform duration-300">10+</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider text-center">Projects</span>
            </div>

            <Link
              href={resumeUrl}
              target="_blank"
              className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 flex flex-col items-center justify-center gap-1 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <Download className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-bold uppercase tracking-wider">Resume</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Image */}
        <motion.div
          className="order-1 lg:order-2 flex items-center justify-center relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: true }}
        >
          {/* Decorative background blob */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-[3rem] blur-2xl transform scale-95"
          />

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/50 backdrop-blur-sm"
          >
            <Image
              src={profileImage}
              alt="Arman Ali portrait"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
            />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mt-12">
        <motion.h3
          className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          My Professional Journey
        </motion.h3>

        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}

export default AboutUs;

function Timeline({ items = [] }) {
  // If no items, show a placeholder or nothing
  if (!items || items.length === 0) return null;

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 }
    }
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemRight = {
    hidden: { opacity: 0, x: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-6xl py-20 px-4 overflow-hidden"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Animated Center Line */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 mobile:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 via-blue-500/20 to-purple-500/20 blur-sm" />
      </motion.div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -40, -80]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
            viewport={{ once: true }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-16">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const isLast = idx === items.length - 1;

          return (
            <motion.div
              key={idx}
              variants={isLeft ? itemLeft : itemRight}
              className="relative"
            >
              <div className={`${isLeft ? "mr-auto pr-16" : "ml-auto pl-16"} relative max-w-2xl mobile:max-w-full mobile:px-0 mobile:py-4`}>

                {/* Connector Line */}
                <div className={`absolute top-1/2 h-0.5 w-12 -translate-y-1/2 bg-gradient-to-r mobile:hidden ${isLeft
                  ? "right-0 from-cyan-400/80 to-cyan-400/20"
                  : "left-0 from-cyan-400/20 to-cyan-400/80"
                  }`} />

                {/* Animated Icon Dot */}
                <motion.div
                  variants={iconVariants}
                  className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-lg border border-white/50 mobile:hidden ${isLeft ? "-right-6" : "-left-6"
                    }`}
                >
                  <div className="text-xl">{item.icon}</div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20" />
                </motion.div>

                {/* Timeline Card */}
                <motion.article
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group"
                >
                  {/* Background Glow */}
                  <div className={`absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isLeft ? "rotate-2" : "-rotate-2"
                    }`} />

                  {/* Main Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 p-8">

                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title with gradient */}
                      <h4 className="text-2xl font-bold text-gray-800 mb-3">
                        <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {item.desc}
                      </p>

                      {/* Date Badge */}
                      <div className="flex items-center justify-between">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
                        >
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          {item.date}
                        </motion.span>

                        {/* Mobile Icon */}
                        <div className="flex md:hidden text-2xl">
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className={`absolute top-0 w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full ${isLeft ? "left-0" : "right-0"
                      }`} />
                    <div className={`absolute bottom-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ${isLeft ? "right-0" : "left-0"
                      }`} />
                  </div>
                </motion.article>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Current Position Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        viewport={{ once: true }}
        className="absolute left-1/2 -translate-x-1/2 -bottom-8 mobile:hidden"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-4 py-2 text-white text-sm font-semibold shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          Currently Here
        </div>
      </motion.div>
    </motion.div>
  );
}
