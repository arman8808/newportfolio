"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <section
      className="relative flex items-center justify-center py-14"
      id="contact"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex w-11/12 max-w-5xl flex-col items-center justify-center gap-6">
        <p className="text-xs uppercase tracking-widest text-cyan-500">Contact</p>
        <h3 className="text-center text-3xl font-semibold">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Don't be shy! Hit me up! 👇
          </span>
        </h3>
        <div className="contact_info mt-5 grid w-full grid-cols-2 gap-6 mobile:grid-cols-1">
          <motion.a
            href="https://maps.app.goo.gl/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="flex w-full min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <span className="flex shrink-0 items-center justify-center text-cyan-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-map-search"
              >
                <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5"></path>
                <path d="M9 4v13"></path>
                <path d="M15 7v5"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M20.2 20.2l1.8 1.8"></path>
              </svg>
            </span>
            <div className="contact_info_info flex min-w-0 flex-col items-start">
              <h3 className="text-slate-700">Location</h3>
              <p className="text-slate-600">Lucknow, India</p>
            </div>
          </motion.a>
          <motion.a
            href="mailto:armanal3066@gmail.com"
            whileHover={{ y: -4 }}
            className="flex w-full min-w-0 items-center gap-4 overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <span className="flex shrink-0 items-center justify-center text-cyan-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tabler-icon tabler-icon-mail"
              >
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                <path d="M3 7l9 6l9 -6"></path>
              </svg>
            </span>
            <div className="contact_info_info flex min-w-0 flex-col items-start">
              <h3 className="text-slate-700">Mail</h3>
              <p className="break-words text-cyan-600">armanal3066@gmail.com</p>
            </div>
          </motion.a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="mailto:armanal3066@gmail.com" className="rounded-md bg-cyan-500 px-5 py-2 text-white shadow-lg shadow-cyan-500/30 hover:translate-y-[-2px]">
            Email Me
          </Link>
          <Link href="https://www.linkedin.com/in/arman-ali-0b7480147/" target="_blank" className="rounded-md border border-cyan-500 px-5 py-2 text-cyan-500 hover:bg-cyan-500/10">
            LinkedIn
          </Link>
          <Link href="https://github.com/arman8808" target="_blank" className="rounded-md border border-cyan-500 px-5 py-2 text-cyan-500 hover:bg-cyan-500/10">
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;
