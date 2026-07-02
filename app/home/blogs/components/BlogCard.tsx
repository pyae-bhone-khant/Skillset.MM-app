"use client";

import Link from "next/link";
import type { Blog } from "../types";

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*`_~\[\]()]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/home/blogs/${blog.id}`}
      className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-500/40"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {blog.category}
        </span>
        <span className="text-sm text-slate-500">{blog.updatedAt}</span>
      </div>

      <h2 className="text-xl font-semibold text-white">{blog.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {stripMarkdown(blog.content).slice(0, 170)}
        {stripMarkdown(blog.content).length > 170 ? "..." : ""}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-sm">
        <span className="text-slate-500">By {blog.fullName}</span>
        <span className="font-medium text-cyan-400 transition group-hover:text-cyan-300">
          Read more
        </span>
      </div>
    </Link>
  );
}
