"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/api/query";
import api from "@/lib/axios";
import type { CoursesResponse } from "../types";
import { CourseDetails } from "../components/CourseDetails";

export default function CourseDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CourseDetailPageContent />
    </QueryClientProvider>
  );
}

function CourseDetailPageContent() {
  const params = useParams();
  const courseId = Number(params.id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course-detail", courseId],
    queryFn: async () => {
      const response = await api.get<CoursesResponse>("/course", {
        params: { page: 1, limit: 100 },
      });

      return response.data.course ?? [];
    },
    enabled: !Number.isNaN(courseId),
  });

  const course = (data ?? []).find((item) => item.id === courseId) ?? null;

  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/home/course" className="text-sm text-slate-400 hover:text-white">
          ← Back to courses
        </Link>

        {isLoading && (
          <div className="rounded-2xl border border-slate-800/60 p-8 text-center text-slate-400">
            Loading course lessons...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-300">
            Unable to load this course right now.
          </div>
        )}

        {course && <CourseDetails course={course} />}
      </main>
    </div>
  );
}
