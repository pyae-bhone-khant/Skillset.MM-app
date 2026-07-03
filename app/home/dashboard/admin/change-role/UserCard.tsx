"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Shield, ChevronDown, Loader2 } from "lucide-react";
import type { User, UserRole } from "./types";

const ROLES: UserRole[] = ["ADMIN", "TEACHER", "STUDENT"];

const ROLE_STYLES: Record<UserRole, { dot: string; badge: string }> = {
  ADMIN: {
    dot: "bg-rose-400",
    badge: "border-rose-500/30 text-rose-300 bg-rose-500/10",
  },
  TEACHER: {
    dot: "bg-amber-400",
    badge: "border-amber-500/30 text-amber-300 bg-amber-500/10",
  },
  STUDENT: {
    dot: "bg-emerald-400",
    badge: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
  },
};

type UserCardProps = {
  user: User;
  onChangeRole: (id: string, role: UserRole) => void;
  onDelete: (id: string) => void;
  isChangingRole: boolean;
  isDeleting: boolean;
};

export default function UserCard({
  user,
  onChangeRole,
  onDelete,
  isChangingRole,
  isDeleting,
}: UserCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const style = ROLE_STYLES[user.role];

  const handleRoleSelect = (role: UserRole) => {
    setShowDropdown(false);
    if (role !== user.role) {
      onChangeRole(user.id, role);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/10 ${showDropdown ? "z-30" : ""}`}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-600/5 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Avatar */}
        {user.profile.avatarUrl ? (
          <Image
            src={user.profile.avatarUrl}
            alt={user.profile.fullName}
            width={48}
            height={48}
            className="h-12 w-12 flex-shrink-0 rounded-xl object-cover ring-2 ring-white/10"
          />
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-white/10">
            <span className="text-lg font-bold text-white">
              {user.profile.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">
            {user.profile.fullName}
          </h3>
          <p className="mt-0.5 truncate text-xs text-white/40">{user.email}</p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {user.role}
            </span>
            <span className="text-[11px] text-white/25">
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-1.5">
          {/* Role dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              disabled={isChangingRole}
              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-white/15 hover:text-white disabled:opacity-50"
            >
              {isChangingRole ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Shield className="h-3.5 w-3.5" />
              )}
              <ChevronDown className="h-3 w-3" />
            </button>

            {showDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-full z-50 mt-1.5 w-32 overflow-hidden rounded-xl border border-white/[0.08] bg-[#151525] shadow-xl shadow-black/40">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/[0.06] ${
                        role === user.role
                          ? "text-blue-400"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${ROLE_STYLES[role].dot}`}
                      />
                      {role}
                      {role === user.role && (
                        <span className="ml-auto text-[10px] text-white/25">
                          current
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => onDelete(user.id)}
            disabled={isDeleting}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-1.5 text-white/40 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
