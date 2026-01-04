"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Handle Scroll Behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Nav Links Configuration
  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#aboutus" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${scrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20"
            : "bg-transparent"
          } mobile:px-4`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <svg
            width="140"
            height="50"
            viewBox="0 0 370 86.79"
            className="w-32 h-auto"
          >
            <g transform="matrix(1.19,0,0,1.19,-9.5,-16.1)">
              <path d="M22.3,58.78H77.7a4.59,4.59,0,0,0,4.59-4.59V18.12a4.59,4.59,0,0,0-4.59-4.59H22.3a4.59,4.59,0,0,0-4.59,4.59V54.2A4.59,4.59,0,0,0,22.3,58.78ZM20.49,18.12a1.81,1.81,0,0,1,1.81-1.81H77.7a1.81,1.81,0,0,1,1.81,1.81V54.2A1.81,1.81,0,0,1,77.7,56H22.3a1.81,1.81,0,0,1-1.81-1.81Z" fill="#06b6d4" />
              <path d="M28.26,53H71.74a4.36,4.36,0,0,0,4.35-4.35v-25a4.36,4.36,0,0,0-4.35-4.35H28.26a4.36,4.36,0,0,0-4.35,4.35v25A4.36,4.36,0,0,0,28.26,53Zm-2-29.4a2,2,0,0,1,2-2H71.74a2,2,0,0,1,2,2v25a2,2,0,0,1-2,2H28.26a2,2,0,0,1-2-2Z" fill="#06b6d4" />
              <path d="M91.58,81.59h0l-8-16.23a7,7,0,0,0-5.86-3.64H22.3a7,7,0,0,0-5.86,3.64l-8,16.23a3.42,3.42,0,0,0,0,3.37,3.42,3.42,0,0,0,3,1.5H88.56a3.2,3.2,0,0,0,3-4.87ZM89.22,83.5c0,.07-.26.19-.66.19H62.48V79.9h-25v3.78H11.44c-.4,0-.62-.11-.66-.19s-.05-.32.13-.68l8-16.23a4.31,4.31,0,0,1,3.37-2.09H77.7a4.31,4.31,0,0,1,3.37,2.09l8,16.23h0C89.27,83.18,89.27,83.42,89.22,83.5Z" fill="#2d2e32" />
              <path d="M23.36,70.18H76.64a1.39,1.39,0,0,0,0-2.78H23.36a1.39,1.39,0,0,0,0,2.78Z" fill="#06b6d4" />
              <path d="M79.62,72.7H20.38a1.39,1.39,0,0,0,0,2.78H79.62a1.39,1.39,0,1,0,0-2.78Z" fill="#06b6d4" />
            </g>
            <g transform="matrix(2.15,0,0,2.15,124.1,-16.4)" fill="#2d2e32">
              <path d="M23.6 38.56 c0.2 0 0.36 0.04 0.52 0.16 c0.16 0.08 0.24 0.24 0.28 0.4 c0.04 0.24 0 0.44 -0.16 0.64 c-0.12 0.16 -0.32 0.24 -0.52 0.24 l-10.68 0 c-0.2 0 -0.36 -0.08 -0.52 -0.2 c-0.12 -0.16 -0.2 -0.32 -0.2 -0.52 l0 -0.04 c0 -0.2 0.08 -0.36 0.2 -0.48 c0.16 -0.16 0.36 -0.24 0.56 -0.24 l1.08 0.08 c0.84 0.08 1.24 -0.24 1.24 -0.96 c0 -0.48 -0.16 -1 -0.4 -1.6 l-1.4 -3.32 c-0.08 -0.16 -0.2 -0.24 -0.36 -0.24 l-8.4 0 c-0.12 0 -0.24 0.08 -0.32 0.24 l-1.28 3.08 c-0.36 0.84 -0.56 1.52 -0.56 2.04 c0 0.56 0.28 0.8 0.88 0.8 l1.08 -0.08 c0.2 0 0.36 0.04 0.52 0.2 c0.16 0.12 0.24 0.32 0.24 0.52 s-0.08 0.36 -0.24 0.52 c-0.12 0.12 -0.28 0.2 -0.48 0.2 l-5.88 0 c-0.2 0 -0.36 -0.08 -0.52 -0.2 c-0.12 -0.16 -0.2 -0.32 -0.2 -0.52 s0.08 -0.4 0.24 -0.52 c0.12 -0.16 0.32 -0.2 0.52 -0.2 l0.4 0.04 l0.16 0 c0.56 0 1 -0.28 1.36 -0.76 c0.4 -0.6 0.8 -1.4 1.2 -2.36 l7.92 -19.04 c0.32 -0.6 0.76 -0.92 1.36 -0.92 c0.32 0 0.6 0.08 0.84 0.24 s0.44 0.4 0.56 0.68 l8 19.12 c0.36 0.96 0.76 1.72 1.16 2.32 c0.36 0.48 0.84 0.72 1.4 0.72 l0.2 0 z M5.36 30.560000000000002 c-0.04 0.12 -0.04 0.24 0.04 0.32 c0.08 0.12 0.16 0.16 0.28 0.16 l6.72 0 c0.12 0 0.2 -0.04 0.28 -0.16 c0.08 -0.08 0.08 -0.2 0.04 -0.32 l-3.4 -8 c-0.08 -0.16 -0.16 -0.24 -0.32 -0.24 c-0.12 0 -0.24 0.08 -0.32 0.24 z M40.519999999999996 23.52 c-0.72 -0.68 -1.68 -1 -2.84 -1 c-1.96 0 -3.44 1.08 -4.4 3.28 c-0.04 0.04 -0.08 0.08 -0.12 0.08 c-0.04 0.04 -0.12 0 -0.16 0 c-0.04 -0.04 -0.04 -0.08 -0.04 -0.16 l0 -0.96 c0 -0.36 0 -0.68 0.08 -1.08 l0 0 l0 0 c0 -0.2 -0.04 -0.4 -0.16 -0.52 c-0.16 -0.16 -0.32 -0.24 -0.52 -0.24 l-5.84 0 c-0.2 0 -0.32 0.04 -0.48 0.2 c-0.12 0.12 -0.16 0.28 -0.16 0.44 c0 0.2 0.04 0.32 0.2 0.48 c0.12 0.12 0.28 0.16 0.48 0.16 l0.6 -0.04 c0.36 0 0.52 0.28 0.52 0.8 l0 13 c0 0.48 -0.16 0.76 -0.52 0.76 l-0.44 -0.04 c-0.2 0 -0.36 0.04 -0.48 0.16 c-0.16 0.16 -0.2 0.28 -0.2 0.48 l0 0.04 c0 0.16 0.04 0.32 0.16 0.44 c0.16 0.12 0.28 0.2 0.48 0.2 l8.92 0 c0.16 0 0.32 -0.08 0.44 -0.2 s0.2 -0.28 0.2 -0.44 l0 -0.08 c0 -0.16 -0.08 -0.32 -0.2 -0.44 s-0.28 -0.2 -0.44 -0.2 l-2.12 0.08 c-0.36 0 -0.52 -0.28 -0.52 -0.76 l0 -6.04 c0 -1.08 0.16 -2.24 0.48 -3.4 c0.28 -1.2 0.72 -2.2 1.24 -2.96 c0.56 -0.8 1.2 -1.2 1.88 -1.2 c0.52 0 0.76 0.28 0.76 0.88 c0 0.08 -0.04 0.32 -0.12 0.8 c-0.12 0.4 -0.16 0.68 -0.16 0.84 c0 0.56 0.24 0.96 0.68 1.24 s0.92 0.44 1.48 0.44 c0.68 0 1.24 -0.2 1.72 -0.6 c0.48 -0.44 0.72 -1.04 0.72 -1.84 c0 -1.08 -0.4 -1.92 -1.12 -2.6 z" />
            </g>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <motion.div
                  className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-cyan-600 transition-colors"
                  whileHover="hover"
                  initial="initial"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      hover: { opacity: 1, scale: 1 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-cyan-50 rounded-lg -z-0 border border-cyan-100"
                  />
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 md:hidden shadow-lg flex flex-col gap-4"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-lg font-semibold text-gray-800 py-2 border-b border-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default NavBar;
