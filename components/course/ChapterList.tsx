"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Loader2, Edit, Trash2, Plus, GripVertical } from "lucide-react";
import { ChapterForm } from "./ChapterForm";
import type { Chapter } from "@/app/home/course/types";

interface ChapterListProps {
  courseId: number;
}

export function ChapterList({ courseId }: ChapterListProps) {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

  const { data: chapters = [], isLoading } = useQuery({
    queryKey: ["chapters", courseId],
    queryFn: async () => {
      const response = await api.get(`/chapter/${courseId}`, {
        params: { page: 1, limit: 100 },
      });
      return response.data.chapter || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (chapterId: number) => {
      const response = await api.delete(`/chapter/update/courseId/${courseId}/capterId/${chapterId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Chapter deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["chapters", courseId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete chapter");
    },
  });

  const handleDelete = (chapterId: number) => {
    if (confirm("Are you sure you want to delete this chapter?")) {
      deleteMutation.mutate(chapterId);
    }
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingChapter({
      ...chapter,
      videoUrl: chapter.videoUrl || undefined,
    });
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingChapter(null);
  };

  const sortedChapters = [...chapters].sort((a, b) => (a.sortingNo || 0) - (b.sortingNo || 0));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <div className="border border-slate-700 rounded-xl p-6">
        <ChapterForm
          courseId={courseId}
          initialData={editingChapter || undefined}
          onSuccess={handleFormClose}
          onCancel={handleFormClose}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Chapters</h3>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Chapter
        </button>
      </div>

      {sortedChapters.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p>No chapters yet. Add your first chapter to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedChapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-center gap-4 p-4 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="text-slate-500" size={20} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      {index + 1}.
                    </span>
                    <h4 className="text-white font-medium">{chapter.title}</h4>
                  </div>
                  {chapter.videoUrl && (
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {chapter.videoUrl}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(chapter)}
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Edit chapter"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(chapter.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Delete chapter"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
