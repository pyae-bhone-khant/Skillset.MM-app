"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Trophy,
  Clock,
  Zap,
  TrendingUp,
  Award,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

type Stat = {
  icon: LucideIcon;
  label: string;
  value: string;
  colorClass: string;
  bgClass: string;
};

type NavItem = {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  path: string;
  btnText: string;
  gradient: string;
};

const stats: Stat[] = [
  { icon: Zap, label: "Study Streak", value: "7 days", colorClass: "text-amber-400", bgClass: "bg-amber-500/10" },
  { icon: Clock, label: "Hours This Week", value: "12.5h", colorClass: "text-cyan-400", bgClass: "bg-cyan-500/10" },
  { icon: Award, label: "Certificates", value: "3", colorClass: "text-emerald-400", bgClass: "bg-emerald-500/10" },
  { icon: TrendingUp, label: "Overall Score", value: "87%", colorClass: "text-violet-400", bgClass: "bg-violet-500/10" },
];

const exploreItems: NavItem[] = [
  {
    id: "courses",
    title: "Courses",
    desc: "Level up your skills with our curated programming and design courses.",
    icon: BookOpen,
    path: "/home/course",
    btnText: "Explore Courses",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    id: "tests",
    title: "Level Tests",
    desc: "Test your knowledge and earn verified certificates to build your portfolio.",
    icon: Trophy,
    path: "/home/level-test",
    btnText: "Take Assessment",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "blogs",
    title: "Community Blogs",
    desc: "Stay updated with the latest tech trends, tutorials, and community insights.",
    icon: FileText,
    path: "/home/blogs",
    btnText: "Read Articles",
    gradient: "from-pink-500 to-rose-500",
  },
];

const staggerWrap: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Overview() {
  return (
    <div className="py-8 w-full max-w-6xl mx-auto">
      <motion.div
        variants={staggerWrap}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-center gap-3 p-4 bg-[#151525]/60 backdrop-blur-sm border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl ${s.bgClass} flex items-center justify-center shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.colorClass}`} />
            </div>
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</p>
              <p className="text-lg font-bold text-white font-sans">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 font-sans">
          Where to next?
        </h2>
        <p className="text-sm text-white/50">
          Choose a section below to continue your learning journey.
        </p>
      </div>

      <motion.div
        variants={staggerWrap}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {exploreItems.map((item) => {
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