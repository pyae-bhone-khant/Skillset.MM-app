"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Blog, BlogDetailResponse } from "../types";

async function fetchBlogDetail(blogId: number): Promise<BlogDetailResponse> {
  const response = await api.get<BlogDetailResponse>(`/blog/${blogId}`);
  return response.data;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = Number(params.id);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlog() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchBlogDetail(blogId);
        setBlog(response.blog);
      } catch {
        setError("Unable to load this blog right now.");
      } finally {
        setIsLoading(false);
      }
    }

    if (!Number.isNaN(blogId)) {
      void loadBlog();
    }
  }, [blogId]);

  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/home/blogs" className="text-sm text-slate-400 hover:text-white">
          ← Back to blogs
        </Link>

        {isLoading && <p className="text-sm text-slate-400">Loading article...</p>}

        {error && <p className="text-sm text-rose-300">{error}</p>}

        {blog && (
          <article className="rounded-2xl border border-slate-800/60 p-6 sm:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-slate-700/60">
                  {blog.avatarUrl ? (
                    <AvatarImage src={blog.avatarUrl} alt={blog.fullName} />
                  ) : null}
                  <AvatarFallback>{getInitials(blog.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{blog.fullName}</p>
                  <p className="text-sm text-slate-400">{blog.category}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">{blog.updatedAt}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-[2.2rem]">
              {blog.title}
            </h1>
            <div className="prose prose-invert mt-8 max-w-none text-[15px] leading-8 text-slate-300 prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-white prose-p:my-4 prose-strong:text-white prose-ul:my-4 prose-li:my-1 sm:text-base">
              {blog.content}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
