"use client"

import { BookMarked, ChevronLeft, ChevronRight, CalendarClock } from "lucide-react";
import PostDrawerUI from "./createBlogs";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateBlogsDialogUI from "./updateBlogs";
import DeleteBlogsDialog from "./deleteBlogs";

export default function BlogPage() {
    const [page, setPage] = useState(1);
    
    // CHANGED: Updated from 5 to 4 to display 4 blogs per page
    const limit = 4; 

    // 1. Fetch ALL blogs at once
    async function getOwnBlogs() {
        const res = await api.get("/blogs/owner");
        return res.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["blogs"], 
        queryFn: getOwnBlogs,
    });

    // 2. Client-Side Pagination Logic
    const allBlogs = data?.blogs || []; 
    
    // Calculate the total number of pages based on the total items
    const totalPages = Math.ceil(allBlogs.length / limit) || 1; 
    
    // Figure out which items to show for the current page
    const startIndex = (page - 1) * limit;
    const currentBlogs = allBlogs.slice(startIndex, startIndex + limit);

    return (
        <div className="container flex flex-col mt-10 px-4 md:px-10 mx-auto max-w-5xl">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex gap-4 items-center">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                        <BookMarked className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-white">Blogs Management</h1>
                        <p className="text-slate-400 text-sm">Manage and organize your blog posts</p>
                    </div>
                </div>
                <PostDrawerUI  />
            </div>

            {/* Blogs List */}
            <div className="mt-8 flex flex-col gap-4 min-h-[400px]">
                {isLoading ? (
                    <div className="text-slate-400 text-center py-10 flex-1 flex items-center justify-center">
                        Loading blogs...
                    </div>
                ) : allBlogs.length === 0 ? (
                    <div className="text-slate-400 text-center py-10 border border-dashed border-white/10 rounded-xl flex-1 flex items-center justify-center">
                        No blogs found. Create your first post!
                    </div>
                ) : (
                    currentBlogs.map((blog: any) => (
                        <div 
                            key={blog.id} 
                            className="group flex flex-col sm:flex-row justify-between gap-4 bg-[#010114] border border-white/10 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300"
                        >
                            {/* Blog Content */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                    {blog.content}
                                </p>
                                <div className="flex items-center text-xs text-slate-500 gap-4">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="w-4 h-4" />
                                        <span>{blog.updatedAt}</span>
                                    </div>
                                    <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                        {blog.category}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex sm:flex-col gap-2 justify-end sm:justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
                              <UpdateBlogsDialogUI  id={blog.id} title={blog.title} content={blog.content} category={blog.category} />
                              <DeleteBlogsDialog id={blog.id}  title={blog.title} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {allBlogs.length > 0 && (
                <div className="mt-8 flex justify-between items-center py-4 border-t border-white/10">
                    <Button 
                        variant="outline" 
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="bg-transparent border-white/10 text-white hover:bg-white/5 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>
                    
                    <span className="text-slate-400 text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>

                    <Button 
                        variant="outline" 
                        onClick={() => setPage((old) => old + 1)}
                        disabled={page >= totalPages}
                        className="bg-transparent border-white/10 text-white hover:bg-white/5 disabled:opacity-50"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
            
        </div>
    );
}