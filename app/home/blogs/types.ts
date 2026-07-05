export type Blog = {
  id: string;
  title: string;
  content: string;
  category: string;
  fullName: string;
  avatar: string | null;
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
