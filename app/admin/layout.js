// app/admin/layout.tsx
"use client";

import { useState } from "react";
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
  Settings as SettingsIcon,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Full Height */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 30 }}
        className="fixed lg:relative z-50 w-64 h-screen bg-white shadow-xl flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
        </div>

        {/* Navigation - Takes available space */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          {/* Profile Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group mb-2"
          >
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-sm truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">
                  admin@example.com
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          </button>

          {/* Logout Button */}
          <button className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {" "}
        {/* Changed to min-h-0 for proper flex behavior */}
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-40 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            </div>
          </div>
        </header>
        {/* Page Content - Scrollable area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
