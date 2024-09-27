import { db } from "@/lib/db";

interface getBlogProps {
  userId?: string;
  blogId?: string;
}
const getBlog = async ({ userId, blogId }: getBlogProps) => {
  const whereClause =
    userId && blogId
      ? { id: blogId, authorId: userId }
      : blogId
      ? { id: blogId }
      : {};
  try {
    const blog = await db.blog.findFirst({
      where: {
        ...whereClause,
      },
      include: {
        category: true,
        Image: true,
        author: {
          include: {
            profile: true,
          },
        },
        comments: {
          // select: { content: true, blogId: true, createdAt: true, id: true },
          orderBy: { createdAt: "desc" },
          include: {
            author: {
              // select: { name: true },
              include: {
                profile: {
                  select: {
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (blog)
      return {
        id: blog.id,
        author: {
          id: blog.authorId,
          name: blog.author.name,
          bio: blog.author.profile?.bio,
          imageUrl: blog.author.profile?.imageUrl,
        },
        title: blog.title,
        description: blog.description,
        categoryId: blog.categoryId,
        category: blog.category?.name,
        imageUrl: blog.Image?.imageUrl,
        publicId: blog.Image?.publicId,
        isPublished: blog.isPublished,
        comments: blog.comments,
        createdAt: blog.createdAt,
      };

    return {
      id: "",
      author: { id: "", name: "", bio: "", imageUrl: "" },
      title: "",
      description: "",
      categoryId: "",
      category: "",
      imageUrl: "",
      publicId: "",
      isPublished: false,
      comments: [],
      createdAt: new Date(Date.now()),
    };
  } catch (error) {
    console.log("GET_BLOG", error);
    return {
      id: "",
      author: { id: "", name: "", bio: "", imageUrl: "" },
      title: "",
      description: "",
      categoryId: "",
      category: "",
      imageUrl: "",
      publicId: "",
      isPublished: false,
      comments: [],
      createdAt: new Date(Date.now()),
    };
  }
};

export default getBlog;
