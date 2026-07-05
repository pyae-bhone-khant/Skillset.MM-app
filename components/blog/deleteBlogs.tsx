"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import api from "@/lib/axios";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteBlogsDialogProps {
  id: string;
  title: string;
}

export default function DeleteBlogsDialog({
  id,
  title,
}: DeleteBlogsDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const queryClient = useQueryClient();

  async function deleteCategory() {
    const res = await api.delete(`/blog/${id}`);
    toast.success("Blog deleted successfully");
    return res.data;
  }

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setOpen(false);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  // The red trigger button from your main page
  const TriggerButton = (
    <Button
      variant="outline"
      size="sm"
      className="border-white/10 bg-transparent text-white cursor-pointer hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 w-full sm:w-auto justify-start"
    >
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#0A0B1A] border-[#1A1C33] text-app-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-app-text-primary flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-[#f87171]" />
              Delete Blog
            </DialogTitle>
            <DialogDescription className="text-app-text-secondary pt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">"{title}"</span>
              ? This action cannot be undone and will permanently remove it from
              the system.
            </DialogDescription>
          </DialogHeader>

          <ActionButtons
            onCancel={() => setOpen(false)}
            onDelete={handleDelete}
            isLoading={mutation.isPending}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="bg-[#0A0B1A] border-[#1A1C33] text-app-text-primary">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-bold text-app-text-primary flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-[#f87171]" />
            Delete Blog
          </DrawerTitle>
          <DrawerDescription className="text-app-text-secondary pt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">"{title}"</span>?
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 mb-6">
          <ActionButtons
            onCancel={() => setOpen(false)}
            onDelete={handleDelete}
            isLoading={mutation.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ActionButtonsProps {
  onCancel: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

function ActionButtons({ onCancel, onDelete, isLoading }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-3 w-full mt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 bg-transparent border-[#1A1C33] text-app-text-primary hover:bg-[#131526] hover:text-white"
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onDelete}
        disabled={isLoading}
        className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? "Deleting..." : "Yes, delete"}
      </Button>
    </div>
  );
}
