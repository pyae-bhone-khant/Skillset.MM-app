export type Chapter = {
  id: number;
  title?: string;
  name?: string;
  lessonTitle?: string;
  chapterTitle?: string;
  chapterName?: string;
  videoUrl?: string | null;
  sortingNo?: number;
  fullName?: string | null;
  avatarUrl?: string | null;
  teacherName?: string | null;
  teacherBy?: string | null;
  teacherAvatarUrl?: string | null;
  teacher?: {
    fullName?: string | null;
    name?: string | null;
    avatarUrl?: string | null;
    avatar?: string | null;
  } | null;
  createdBy?: {
    fullName?: string | null;
    name?: string | null;
    avatarUrl?: string | null;
    avatar?: string | null;
  } | null;
  updatedAt?: string;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  fullName: string;
  avatarUrl?: string | null;
  chapters: Chapter[];
  updatedAt: string;
};

export type CoursesResponse = {
  message: string;
  course: Course[];
  nextPage: number | null;
  previousPage: number | null;
};

export type ChaptersResponse = {
  message: string;
  chapter: Chapter[];
  nextPage: number | null;
  previousPage: number | null;
};

export type CategoriesResponse = {
  message?: string;
  categories?: Array<{ id: number; name: string }>;
  data?: Array<{ id: number; name: string }>;
  [key: string]: unknown;
};
