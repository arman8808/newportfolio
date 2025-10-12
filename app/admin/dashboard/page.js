// app/admin/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreVertical,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Blogs",
      value: "1,248",
      change: "+12.4%",
      trend: "up",
      icon: FileText,
      color: "blue",
      description: "Across all categories",
    },
    {
      title: "Published",
      value: "892",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      color: "green",
      description: "Live articles",
    },
    {
      title: "Drafts",
      value: "156",
      change: "-3.1%",
      trend: "down",
      icon: Clock,
      color: "yellow",
      description: "In progress",
    },
    {
      title: "Monthly Visitors",
      value: "45.2K",
      change: "+24.7%",
      trend: "up",
      icon: Users,
      color: "purple",
      description: "Unique visitors",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Published new blog",
      title: "The Future of AI in Web Development",
      time: "2 hours ago",
      user: "You",
      type: "publish",
    },
    {
      id: 2,
      action: "Updated blog",
      title: "React 18 Best Practices",
      time: "5 hours ago",
      user: "Sarah Chen",
      type: "update",
    },
    {
      id: 3,
      action: "Created draft",
      title: "Building Modern Dashboards",
      time: "1 day ago",
      user: "You",
      type: "draft",
    },
    {
      id: 4,
      action: "Published new blog",
      title: "Tailwind CSS Advanced Techniques",
      time: "2 days ago",
      user: "Mike Rodriguez",
      type: "publish",
    },
  ];

  const blogPerformance = [
    { name: "Mon", views: 1240, engagement: 45 },
    { name: "Tue", views: 1890, engagement: 52 },
    { name: "Wed", views: 1560, engagement: 48 },
    { name: "Thu", views: 2180, engagement: 61 },
    { name: "Fri", views: 1940, engagement: 55 },
    { name: "Sat", views: 1670, engagement: 49 },
    { name: "Sun", views: 1820, engagement: 53 },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
    };
    return colors[color] || colors.blue;
  };

  const getActivityIcon = (type) => {
    const icons = {
      publish: <Eye className="w-4 h-4 text-green-600" />,
      update: <TrendingUp className="w-4 h-4 text-blue-600" />,
      draft: <Clock className="w-4 h-4 text-yellow-600" />,
    };
    return icons[type] || <FileText className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Here's what's happening with your blog today. You've published 3 new
            articles this week and traffic is up 24.7%.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div
                    className={`flex items-center text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}:{" "}
                    <span className="text-gray-600 font-normal">
                      {activity.title}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Weekly Performance
            </h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">12.4K</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">54%</p>
                <p className="text-sm text-gray-600">Avg. Engagement</p>
              </div>
            </div>

            {/* Simple bar chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Views Trend</span>
                <span>Last 7 days</span>
              </div>
              <div className="flex items-end justify-between h-32">
                {blogPerformance.map((day, index) => (
                  <div
                    key={day.name}
                    className="flex flex-col items-center space-y-2 flex-1"
                  >
                    <div className="relative flex-1 w-full flex items-end">
                      <div
                        className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg mx-auto transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${(day.views / 2500) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {day.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "New Blog Post", icon: FileText, color: "blue" },
            { label: "Manage Users", icon: Users, color: "green" },
            { label: "View Analytics", icon: TrendingUp, color: "purple" },
            { label: "Content Calendar", icon: Calendar, color: "yellow" },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
              >
                <div
                  className={`p-3 rounded-lg bg-${action.color}-50 text-${action.color}-600 mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
