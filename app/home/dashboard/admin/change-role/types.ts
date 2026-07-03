export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type UserProfile = {
  fullName: string;
  avatarUrl: string | null;
};

export type User = {
  id: string;
  email: string;
  role: UserRole;
  updatedAt: string;
  profile: UserProfile;
};

export type GetAllUsersResponse = {
  success: boolean;
  message: string;
  user: User[];
  nextPage: number | null;
  previousPage: number | null;
};

export type ChangeRoleResponse = {
  success: boolean;
  message: string;
  RoleChaneUser: {
    id: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  };
};

export type DeleteUserResponse = {
  success: boolean;
  message: string;
};
