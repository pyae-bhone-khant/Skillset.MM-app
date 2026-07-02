export type Blog = {
  id: number;
  title: string;
  content: string;
  category: string;
  fullName: string;
  avatarUrl?: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
};

export type BlogsResponse = {
  message: string;
  blogs: Blog[];
  nextPage: boolean;
  newCursor: number | null;
};

export type BlogDetailResponse = {
  message: string;
  blog: Blog;
};
