import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import type {
  GetAllUsersResponse,
  ChangeRoleResponse,
  DeleteUserResponse,
  UserRole,
} from "./types";

const USERS_KEY = "admin-users";
const PAGE_SIZE = 6;

// ─── Fetch all users (paginated) ─────────────────────────────────
export function useUsers(page: number) {
  return useQuery<GetAllUsersResponse>({
    queryKey: [USERS_KEY, page],
    queryFn: async () => {
      const { data } = await api.get<GetAllUsersResponse>(
        "/admin/getAlluser",
        { params: { page, limit: PAGE_SIZE } }
      );
      return data;
    },
    placeholderData: (prev) => prev,
  });
}

// ─── Change user role ────────────────────────────────────────────
export function useChangeRole() {
  const qc = useQueryClient();

  return useMutation<ChangeRoleResponse, Error, { id: string; role: UserRole }>({
    mutationFn: async ({ id, role }) => {
      const { data } = await api.post<ChangeRoleResponse>(
        `/change-Role/${id}`,
        { role }
      );
      return data;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [USERS_KEY] });
      toast.success(res.message);
    },
    onError: () => {
      toast.error("Failed to change role");
    },
  });
}

// ─── Delete user ─────────────────────────────────────────────────
export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: async (id) => {
      const { data } = await api.delete<DeleteUserResponse>(
        `/delete-user/${id}`
      );
      return data;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [USERS_KEY] });
      toast.success(res.message);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
}
