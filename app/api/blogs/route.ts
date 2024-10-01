import { db } from "@/lib/db";
import { Author, Blog, BlogImage } from "@/lib/types";
import { NextResponse } from "next/server";

type blogWithImages = Blog &
  BlogImage & {
    author: Author & {
      bio?: string | null;
    };
  };
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "2");
    const skip = (page - 1) * pageSize;
    const blogsByPage = await db.blog.findMany({
      where: { isPublished: true },
      skip: skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
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
    if (!blogsByPage.length) return NextResponse.json([]);
    const blogsCustomized: blogWithImages[] = await Promise.all(
      blogsByPage.map((blog) => {
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
    // console.log("blogs from api", blogsCustomized);
    const totalBlogs = await db.blog.count({
      where: {
        isPublished: true,
      },
    });
    return NextResponse.json({ blogsByPage: blogsCustomized, totalBlogs });
  } catch (error) {
    console.log("[BLOG_GET_API]", error);
    return NextResponse.json([]);
  }
}
