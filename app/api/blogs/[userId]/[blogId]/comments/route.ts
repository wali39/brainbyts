import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const { content } = await req.json();
    const { userId, blogId } = params;
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user)
      return NextResponse.json({ msg: "Invalid userId" }, { status: 401 });

    await db.comment.create({
      data: {
        content,
        authorId: userId,
        blogId,
      },
    });
    return NextResponse.json({ msg: "Comment created!" }, { status: 201 });
  } catch (error) {
    console.log("[COMMENT_POST]", error);
    return NextResponse.json({ msg: "Internal error" }, { status: 500 });
  }
}
