import { db } from "@/lib/db";

const getSearchedBlogs = async (title: string) => {
  try {
    const blogs = await db.blog.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    if (!blogs.length) return [];
    // if (blogs.length) {
    const blogsModified: {
      id: string;
      title: string;
      description: string | null;
    }[] = await Promise.all(
      blogs.map((blog) => {
        return {
          id: blog.id,
          title: blog.title,
          description: blog.description,
        };
      })
    );
    // }
    console.log("searched blogs", blogs);
    return blogsModified;
  } catch (error) {
    console.log("[GET_SEARCHED_BLOGS]", error);
    return [];
  }
};

export default getSearchedBlogs;
