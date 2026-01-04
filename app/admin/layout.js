"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  User,
  Settings,
  FileText,
  ChevronDown,
  Home,
  Users,
  Shield,
  Bell,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { adminLogout } from "@app/(auth)/admin/login/api";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* -------------------- Responsive Logic -------------------- */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, start closed. On desktop, start open.
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Projects", href: "/admin/projects", icon: Layers },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "About Me", href: "/admin/about", icon: User },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];
  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      router.push("/admin/login");
    },
  });
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* -------------------- Sidebar -------------------- */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -256 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        // Using fixed positioning ensures it doesn't take up space when "closed"
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-500">Management Dashboard</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t">
          <Link
            href="/admin/profile"
            onClick={() => isMobile && setIsSidebarOpen(false)}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 mb-2 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
            <Settings className="w-4 h-4 text-gray-400 group-hover:rotate-45 transition-transform" />
          </Link>

          <button onClick={() => logoutMutation.mutate()} className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* -------------------- Main Content Container -------------------- */}
      <motion.div
        className="flex-1 flex flex-col min-h-0 w-full"
        initial={false}
        animate={{
          // On desktop: add padding to push content when sidebar is open
          // On mobile: padding is 0 because sidebar overlays the content
          paddingLeft: isSidebarOpen && !isMobile ? "256px" : "0px",
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      >
        {/* Top Bar */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>

            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">A</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </motion.div>

      {/* -------------------- Mobile Overlay -------------------- */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
