"use client";
import { OpenInNew } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
function AboutUs() {
  function getExperienceYears(startDate) {
    let today = new Date();
    let start = new Date(startDate);

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    return `${years}.${months}`;
  }

  const experienceStartDate = "2022-07-01";
  let experience = getExperienceYears(experienceStartDate);

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 * i } })
  };

  const skills = ["MERN", "REST APIs", "JWT/Auth", "Docker", "CI/CD", "SSR/Next.js", "TailwindCSS"];

  return (
    <section
      className=" w-full flex items-center flex-col justify-center gap-4 about section "
      id="aboutus"
    >
      <motion.h2 className="font-semibold text-[#555]" variants={fadeUp} initial="hidden" animate="visible">
        About me
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-9/12 mobile:flex mobile:flex-col-reverse mobile:w-11/12">
        <div className="about__data bd-grid mobile:text-start">
          <div className="flex items-start justify-start flex-col gap-1">
            <motion.span className="text-[1.6rem] font-semibold text-[#147efb]" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              Hello, I am <br />
            </motion.span>
            <motion.p className="about__description text-[#555] text-[1.1rem] font-medium" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              Arman Ali, a passionate and dedicated MERN stack developer with
              &nbsp;{experience}+ years of hands-on experience in building
              dynamic and responsive web applications. My journey in web
              development began with a fascination for creating user-friendly
              interfaces and scalable backend systems. Over time, I've honed my
              skills in MongoDB, Express.js, React.js, and Node.js, allowing me
              to develop full-stack applications that are both efficient and
              innovative.
            </motion.p>
            <motion.p className="about__description text-[#555] text-[1.1rem] font-medium" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              Throughout my career, I've had the opportunity to work on various
              projects that have challenged me to think creatively and push the
              boundaries of what's possible with web technology. My commitment
              to continuous learning and staying updated with the latest
              industry trends ensures that I am always at the forefront of
              modern web development practices.
            </motion.p>

            <motion.div className="mt-2 flex w-full flex-wrap gap-2" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-600">
                  {s}
                </span>
              ))}
            </motion.div>

            <motion.div className="flex gap-4 pt-4 w-full items-stretch" variants={fadeUp} initial="hidden" animate="visible" custom={5}>
              <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-cyan-400/20 bg-white/50 p-3 shadow-sm">
                <strong className=" text text-[2.2rem] text-[#147efb] font-semibold">
                  {experience}+
                </strong>
                <span className="about__achievement text-[#555]">
                  Years of Experience
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-cyan-400/20 bg-white/50 p-3 shadow-sm">
                <strong className=" text text-[2.2rem] text-[#147efb] font-semibold">
                  10+
                </strong>
                <span className="about__achievement text-[#555]">
                  Projects Completed
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-cyan-400/20 bg-white/50 p-3 shadow-sm">
                <Link
                  href="/Asset/Arman Ali.pdf"
                  target="_blank"
                  passHref
                  className="about__achievement text-[#555] download_button flex items-center gap-1 text-cyan-600 hover:text-cyan-700"
                >
                  Resume
                  <OpenInNew className="redirect_icon" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div className="flex items-center justify-center w-full" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          <Image
            src="/Asset/images/pikaso_enhance__custom_2K_Portrait_r100_c15_-_1_.webp"
            alt="Arman Ali portrait"
            width={600}
            height={700}
            className="rounded-2xl w-[90%] h-[85%] object-contain"
            priority
          />
        </motion.div>
      </div>

      <motion.h3
        className="mt-10 text-3xl font-semibold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        Work Journey
      </motion.h3>

      <Timeline />
    </section>
  );
}

export default AboutUs;

function Timeline() {
  const items = [
    {
      title: "Frontend Developer Intern • Branding 360 Neo Pvt Ltd",
      date: "Jul 2022 • Dec 2022",
      desc:
        "Built pixel‑perfect pages, component libraries, and responsive layouts while learning production workflows.",
    },
    {
      title: "React Developer • Branding 360 Neo Pvt Ltd",
      date: "Feb 2023 • Sep 2023",
      desc:
        "Delivered SPA features in React, optimized rendering, and improved UX with modern patterns.",
    },
    {
      title: "Full‑Stack MERN Developer • Branding 360 Neo Pvt Ltd",
      date: "Sep 2023 • Mar 2025",
      desc:
        "Owned end‑to‑end features across MongoDB, Express, React, and Node.js; focused on performance and DX.",
    },
    {
      title: "Software Developer • WebSultanate Software Technology Pvt Ltd",
      date: "Apr 2025 • Aug 2025",
      desc:
        "Contributed to product modules, API integrations, and CI/CD improvements.",
    },
    {
      title: "Product Developer • umwelt.ai",
      date: "Aug 2025 • Present",
      desc:
        "Building product features collaboratively with a focus on usability, reliability, and speed.",
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.22 }
    }
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -40, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } }
  };
  const itemRight = {
    hidden: { opacity: 0, x: 40, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="relative w-11/12 max-w-6xl py-14"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-blue-500/70 to-cyan-400/30 mobile:hidden" />

      <div className="flex flex-col gap-10">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div key={item.title + idx} variants={isLeft ? itemLeft : itemRight}>
              <div className={(isLeft ? "mr-auto pr-12" : "ml-auto pl-12") + " relative max-w-[640px] mobile:max-w-full mobile:pl-0 mobile:pr-0"}>
                {/* connector arm to center line */}
                <div
                  className={
                    "absolute top-1/2 h-[2px] w-10 -translate-y-1/2 bg-gradient-to-r mobile:hidden " +
                    (isLeft ? "from-transparent to-cyan-400 right-0" : "from-cyan-400 to-transparent left-0")
                  }
                />
                {/* center marker dot */}
                <div
                  className={
                    "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-cyan-400 mobile:hidden " +
                    (isLeft ? "-right-[22px]" : "-left-[22px]")
                  }
                />
                <motion.article
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/15 p-6 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-white/20"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-cyan-200/10 to-transparent" />
                  <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                  <h4 className="relative text-xl font-semibold text-slate-800">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">{item.title}</span>
                  </h4>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <div className="relative mt-4">
                    <span className="inline-block rounded-full bg-cyan-500/90 px-4 py-1.5 text-xs font-medium text-white shadow-lg shadow-cyan-500/30">
                      {item.date}
                    </span>
                  </div>
                </motion.article>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
