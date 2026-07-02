"use client";

import { useAuth } from "@/lib/authprovider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Layers,
  Users,
  FileText,
  ArrowRight,
  Clock,
  Sun,
  Moon,
  Sunrise,
} from "lucide-react";
import api from "@/lib/axios";
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────────────────────
interface DashboardStats {
  totalCourses: number;
  totalChapters: number;
  totalStudents: number;
  publishedBlogs: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────
function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12)
    return { text: "Good Morning", icon: Sunrise, gradient: "from-amber-400 to-orange-500" };
  if (hour >= 12 && hour < 17)
    return { text: "Good Afternoon", icon: Sun, gradient: "from-orange-400 to-rose-500" };
  return { text: "Good Evening", icon: Moon, gradient: "from-indigo-400 to-purple-500" };
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Stat Card ─────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      {/* Glow accent */}
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-app-text-secondary">{label}</p>
          <motion.p
            className="mt-2 text-4xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.2, type: "spring", bounce: 0.3 }}
          >
            {value}
          </motion.p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Action Card ───────────────────────────────────────────────────────
function ActionCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  gradient: string;
  delay: number;
}) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(href)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
    >
      {/* Background glow */}
      <div
        className={`absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.18]`}
      />

      <div className="relative z-10">
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-app-text-secondary">{description}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-app-accent-500 transition-all duration-300 group-hover:gap-3">
          View Now
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalChapters: 0,
    totalStudents: 0,
    publishedBlogs: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const [coursesRes, blogsRes] = await Promise.all([
          api.get("/courses/my-course").catch(() => null),
          api.get("/blogs/my-blog").catch(() => null),
        ]);

        const courses = coursesRes?.data?.data || coursesRes?.data || [];
        const blogs = blogsRes?.data?.data || blogsRes?.data || [];

        const courseList = Array.isArray(courses) ? courses : [];
        const blogList = Array.isArray(blogs) ? blogs : [];

        const totalChapters = courseList.reduce(
          (sum: number, c: { chapters?: unknown[] }) =>
            sum + (c.chapters?.length || 0),
          0
        );

        const totalStudents = courseList.reduce(
          (sum: number, c: { enrollments?: unknown[] }) =>
            sum + (c.enrollments?.length || 0),
          0
        );

        const publishedBlogs = blogList.filter(
          (b: { published?: boolean }) => b.published
        ).length;

        setStats({
          totalCourses: courseList.length,
          totalChapters,
          totalStudents,
          publishedBlogs,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const greeting = getGreeting(now.getHours());
  const GreetingIcon = greeting.icon;
  const teacherName = user?.profile?.fullName || "Teacher";

  const statCards = [
    {
      label: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      label: "Total Chapters",
      value: stats.totalChapters,
      icon: Layers,
      gradient: "from-violet-500 to-purple-400",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      label: "Published Blogs",
      value: stats.publishedBlogs,
      icon: FileText,
      gradient: "from-rose-500 to-pink-400",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10">
      {/* ── Header: Greeting + Clock ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-md sm:p-10"
      >
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
                  {teacherName} 👋
                </h1>
                <p className="mt-1 text-app-text-secondary">
                  Here&apos;s what&apos;s happening with your courses and content today.
                </p>
              </div>
            </div>
          </div>

          {/* Live clock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-start gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-4 sm:items-end"
          >
            <div className="flex items-center gap-2 text-app-text-secondary">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Current Time
              </span>
            </div>
            <p className="text-2xl font-bold tabular-nums tracking-wide text-white">
              {formatTime(now)}
            </p>
            <p className="text-xs text-app-text-secondary">{formatDate(now)}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Stats Grid ────────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
              >
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="mt-3 h-10 w-16 rounded bg-white/10" />
                <div className="mt-5 h-1 w-full rounded-full bg-white/[0.06]" />
              </div>
            ))
          : statCards.map((card, i) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                icon={card.icon}
                gradient={card.gradient}
                delay={i * 0.1}
              />
            ))}
      </div>

      {/* ── Action Cards ──────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ActionCard
          title="View My Courses"
          description="Manage your courses, add new chapters, track student enrollments, and monitor learning progress across all your content."
          icon={BookOpen}
          href="/home/dashboard/teacher/course"
          gradient="from-blue-500 to-cyan-400"
          delay={0.5}
        />
        <ActionCard
          title="View My Blogs"
          description="Create, edit, and publish blog posts to share your knowledge with the community and grow your audience."
          icon={FileText}
          href="/home/dashboard/teacher/my-blog"
          gradient="from-violet-500 to-purple-400"
          delay={0.6}
        />
      </div>
    </div>
  );
}
