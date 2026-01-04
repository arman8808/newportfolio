"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Shield, Tag, Zap, Code, Database, Globe, Layers, Target, CheckCircle2, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProject } from "@app/services/project.queries";
import { projectInfo } from "@components/projectInfo"; // Retain if needed for fallbacks or remove entirely if not used

// Helper components
const TechBadge = ({ label, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 + index * 0.05 }}
    className="px-3 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-lg border border-cyan-100/50 backdrop-blur-sm shadow-sm"
  >
    {label}
  </motion.span>
);

const OutcomeCard = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-green-100 shadow-sm"
  >
    <div className="mt-1 text-green-500">
      <CheckCircle2 className="w-5 h-5" />
    </div>
    <p className="text-gray-700 font-medium">{text}</p>
  </motion.div>
);

export default function SingleProjectPage({ params }) {
  const router = useRouter();
  const id = decodeURIComponent(params.SingleProjectPage || "");
  const { data: projectData, isLoading, error } = useProject(id);
  const project = projectData;

  // Use useEffect only if you have side effects, typically react-query handles fetching
  // useEffect(() => { ... }, [slug]); <-- REMOVING static logic

  // Skeleton Component
  const ProjectSkeleton = () => (
    <div className="min-h-screen bg-[#f9f9f9] pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="w-32 h-10 bg-gray-200 rounded-full mb-12" />

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <div>
            {/* Badges */}
            <div className="flex gap-3 mb-6">
              <div className="w-24 h-6 bg-gray-200 rounded-full" />
              <div className="w-20 h-6 bg-gray-200 rounded-full" />
            </div>
            {/* Title */}
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-6" />
            {/* Description */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
            {/* Tech Stack */}
            <div className="border-t border-gray-200 pt-8">
              <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-8 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-gray-200 rounded-3xl" />
        </div>

        {/* Case Study Skeleton */}
        <div className="space-y-20">
          {[1, 2].map((i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 md:gap-12">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
              <div>
                <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
          {/* Results Skeleton */}
          <div className="h-64 bg-gray-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );

  if (isLoading) return <ProjectSkeleton />;

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/Projects')}
            className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#f9f9f9] pb-20"
      >
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/30 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-20 z-10">

          {/* Back Navigation */}
          <motion.button
            onClick={() => router.back()}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors mb-12 group w-fit"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-cyan-200 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="font-medium">Back to Projects</span>
          </motion.button>

          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Badge & NDA Status */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest border border-amber-100 flex items-center gap-1.5 shadow-sm">
                  <Shield className="w-3 h-3" />
                  NDA Protected
                </div>
                <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                  {project.category || "Development"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                {project.title}
                <span className="text-cyan-500">.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                {project.subDesc}
              </p>

              {/* Stack */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack?.map((tech, i) => (
                    <TechBadge key={tech} label={tech} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 bg-white"
            >
              <Image
                src={project.image || project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-3xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Case Study Section */}
          {project.caseStudy && (
            <div className="space-y-20">

              {/* Challenge */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 md:gap-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm rotate-3">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
                  <div className="text-lg text-gray-600 leading-relaxed max-w-3xl prose prose-cyan"
                    dangerouslySetInnerHTML={{ __html: project.caseStudy.challenge || "Identifying and resolving complex system bottlenecks while maintaining user experience standards." }}
                  />
                </div>
              </motion.section>

              {/* Solution */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 md:gap-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-sm -rotate-2">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
                  <div className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-8 prose prose-cyan"
                    dangerouslySetInnerHTML={{ __html: project.caseStudy.solution || "Implementing a modern scalable architecture using the latest web technologies." }}
                  />
                </div>
              </motion.section>

              {/* Impact / Stats */}
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-cyan-50/30 rounded-3xl p-8 md:p-12 border border-cyan-100 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.1)] relative overflow-hidden"
              >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                      <Zap className="w-8 h-8 text-cyan-500 fill-cyan-500" />
                      Key Results
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      The deployment resulted in significant performance improvements and user engagement metrics, exceeding initial client expectations.
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {Array.isArray(project.caseStudy.outcomes) ? (
                      project.caseStudy.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-500 shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-lg text-gray-700">{outcome}</span>
                        </div>
                      ))
                    ) : (
                      <div
                        className="prose prose-cyan max-w-none text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: project.caseStudy.outcomes || "" }}
                      />
                    )}
                  </div>
                </div>
              </motion.section>

            </div>
          )}

          {/* Fallback for projects without specific case study data yet */}
          {!project.caseStudy && (
            <div className="mt-20 p-12 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
              <p className="text-gray-500 italic">Detailed case study data is currently being updated for this project.</p>
            </div>
          )}

        </div>
      </motion.main>
    </AnimatePresence>
  );
}