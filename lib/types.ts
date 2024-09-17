export type User = {
  name?: string;
  email?: string;
  role?: string;
};
export type Profile = {
  bio?: string;
  imageUrl?: string;
  publicId?: string;
};
export type Blog = {
  title: string;
  description: string;
  imageId: string;
  authorId: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
export type Category = {
  name: string;
};

export type BlogComment = {
  content: string;
  authorId: string;
  blogId: string;
};
