"use client";

import { useAuth } from "../../../lib/authprovider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  PenTool,
  TrendingUp,
  Award,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Theme state for colors
  const [theme] = useState({
    activeBg: "bg-blue-600",
    activeGlow: "shadow-[0_0_15px_rgba(37,99,235,0.5)]",
    inactiveText: "text-slate-400",
    hoverText: "hover:text-white",
  });

  const getNavArray = () => {
    if (user?.role === "ADMIN") {
      return [
        { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
        { name: "My Course", href: "/admin/course", icon: BookOpen },
        { name: "Other Blog", href: "/admin/blog", icon: FileText },
        { name: "Change Role", href: "/admin/change-role", icon: Users },
        { name: "My Blog", href: "/admin/own-blog", icon: PenTool },
        { name: "Other Course", href: "/admin/other-course", icon: GraduationCap },
      ];
    } else if (user?.role === "TEACHER") {
      return [
        { name: "Overview", href: "/teacher/overview", icon: LayoutDashboard },
        { name: "My Blog", href: "/teacher/my-blog", icon: PenTool },
        { name: "My Course", href: "/teacher/course", icon: BookOpen },
      ];
    } else {
      return [
        { name: "Overview", href: "/student/overview", icon: LayoutDashboard },
        { name: "My Course", href: "/student/my-course", icon: BookOpen },
        { name: "Progress", href: "/student/progress", icon: TrendingUp },
        { name: "Achievements", href: "/student/achievements", icon: Award },
      ];
    }
  };

  const navArray = getNavArray();

  return (
    <div className="mt-15 px-10">
      <h1 className="text-app-text-primary text-4xl font-extrabold">
        Welcome back,{" "}
        <span className="bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">
          {user?.profile?.fullName || "User"}
        </span>
        !
      </h1>
      <p className="text-app-text-primary mt-4 ml-1">
        {user?.role === "STUDENT"
          ? "Welcome back! Here is your personalized learning path."
          : user?.role === "ADMIN"
          ? "Welcome to the Admin Dashboard."
          : "Welcome, Educator. Ready to build your next learning path?"}
      </p>

      {/* Navbar Container */}
      <nav className="mt-8 p-1 bg-white/5 inline-flex rounded-full border border-white/10">
        {navArray.map((item) => {
          // Fix: Ensure comparison works with your route structure
          const isActive = pathname.includes(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`/home/dashboard${item.href}`}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${isActive ? "text-white" : `${theme.inactiveText} ${theme.hoverText}`}
              `}
            >
              {/* Sliding Background */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute inset-0 ${theme.activeBg} rounded-full ${theme.activeGlow}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon and Text */}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}