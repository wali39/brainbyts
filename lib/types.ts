export type User = {
  name?: string;
  email?: string;
  role?: string;
};
export type Author = {
  id: string;
  name: string | null;
  imageUrl?: string | null;
};
export type Profile = {
  bio?: string;
  imageUrl?: string;
  publicId?: string;
};
export type Blog = {
  id: string;
  title: string;
  description: string | null;
  category?: string;
  createdAt: Date;
};
export type BlogImage = {
  imageUrl: string | undefined;
  publicId: string | undefined;
};
export type Category = {
  name: string;
};

export type BlogComment = {
  content: string;
  authorId: string;
  blogId: string;
};
