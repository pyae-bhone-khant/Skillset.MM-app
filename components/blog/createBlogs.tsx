"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueries } from "@tanstack/react-query"
import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"



export default function PostDialogUI(){
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const queryClient = useQueryClient()

  async function getCategory() {
    const response = await api.get("/admin/categories");
    const data = response.data;
    return data;
  } 

  const [{ data, isLoading, isError }] = useQueries({
    queries: [
      {
        queryKey: ["category"],
        queryFn: getCategory,
      },
    ],
  }) 

  async function createBlog() {
    const response = await api.post("/blogs/create", {
      title: title,
      content: content,
      category: category,
    });
    const data = response.data;
    return data;
  } 

  const  {mutate , isPending , isError: mutationError} = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      setIsDialogOpen(false);
      setTitle("");
      setContent("");
      setCategory("");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  })

  return ( 
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 text-app-bg hover:bg-cyan-400 cursor-pointer">
          Create New Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#010114] border-white/10 text-white max-w-md w-[calc(100%-2rem)] rounded-xl sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Create a New Post</DialogTitle>
          <DialogDescription className="text-slate-400">
            Fill in the details below. Category is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300">Title</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title" 
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50" 
            />
          </div>

          {/* Body Textarea */}
          <div className="space-y-2">
            <Label htmlFor="body" className="text-slate-300">Body</Label>
            <Textarea 
              id="body" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..." 
              className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50" 
            />
          </div>

          {/* Category Select (ဒီအပိုင်းကို အသစ်ပြင်ပေးထားပါတယ်) */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300">Category</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-cyan-500/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              
              {/* နောက်ခံအမှောင်ရောင်၊ စာသားအဖြူရောင်နဲ့ Dialog အပေါ်မှာ ပေါ်အောင် z-[100] ထည့်ထားပါတယ် */}
              <SelectContent className="bg-[#010114] border-white/10 text-white z-[100]">
                
                {/* ၁။ API ကနေ Data ဆွဲနေတုန်း Loading ပြပေးမယ် */}
                {isLoading && (
                  <div className="p-2 text-sm text-slate-400 text-center">Loading categories...</div>
                )}
                
                {/* ၂။ အကယ်၍ API Fetch တက်ရင် Error ပြပေးမယ် */}
                {isError && (
                  <div className="p-2 text-sm text-red-400 text-center">Failed to load data</div>
                )}
                
                {/* ၃။ Data ကျလာပေမဲ့ Array ထဲမှာ ဘာမှမရှိရင် No categories ပြပေးမယ် */}
                {!isLoading && !isError && data?.categories?.length === 0 && (
                  <div className="p-2 text-sm text-slate-400 text-center">No categories found</div>
                )}

                {/* ၄။ Data ပုံမှန်ကျလာရင် လုပ်ဆောင်မယ့် Loop */}
                {data?.categories?.map((category: any) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.name}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {category.name}
                  </SelectItem>
                ))}
                
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => mutate()} disabled={isPending} className="bg-cyan-500 text-app-bg hover:bg-cyan-400">
            {isPending ? "Submitting..." : "Submit Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}