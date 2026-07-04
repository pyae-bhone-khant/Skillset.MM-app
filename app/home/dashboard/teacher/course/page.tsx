"use client";

import { useState } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/app/api/query";
import { CourseForm } from "@/components/course/CourseForm";
import { ChapterList } from "@/components/course/ChapterList";
import type { Course } from "@/app/home/course/types";
import api from "@/lib/axios";

export default function CoursePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CoursePageContent />
    </QueryClientProvider>
  );
}

function CoursePageContent() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get("/course/owner/", {
        params: { page: 1, limit: 100 },
      });
      return response.data.course || [];
    },
  });

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowCreateForm(false);
  };

  const handleCreateNew = () => {
    setSelectedCourse(null);
    setShowCreateForm(true);
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setShowCreateForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Course Management</h1>
        {!showCreateForm && !selectedCourse && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Create New Course
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="border border-slate-700 rounded-xl p-6">
          <CourseForm
            onSuccess={handleBack}
            onCancel={handleBack}
          />
        </div>
      )}

      {selectedCourse && (
        <div className="space-y-6">
          <button
            onClick={handleBack}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to courses
          </button>
          
          <div className="border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">{selectedCourse.title}</h2>
            <ChapterList courseId={selectedCourse.id} />
          </div>
        </div>
      )}

      {!showCreateForm && !selectedCourse && (
        <div>
          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No courses yet. Create your first course to get started.
            </div>
          ) : (
            <div className="grid gap-4">
              {courses.map((course: Course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className="p-4 border border-slate-700 rounded-xl hover:border-slate-600 cursor-pointer transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{course.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-slate-500">{course.category}</span>
                    <span className="text-xs text-slate-500">{course.chapters?.length || 0} chapters</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
