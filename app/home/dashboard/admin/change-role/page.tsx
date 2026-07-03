"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/api/query";
import { AnimatePresence, motion } from "framer-motion";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { useUsers, useChangeRole, useDeleteUser } from "./hooks";
import type { UserRole } from "./types";
import UserCard from "./UserCard";

export default function ChangeRolePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChangeRoleContent />
    </QueryClientProvider>
  );
}

function ChangeRoleContent() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUsers(page);
  const changeRole = useChangeRole();
  const deleteUser = useDeleteUser();

  const users = data?.user ?? [];
  const hasNext = data?.nextPage !== null && data?.nextPage !== undefined;
  const hasPrev = data?.previousPage !== null && data?.previousPage !== undefined;

  const handleChangeRole = (id: string, role: UserRole) => {
    changeRole.mutate(
      { id, role },
      {
        onSuccess: (res) => toast.success(res.message),
        onError: () => toast.error("Failed to change role"),
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: (res) => toast.success(res.message),
      onError: () => toast.error("Failed to delete user"),
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-sm text-white/40">
            Manage roles and permissions for all users
          </p>
        </div>
      </motion.div>

      {/* Loading */}
      {isLoading && !data && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[100px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-8 text-center text-sm text-rose-300">
          Failed to load users. Please try again.
        </div>
      )}

      {/* Users grid */}
      {!isLoading && !isError && users.length === 0 && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-center text-sm text-white/40">
          No users found.
        </div>
      )}

      {users.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onChangeRole={handleChangeRole}
                  onDelete={handleDelete}
                  isChangingRole={
                    changeRole.isPending &&
                    changeRole.variables?.id === user.id
                  }
                  isDeleting={
                    deleteUser.isPending &&
                    deleteUser.variables === user.id
                  }
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-all hover:border-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="rounded-full bg-white/[0.06] px-4 py-1.5 text-sm font-semibold text-blue-400 tabular-nums">
              Page {page}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60 transition-all hover:border-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
