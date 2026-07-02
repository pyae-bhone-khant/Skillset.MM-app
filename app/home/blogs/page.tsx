"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "@/lib/axios";
import { BlogCard } from "./components/BlogCard";
import type { Category, BlogsResponse } from "./types";

const BLOGS_URL = "/blogs/cursor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

async function fetchBlogsPage({
  pageParam,
  category,
}: {
  pageParam?: number | null;
  category: string;
}): Promise<BlogsResponse> {
  const params: Record<string, string | number> = {};

  if (pageParam !== undefined && pageParam !== null) {
    params.cursor = pageParam;
  }

  if (category !== "All") {
    params.category = category;
  }

  const response = await api.get<BlogsResponse>(BLOGS_URL, { params });
  return response.data;
}

function BlogsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const blogsQuery = useInfiniteQuery({
    queryKey: ["blogs", selectedCategory],
    queryFn: ({ pageParam }) =>
      fetchBlogsPage({ pageParam, category: selectedCategory }),
    initialPageParam: undefined as number | null | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage && lastPage.newCursor !== null
        ? lastPage.newCursor
        : undefined,
  });

  const categoryOptions = (() => {
    const options = new Map<string, Category>();

    blogsQuery.data?.pages.forEach((page) => {
      page.blogs.forEach((blog) => {
        if (!options.has(blog.category)) {
          options.set(blog.category, { id: blog.id, name: blog.category });
        }
      });
    });

    return Array.from(options.values());
  })();

  const visibleBlogs =
    blogsQuery.data?.pages.flatMap((page) => page.blogs).filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [blog.title, blog.content, blog.fullName, blog.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    }) ?? [];

  const isLoading = blogsQuery.isLoading;
  const isError = blogsQuery.isError;

  return (
    <div className="min-h-screen text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Insights & stories
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Our Blog</h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Browse fresh articles, explore topics, and discover ideas curated for
            our community.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <div className="mb-4">
            <label htmlFor="blog-search" className="mb-2 block text-sm text-slate-300">
              Search blogs
            </label>
            <input
              id="blog-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, content, or author"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedCategory === "All"
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All
            </button>
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === category.name
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {isLoading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">
            Loading articles...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-rose-300">
            We could not load the blogs right now. Please try again shortly.
          </div>
        )}

        {!isLoading && !isError && visibleBlogs.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-400">
            No articles found for this search or category yet.
          </div>
        )}

        {!isLoading && !isError && visibleBlogs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {blogsQuery.hasNextPage && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => void blogsQuery.fetchNextPage()}
              disabled={blogsQuery.isFetchingNextPage}
              className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {blogsQuery.isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogsPageContent />
    </QueryClientProvider>
  );
}
