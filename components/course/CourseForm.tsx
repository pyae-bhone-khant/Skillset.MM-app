"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { Loader2, Save, X } from "lucide-react";

interface CourseFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: {
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    imageUrl?: string;
  };
}

export function CourseForm({ onSuccess, onCancel, initialData }: CourseFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/admin/categories");
      return response.data;
    },
  });

  const categories = categoriesData?.categories || [];

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post("/createCourse", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const response = await api.post(`/update/course/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) dataToSend.append(key, value);
    });

    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    if (initialData?.id) {
      updateMutation.mutate({ id: initialData.id, data: dataToSend });
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {initialData?.id ? "Update Course" : "Create New Course"}
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
            Course Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter course title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Enter course description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            required
            disabled={categoriesLoading}
          >
            <option value="">Select category</option>
            {categories.map((cat: { id: number; name: string }) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {categoriesLoading && (
            <p className="text-xs text-slate-500 mt-1">Loading categories...</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Course Image
          </label>
          <div className="space-y-3">
            {imagePreview && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isLoading ? "Saving..." : initialData?.id ? "Update Course" : "Create Course"}
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
