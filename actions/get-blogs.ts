import { db } from "@/lib/db";
import { Author, Blog, BlogImage } from "@/lib/types";
type blogWithImages = Blog &
  BlogImage & {
    author: Author & {
      bio?: string | null;
    };
  };

interface getBlogProps {
  authorId?: string;
  categoryId?: string;
}
const getBlogs = async ({
  authorId,
  categoryId,
}: getBlogProps): Promise<blogWithImages[]> => {
  try {
    const whereClause = authorId
      ? { authorId: authorId }
      : categoryId
      ? { categoryId: categoryId }
      : {};

    const blogs = await db.blog.findMany({
      where: {
        ...whereClause,
        isPublished: true,
      },

      include: {
        category: true,
        Image: true,
        author: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!blogs.length) return [];
    const blogCustomized: blogWithImages[] = await Promise.all(
      blogs.map((blog) => {
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
          createdAt: blog.createdAt,
        };
      })
    );
    return blogCustomized;
  } catch (error) {
    console.log("GET_BLOGS", error);
    return [];
  }
};

export default getBlogs;
