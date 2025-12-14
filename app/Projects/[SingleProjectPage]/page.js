"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Gallery from "@components/Gallery/Gallery";
import gallery from "../../../public/Asset/images/about.webp";
import gallery1 from "../../../public/Asset/images/about.webp";
import gallery2 from "../../../public/Asset/images/about.webp";
import gallery3 from "../../../public/Asset/images/about.webp";
import gallery4 from "../../../public/Asset/images/about.webp";
import gallery5 from "../../../public/Asset/images/about.webp";
import gallery6 from "../../../public/Asset/images/about.webp";
import gallery7 from "../../../public/Asset/images/about.webp";
import gallery8 from "../../../public/Asset/images/about.webp";
import poster from "../../../public/Asset/video/3048179-uhd_2560_1440_24fps-0.jpg";
import { Play, ChevronRight, ExternalLink, Github, Zap, Clock, Users, Code } from "lucide-react";

// Custom components
const FloatingTechTag = ({ icon: Icon, label, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg"
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-center mb-12 last:mb-0"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
        {year}
      </div>
      <div className="ml-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg flex-1">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      {index < 2 && (
        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
      )}
    </motion.div>
  );
};

export default function SingleProjectPage({ params }) {
  const { slug } = params;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const itemData = [
    { img: gallery },
    { img: gallery1 },
    { img: gallery2 },
    { img: gallery3 },
    { img: gallery4 },
    { img: gallery5 },
    { img: gallery6 },
    { img: gallery7 },
    { img: gallery8 },
  ];

  const techStack = [
    { icon: Code, label: "React" },
    { icon: Code, label: "Next.js" },
    { icon: Code, label: "TypeScript" },
    { icon: Code, label: "Tailwind" },
    { icon: Code, label: "Node.js" },
    { icon: Code, label: "MongoDB" },
  ];

  const projectStats = [
    { icon: Clock, label: "6 Months", value: "Duration" },
    { icon: Users, label: "4 Members", value: "Team Size" },
    { icon: Zap, label: "10K+", value: "Active Users" },
  ];

  const features = [
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for maximum speed and efficiency",
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Intuitive interface with seamless experience",
    },
    {
      icon: Code,
      title: "Modern Stack",
      description: "Built with cutting-edge technologies",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Research & Planning",
      description: "Initial concept and market research",
    },
    {
      year: "2024",
      title: "Development",
      description: "Core development and testing phases",
    },
    {
      year: "2024",
      title: "Launch & Scale",
      description: "Product launch and user acquisition",
    },
  ];

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-purple-500/5 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                  Project<span className="text-blue-600">.</span>Title
                </h1>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </motion.button>
              </div>
            </div>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-600 max-w-3xl leading-relaxed"
            >
              A revolutionary platform transforming how users interact with modern web applications through cutting-edge technology and intuitive design.
            </motion.p>
          </motion.header>

          {/* Video Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-20 group"
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                poster={poster}
                className="w-full h-full object-cover"
              >
                <source
                  src="/Asset/video/3048179-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center group"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {projectStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg group overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.label}</div>
                      <div className="text-gray-600">{stat.value}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} delay={index * 0.1} />
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, index) => (
                <FloatingTechTag key={tech.label} {...tech} delay={index * 0.05} />
              ))}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">Project Timeline</h2>
            </div>
            <div className="relative">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} {...item} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900">Visual Gallery</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Gallery itemData={itemData} />
            </motion.div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black"
          >
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's collaborate and build something amazing together. Get in touch for a free consultation.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start a Conversation
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>
            {/* Animated background particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
              />
            ))}
          </motion.section>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}