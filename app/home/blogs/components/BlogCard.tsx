import Link from "next/link";
import type { Blog } from "../types";

function stripMarkdown(markdown: string) {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/[#>*`_~\[\]()]/g, "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/home/blogs/${blog.id}`}
      className="group flex flex-col rounded-2xl border border-white/5 bg-[#010114] p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-cyan-950/20"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          {blog.category}
        </span>
        <span className="text-xs text-slate-500">{blog.updatedAt}</span>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold text-white mb-3 leading-tight transition-colors group-hover:text-cyan-200">
          {blog.title}
        </h2>
        <p className="text-sm text-slate-400/90 leading-relaxed mb-6">
          {stripMarkdown(blog.content).slice(0, 160)}...
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
        <div className="flex items-center gap-2.5">
          {blog.avatar ? (
            <img src={blog.avatar} alt={blog.fullName} className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-[10px] font-bold text-slate-300">
              {blog.fullName.charAt(0)}
            </div>
          )}
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{blog.fullName}</span>
        </div>
        
        <span className="text-xs font-semibold text-cyan-400 opacity-60 transition-opacity group-hover:opacity-100 flex items-center gap-1">
          Read article &rarr;
        </span>
      </div>
    </Link>
  );
}