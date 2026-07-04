"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  GraduationCap,
  Presentation,
  BookOpen,
  LayoutGrid,
  ArrowRight,
  Clock,
  Sun,
  Moon,
  Sunrise,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/authprovider";
import api from "@/lib/axios";

type AdminStats = {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
};

type ActionItem = {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  path: string;
  btnText: string;
  gradient: string;
};

const staggerWrap: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12)
    return { text: "Good Morning", icon: Sunrise, gradient: "from-amber-400 to-orange-500" };
  if (hour >= 12 && hour < 17)
    return { text: "Good Afternoon", icon: Sun, gradient: "from-orange-400 to-rose-500" };
  return { text: "Good Evening", icon: Moon, gradient: "from-indigo-400 to-purple-500" };
}

const actionItems: ActionItem[] = [
  {
    id: "users",
    title: "View All Users",
    desc: "Manage all registered users, handle roles, permissions, and monitor platform activity.",
    icon: Users,
    path: "/admin/users",
    btnText: "Manage Users",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "categories",
    title: "View Categories",
    desc: "Organize course categories, add new topics, and structure the platform's learning library.",
    icon: LayoutGrid,
    path: "/admin/categories",
    btnText: "Manage Categories",
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

export default function OverviewPage() {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchAdminStats() {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          api.get("/admin/getAlluser", { params: { page: 1, limit: 100 } }).catch(() => null),
          api.get("/course", { params: { page: 1, limit: 100 } }).catch(() => null),
        ]);

        const users = usersRes?.data?.user || [];
        const courses = coursesRes?.data?.course || coursesRes?.data?.data || [];
        const userList = Array.isArray(users) ? users : [];
        const courseList = Array.isArray(courses) ? courses : [];

        const totalUsers = userList.length;
        const totalStudents = userList.filter((u: { role: string }) => u.role === "STUDENT").length;
        const totalTeachers = userList.filter((u: { role: string }) => u.role === "TEACHER").length;

        setStats({
          totalUsers,
          totalStudents,
          totalTeachers,
          totalCourses: courseList.length,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdminStats();
  }, []);

  const greeting = getGreeting(now.getHours());
  const GreetingIcon = greeting.icon;
  const adminName = user?.profile?.fullName || "Admin";

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, gradient: "from-blue-500 to-cyan-400" },
    { label: "Total Students", value: stats.totalStudents, icon: GraduationCap, gradient: "from-emerald-500 to-teal-400" },
    { label: "Total Teachers", value: stats.totalTeachers, icon: Presentation, gradient: "from-amber-500 to-orange-400" },
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, gradient: "from-violet-500 to-purple-400" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-md sm:p-10 mb-8"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/*  */}
           <div>
                   
        
                    <div className="mt-3 flex items-center gap-8">
                      {user?.profile?.avatarUrl ? (
                        <Image
                          src={user.profile.avatarUrl}
                          alt={user.profile.fullName || "Profile"}
                          width={40}
                          height={40}
                          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 bg-indigo-500 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-4 ring-white/20 flex-shrink-0">
                          <span className="text-2xl font-bold text-white">
                            {user?.profile?.fullName?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${greeting.gradient}`}
                      >
                        <GreetingIcon className="h-5 w-5 text-white" />
                      </div>
                      <span
                        className={`bg-gradient-to-r ${greeting.gradient} bg-clip-text text-lg font-semibold text-transparent`}
                      >
                        {greeting.text}
                      </span>
                    </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                          {adminName} 👋
                        </h1>
                        <p className="mt-1 text-app-text-secondary">
                          Here&apos;s what&apos;s happening with your courses and content today.
                        </p>
                      </div>
                    </div>
                  </div>

          <div className="flex flex-col sm:items-end rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-4">
            <div className="flex items-center gap-2 text-white/50 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Current Time</span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-white">
              {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
            </p>
            <p className="text-xs text-white/50">
              {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={staggerWrap} initial="hidden" animate="show" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 h-[120px]" />
            ))
          : statCards.map((card, i) => (
              <motion.div key={i} variants={fadeUp} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm hover:border-white/10 transition-colors">
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/50">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold text-white">{card.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
      </motion.div>

      <motion.div variants={staggerWrap} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.path} className="block outline-none">
              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <div
                  className={`absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.18]`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50 flex-1">{item.desc}</p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/70 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                    {item.btnText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}