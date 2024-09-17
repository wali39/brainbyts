import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { title } = await req.json();
    const userById = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });
    if (!userById)
      return NextResponse.json({ error: "Invalid user!" }, { status: 401 });

    const blog = await db.blog.create({
      data: {
        authorId: userById.id,
        title,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.log("[BLOG_CREATE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
