"use client";

import Image from "next/image";
import Link from "next/link";
import type { Course } from "../types";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function CourseCard({
  course,
}: {
  course: Course;
}) {
  return (
    <Link
      href={`/home/course/${course.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition hover:-translate-y-1 hover:border-slate-700"
    >
      <div className="relative h-40 w-full">
        <Image
          src={course.imageUrl || "/placeholder.png"}
          alt={course.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {course.category}
          </span>

          <span className="text-xs text-slate-500">
            {course.updatedAt}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {course.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-slate-400">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200">
              {course.avatarUrl ? (
                <Image
                  src={course.avatarUrl}
                  alt={course.fullName}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                getInitials(course.fullName)
              )}
            </div>

            <span className="text-sm text-slate-400">
              {course.fullName}
            </span>
          </div>

          <span className="text-sm text-slate-300 group-hover:text-white">
            View Lessons →
          </span>
        </div>
      </div>
    </Link>
  );
}