"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import api from "@/lib/axios";
import type { Course, Chapter, ChaptersResponse } from "../types";

function Avatar({
  avatarUrl,
  name,
}: {
  avatarUrl?: string | null;
  name: string;
}) {
  if (avatarUrl) {
    return (
      <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-700">
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const initials = name
    ?.split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-950 text-cyan-400 font-semibold">
      {initials || "TR"}
    </div>
  );
}

export function CourseDetails({ course }: { course: Course }) {
  const {
    data: chapters = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chapters", course.id],
    queryFn: async () => {
      const response = await api.get<ChaptersResponse>(
        `/chapter/${course.id}`,
        {
          params: { page: 1, limit: 100 },
        }
      );

      return response.data.chapter || [];
    },
    enabled: !!course.id,
  });

  const sortedChapters = useMemo(() => {
    return [...chapters].sort(
      (a, b) => (a.sortingNo ?? 0) - (b.sortingNo ?? 0)
    );
  }, [chapters]);

  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(
    null
  );



  const selectedChapter = useMemo(() => {
    if (!sortedChapters.length) return null;

    return (
      sortedChapters.find(
        (chapter) => chapter.id === selectedChapterId
      ) || sortedChapters[0]
    );
  }, [sortedChapters, selectedChapterId]);

  const isValidVideo =
    selectedChapter?.videoUrl?.startsWith("http");

  return (
    <>
      {/* <style>{`
        @keyframes scroll-title {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style> */}
      <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Easy learning with video
        </p>

        <div className="overflow-hidden">
          <h2
            className="text-3xl font-bold text-white whitespace-nowrap inline-block"
            // style={{
            //   animation: "scroll-title 10s linear infinite",
            // }}
          >
            {course.title}
            {/* <span className="mx-16">{course.title}</span> */}
          </h2>
        </div>

        <p className="text-slate-400">
          {course.description}
        </p>
      </div>

      {isLoading && (
        <p className="text-slate-400">
          Loading lessons...
        </p>
      )}

      {isError && (
        <p className="text-rose-400">
          Failed to load lessons.
        </p>
      )}

      {!isLoading && !isError && sortedChapters.length === 0 && (
        <div className="rounded-xl border border-slate-800 p-6 text-slate-400">
          No lessons found for this course.
        </div>
      )}

      {!isLoading && !isError && sortedChapters.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
            {sortedChapters.map((chapter, index) => {
              const active =
                selectedChapter?.id === chapter.id;

              return (
                <button
                  key={chapter.id}
                  onClick={() =>
                    setSelectedChapterId(chapter.id)
                  }
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <h4 className="font-medium text-white">
                    {chapter.title}
                  </h4>

                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                    Lesson {index + 1}
                  </p>
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            {selectedChapter && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedChapter.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-3">
                    <Avatar
                      avatarUrl={course.avatarUrl}
                      name={course.fullName}
                    />

                    <div>
                      <p className="text-xs text-slate-500">
                        Instructor
                      </p>

                      <p className="text-sm text-slate-200">
                        {course.fullName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video overflow-hidden rounded-xl border border-slate-800 bg-black">
                  {isValidVideo && selectedChapter.videoUrl ? (
                    <ReactPlayer
                      src={selectedChapter.videoUrl}
                      width="100%"
                      height="100%"
                      controls
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      Video URL not available
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
    </>
  );
}