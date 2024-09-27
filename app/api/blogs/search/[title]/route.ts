import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { title: string } }
) {
  try {
    const blogs = await db.blog.findMany({
      where: {
        title: {
          contains: params.title,
          mode: "insensitive",
        },
      },
      include: {
        Image: true,
      },
    });
    console.log("blogs from backend", blogs);
    if (!blogs.length) return NextResponse.json([]);
    // if (blogs.length) {
    const blogsModified: {
      id: string;
      title: string;
      description: string | null;
      imageUrl?: string;
    }[] = await Promise.all(
      blogs.map((blog) => {
        return {
          id: blog.id,
          title: blog.title,
          description: blog.description,
          imageUrl: blog.Image?.imageUrl,
        };
      })
    );
    // }
    return NextResponse.json(blogsModified);
  } catch (error) {
    console.log("[GET_SEARCHED_BLOGS]", error);
    return NextResponse.json({ msg: "Internal error" }, { status: 500 });
  }
}
