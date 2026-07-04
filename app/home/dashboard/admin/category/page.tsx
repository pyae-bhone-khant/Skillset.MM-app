"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Boxes, Trash2, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react"
import DrawerDialogDemo from "./createDrawer"
import DrawerUpdateCategoryDialog from "./updateDrawer"
import DrawerDeleteCategoryDialog from "./DeleteDrawer"

export default function OtherCoursePage() { 
    const [page, setPage] = useState(1)
    const limit = 9 // Fits perfectly in a 3-column grid

    async function fetchCategories() {
        // Fetch everything at once since backend doesn't paginate
        const response = await api.get(`/admin/categories`)
        return response.data
    }

    const { data: categoriesData, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })

    // --- Client-Side Pagination Logic ---
    const { currentCategories, totalPages } = useMemo(() => {
        // Handle both possible backend structures (array or object with categories array)
        const allCategories = Array.isArray(categoriesData) 
            ? categoriesData 
            : categoriesData?.categories || []

        const totalItems = allCategories.length
        const totalPagesCalc = Math.max(Math.ceil(totalItems / limit), 1)

        // Ensure page doesn't exceed total pages (e.g., if items get deleted)
        const safePage = page > totalPagesCalc ? totalPagesCalc : page

        // Slice the array to get only the items for the current page
        const startIndex = (safePage - 1) * limit
        const endIndex = startIndex + limit
        
        return {
            currentCategories: allCategories.slice(startIndex, endIndex),
            totalPages: totalPagesCalc
        }
    }, [categoriesData, page, limit])

    return (
        <div className="mt-10 text-app-text-primary px-10 max-w-7xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b border-[#1A1C33] pb-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-app-accent-500 rounded-xl shadow-lg">
                        <Boxes className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-app-text-primary">Category Management</h1>
                        <h2 className="text-sm text-app-text-secondary">Manage categories for courses and resources</h2>
                    </div>
                </div>
                <DrawerDialogDemo />
            </div> 

            {/* Content Section */}
            <div className="w-full">
                
                {/* 1. Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-32 bg-[#0A0B1A] animate-pulse rounded-xl border border-[#1A1C33]"></div>
                        ))}
                    </div>
                )}
                
                {/* 2. Error State */}
                {isError && (
                    <div className="p-4 bg-[#451a1e]/30 border border-[#451a1e] rounded-xl text-[#f87171] text-sm flex items-center gap-3 mb-6">
                        <span className="font-bold">Error:</span> {error.message}
                    </div>
                )}
                
                {/* 3. Category Grid */}
                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentCategories.map((category: any) => (
                            <div 
                                key={category.id} 
                                className="group flex flex-col justify-between p-5 bg-[#0A0B1A] border border-[#1A1C33] rounded-xl hover:border-app-text-secondary transition-all shadow-sm hover:shadow-md"
                            >
                                {/* Card Top: Icon & Title */}
                                <div className="flex items-start gap-3 mb-5">
                                    <div className="p-2.5 bg-[#131526] border border-[#1A1C33] rounded-lg text-app-text-secondary group-hover:text-[#00b074] transition-colors">
                                        <LayoutGrid size={20} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-[17px] font-semibold text-app-text-primary tracking-wide line-clamp-1">
                                            {category.name}
                                        </h1>
                                        <p className="text-xs text-app-text-secondary mt-1">ID: {category.id}</p>
                                    </div>
                                </div>
                                
                                {/* Card Bottom: Action Buttons */}
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#1A1C33]">
                                    <DrawerUpdateCategoryDialog id={category.id} categoryName={category.name} />
                                   
                                    <DrawerDeleteCategoryDialog id={category.id} categoryName={category.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* 4. Empty State (No Categories Found) */}
                {!isLoading && !isError && currentCategories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#1A1C33] rounded-2xl text-app-text-secondary mt-6">
                        <div className="w-16 h-16 bg-[#0A0B1A] border border-[#1A1C33] flex items-center justify-center rounded-full mb-4">
                            <Boxes size={28} className="text-app-text-secondary" />
                        </div>
                        <h3 className="text-lg font-medium text-app-text-primary mb-1">No Categories Yet</h3>
                        <p className="text-sm">Click "Add Category" to create your first one.</p>
                    </div>
                )}

                {/* 5. Pagination Controls */}
                {!isLoading && !isError && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 border-t border-[#1A1C33] pt-6">
                        <p className="text-sm text-app-text-secondary">
                            Showing page <span className="font-medium text-app-text-primary">{page > totalPages ? totalPages : page}</span>
                            <span> of <span className="font-medium text-app-text-primary">{totalPages}</span></span>
                        </p>
                        
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                disabled={page === 1}
                                className="bg-[#131526] border-[#1A1C33] text-app-text-primary hover:bg-[#1A1C33] hover:text-white"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                            </Button>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
                                disabled={page >= totalPages}
                                className="bg-[#131526] border-[#1A1C33] text-app-text-primary hover:bg-[#1A1C33] hover:text-white"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}