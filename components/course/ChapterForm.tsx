"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Loader2, Save, X } from "lucide-react";

interface ChapterFormProps {
  courseId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: {
    id?: number;
    title?: string;
    videoUrl?: string | null;
    sortingNo?: number;
  };
}

export function ChapterForm({ courseId, onSuccess, onCancel, initialData }: ChapterFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    videoUrl: initialData?.videoUrl || "",
    sortingNo: initialData?.sortingNo || 1,
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; videoUrl: string; sortingNo: number }) => {
      const response = await api.post(`/chapter/create/${courseId}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Chapter created successfully");
      queryClient.invalidateQueries({ queryKey: ["chapters", courseId] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create chapter");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ chapterId, data }: { chapterId: number; data: { title: string; videoUrl: string; sortingNo: number } }) => {
      const response = await api.post(`/chapter/update/courseId/${courseId}/capterId/${chapterId}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Chapter updated successfully");
      queryClient.invalidateQueries({ queryKey: ["chapters", courseId] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update chapter");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = {
      title: formData.title,
      videoUrl: formData.videoUrl,
      sortingNo: formData.sortingNo,
    };

    if (initialData?.id) {
      updateMutation.mutate({ chapterId: initialData.id, data: dataToSend });
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {initialData?.id ? "Update Chapter" : "Add New Chapter"}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Chapter Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter chapter title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Video URL
          </label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="https://www.youtube.com/embed/..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Sort Order
          </label>
          <input
            type="number"
            value={formData.sortingNo}
            onChange={(e) => setFormData({ ...formData, sortingNo: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="1"
            min="1"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isLoading ? "Saving..." : initialData?.id ? "Update Chapter" : "Add Chapter"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
