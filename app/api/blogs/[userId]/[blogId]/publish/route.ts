import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const { isPublished } = await req.json();
    const { userId, blogId } = params;
    const blogByUser = await db.blog.findFirst({
      where: {
        id: blogId,
        authorId: userId,
      },
    });
    if (blogByUser) {
      await db.blog.update({
        where: {
          id: blogId,
          authorId: userId,
        },
        data: {
          isPublished: isPublished,
        },
      });
      return NextResponse.json({ msg: "Blog published !" }, { status: 201 });
    }
    return NextResponse.json(
      { msg: "Invalid user or blog ID" },
      { status: 401 }
    );
  } catch (error) {
    console.log("[BLOG_PUBLISH]", error);
    return NextResponse.json({ msg: "Internal Error" }, { status: 500 });
  }
}
