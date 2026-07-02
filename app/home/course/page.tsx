"use client";

import { useMemo, useState } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/api/query";
import api from "@/lib/axios";
import { CourseCard } from "./components/CourseCard";
import type { CoursesResponse } from "./types";

const COURSES_URL = "/course";
const PAGE_SIZE = 8;

export default function CoursePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CoursePageContent />
    </QueryClientProvider>
  );
}

function CoursePageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", page],
    queryFn: async () => {
      const response = await api.get<CoursesResponse>(COURSES_URL, {
        params: { page, limit: PAGE_SIZE },
      });

      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const courses = useMemo(() => data?.course ?? [], [data?.course]);
  const nextPage = data?.nextPage ?? null;

  const categories = useMemo(
    () => Array.from(new Set(courses.map((course) => course.category).filter(Boolean))),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        query.length === 0 ||
        [course.title, course.description, course.category, course.fullName]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [courses, searchTerm, selectedCategory]);

  const loading = isLoading && !data;
  const hasNextPage = nextPage !== null;

  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Learn & grow
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Courses</h1>
          <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
            Explore curated lessons, discover fresh topics, and dive into detailed course content.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800/60 p-4">
          <div className="mb-4">
            <label htmlFor="course-search" className="mb-2 block text-sm text-slate-300">
              Search courses
            </label>
            <input
              id="course-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, category, or teacher"
              className="w-full rounded-xl border border-slate-700/60 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedCategory === "All"
                  ? "bg-white text-slate-950"
                  : "bg-slate-900/70 text-slate-300 hover:bg-slate-800"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === category
                    ? "bg-white text-slate-950"
                    : "bg-slate-900/70 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {loading && (
          <div className="rounded-2xl border border-slate-800/60 p-8 text-center text-slate-400">
            Loading courses...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-300">
            Unable to load courses right now.
          </div>
        )}

        {!loading && !isError && filteredCourses.length === 0 && (
          <div className="rounded-2xl border border-slate-800/60 p-8 text-center text-slate-400">
            No courses found for this search or category yet.
          </div>
        )}

        {!loading && !isError && filteredCourses.length > 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="rounded-full bg-slate-900/70 px-3 py-1.5 text-sm font-medium text-cyan-300">
                Page {page}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={!hasNextPage}
                className="rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}