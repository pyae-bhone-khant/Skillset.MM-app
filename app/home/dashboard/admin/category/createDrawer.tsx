"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"
import { Plus, Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const queryClient = useQueryClient()
  const [categoryName, setCategoryName] = React.useState("")

  async function crrateCategoty (name: string) {
    const res = await api.post("/admin/create-category", { name })
    toast.success("Category created successfully")
    return res.data
  }

  // Category အသစ်ဆောက်ဖို့ API Mutation
  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await crrateCategoty(name)
      return res
    },
    onSuccess: () => {
      // ဆောက်ပြီးတာနဲ့ page.tsx က list ကို ချက်ချင်း automatic refresh လုပ်ခိုင်းတာ
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      setCategoryName("")
      setOpen(false)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim()) return
    mutation.mutate(categoryName)
  }

  // မင်းရဲ့ မူရင်း စိမ်းရောင် Add Button ပုံစံအတိုင်း trigger လုပ်ပေးထားတယ်
  const TriggerButton = (
    <Button className="bg-[#00b074] hover:bg-[#00905f] text-white gap-2 rounded-lg px-4 py-2 flex items-center transition-all shadow-md">
      <Plus size={18} strokeWidth={2.5} />
      Add Category
    </Button>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {TriggerButton}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#0A0B1A] border-[#1A1C33] text-app-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-app-text-primary">Create Category</DialogTitle>
            <DialogDescription className="text-app-text-secondary">
              Add a new category grouping for your courses and resources.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm 
            value={categoryName} 
            onChange={setCategoryName} 
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {TriggerButton}
      </DrawerTrigger>
      <DrawerContent className="bg-[#0A0B1A] border-[#1A1C33] text-app-text-primary">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-bold text-app-text-primary">Create Category</DrawerTitle>
          <DrawerDescription className="text-app-text-secondary">
            Add a new category grouping for your courses and resources.
          </DrawerDescription>
        </DrawerHeader>
        <CategoryForm 
          className="p-4 mb-6" 
          value={categoryName} 
          onChange={setCategoryName} 
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
        />
      </DrawerContent>
    </Drawer>
  )
}

interface CategoryFormProps extends Omit<React.ComponentProps<"form">, "onChange" | "onSubmit"> {
  value: string
  onChange: (val: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

function CategoryForm({ className, value, onChange, onSubmit, isLoading }: CategoryFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="category-name" className="text-sm font-medium text-app-text-primary">
          Category Name
        </Label>
        <Input 
          type="text" 
          id="category-name" 
          placeholder="e.g., Development, Design..." 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          className="bg-[#131526] border-[#1A1C33] text-app-text-primary placeholder:text-app-text-secondary/40 focus-visible:ring-[#00b074] focus-visible:border-[#00b074]"
          required
          autoComplete="off"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !value.trim()}
        className="bg-[#00b074] hover:bg-[#00905f] text-white flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? "Creating..." : "Save Category"}
      </Button>
    </form>
  )
}