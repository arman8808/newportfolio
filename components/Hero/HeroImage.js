"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroImage() {
    // --- Animation Variants ---

    // Floating effect with slight rotation for 3D feel
    const float = {
        animate: {
            y: [0, -15, 0],
            rotateX: [0, 5, 0],
            rotateY: [0, 5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const floatDelayed = {
        animate: {
            y: [0, -12, 0],
            rotateX: [0, -5, 0],
            rotateY: [0, 10, 0],
            transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
            },
        },
    };

    // Pulse effect for lights/glows
    const pulse = {
        animate: {
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    // Simulate typing code lines
    const typing = (delay) => ({
        animate: {
            width: ["0%", "80%", "80%", "0%"],
            opacity: [1, 1, 0, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                delay: delay,
                times: [0, 0.4, 0.9, 1],
                ease: "easeInOut",
            },
        },
    });

    // Data flowing through lines
    const dataFlow = {
        animate: {
            pathLength: [0, 1],
            pathOffset: [0, 1],
            opacity: [0, 1, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <svg
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[600px] drop-shadow-2xl"
            >
                {/* --- Background Glows --- */}
                <motion.circle
                    cx="400"
                    cy="350"
                    r="200"
                    fill="url(#glowGradient)"
                    className="opacity-30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* --- Connecting Wires (Behind) --- */}
                <g stroke="url(#lineGradient)" strokeWidth="2" opacity="0.3">
                    <path d="M400 350 L200 280" />
                    <path d="M400 350 L600 280" />
                    <path d="M400 350 L400 200" />
                </g>

                {/* --- Data Flow Particles --- */}
                {/* Particle moving to Left Panel */}
                <motion.circle r="3" fill="#06b6d4">
                    <animateMotion
                        path="M400 350 L200 280"
                        dur="3s"
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                    />
                </motion.circle>
                {/* Particle moving to Right Panel */}
                <motion.circle r="3" fill="#2563eb">
                    <animateMotion
                        path="M400 350 L600 280"
                        dur="4s"
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                    />
                </motion.circle>

                {/* --- Main Platform/Desk (Isometric) --- */}
                <motion.g
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <path
                        d="M200 350 L400 450 L600 350 L400 250 Z"
                        fill="#f8fafc" // slate-50
                        stroke="#cbd5e1" // slate-300
                        strokeWidth="2"
                    />
                    {/* Desk Thickness (3D Side) */}
                    <path
                        d="M200 350 L200 370 L400 470 L600 370 L600 350"
                        fill="#e2e8f0" // slate-200
                        stroke="#cbd5e1"
                        strokeWidth="1"
                    />
                </motion.g>

                {/* --- Monitor Screen --- */}
                <motion.g
                    transform="translate(320, 200)"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Stand */}
                    <path d="M60 120 L100 120 L80 90 Z" fill="#94a3b8" />
                    <rect x="75" y="90" width="10" height="30" fill="#cbd5e1" />

                    {/* Screen Body */}
                    <rect x="0" y="0" width="160" height="100" rx="8" fill="#1e293b" /> {/* slate-800 */}
                    {/* Screen Display */}
                    <rect x="5" y="5" width="150" height="90" rx="4" fill="#0f172a" /> {/* slate-900 */}

                    {/* Code Lines - Animated Typing */}
                    <motion.rect x="15" y="20" height="4" rx="2" fill="#06b6d4" variants={typing(0)} animate="animate" />
                    <motion.rect x="15" y="30" height="4" rx="2" fill="#334155" variants={typing(0.5)} animate="animate" />
                    <motion.rect x="15" y="40" height="4" rx="2" fill="#334155" variants={typing(1)} animate="animate" />
                    <motion.rect x="15" y="50" height="4" rx="2" fill="#2563eb" variants={typing(1.5)} animate="animate" />

                    {/* Chart Graph Area */}
                    <g transform="translate(80, 40)">
                        <motion.path
                            d="M10 40 L25 20 L40 30 L55 10"
                            stroke="#06b6d4" strokeWidth="2" fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                        <circle cx="10" cy="40" r="2" fill="#06b6d4" />
                        <circle cx="25" cy="20" r="2" fill="#06b6d4" />
                        <circle cx="40" cy="30" r="2" fill="#06b6d4" />
                        <circle cx="55" cy="10" r="2" fill="#06b6d4" />
                    </g>
                </motion.g>

                {/* --- Floating Glass Panels --- */}

                {/* Left Panel - Analytics */}
                <motion.g variants={float} animate="animate" initial="animate">
                    <rect
                        x="130"
                        y="200"
                        width="120"
                        height="160"
                        rx="12"
                        fill="url(#glassGradient)"
                        stroke="rgba(6, 182, 212, 0.4)"
                        strokeWidth="1"
                        className="backdrop-blur-sm"
                    />
                    {/* UI Elements */}
                    <circle cx="190" cy="240" r="25" stroke="#06b6d4" strokeWidth="4" strokeDasharray="100" strokeDashoffset="40" fill="none" opacity="0.8">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="190" y="245" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">AI</text>

                    <rect x="150" y="280" width="80" height="6" rx="3" fill="#cbd5e1" opacity="0.5" />
                    <rect x="150" y="300" width="60" height="6" rx="3" fill="#cbd5e1" opacity="0.4" />
                    <rect x="150" y="320" width="70" height="6" rx="3" fill="#cbd5e1" opacity="0.4" />
                </motion.g>

                {/* Right Panel - Code */}
                <motion.g variants={floatDelayed} animate="animate" initial="animate">
                    <rect
                        x="550"
                        y="180"
                        width="140"
                        height="180"
                        rx="12"
                        fill="url(#glassGradient)"
                        stroke="rgba(37, 99, 235, 0.4)"
                        strokeWidth="1"
                    />
                    {/* Code Snippet Look */}
                    <motion.rect x="570" y="210" width="100" height="8" rx="4" fill="rgba(6, 182, 212, 0.3)" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                    <rect x="570" y="230" width="60" height="8" rx="4" fill="rgba(37, 99, 235, 0.3)" />
                    <rect x="640" y="230" width="30" height="8" rx="4" fill="rgba(148, 163, 184, 0.3)" />

                    <rect x="570" y="250" width="80" height="8" rx="4" fill="rgba(148, 163, 184, 0.2)" />
                    <rect x="570" y="270" width="90" height="8" rx="4" fill="rgba(148, 163, 184, 0.2)" />
                    <motion.rect x="570" y="290" width="50" height="8" rx="4" fill="rgba(6, 182, 212, 0.3)" animate={{ width: [50, 70, 50] }} transition={{ duration: 3, repeat: Infinity }} />
                </motion.g>

                {/* --- Abstract Tech Shapes --- */}
                <motion.path
                    d="M650 400 L680 380 L710 400 L710 430 L680 450 L650 430 Z"
                    fill="url(#cubeGradient)"
                    variants={float}
                    animate="animate"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                />

                <motion.circle
                    cx="150"
                    cy="450"
                    r="20"
                    fill="url(#circleGradient)"
                    variants={floatDelayed}
                    animate="animate"
                    whileHover={{ scale: 1.2 }}
                />

                {/* --- Definitions --- */}
                <defs>
                    <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                    </linearGradient>

                    <radialGradient id="glowGradient" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </radialGradient>

                    <linearGradient id="cubeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>

                    <linearGradient id="circleGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>

                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
