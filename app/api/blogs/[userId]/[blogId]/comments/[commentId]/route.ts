import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; blogId: string; commentId: string } }
) {
  try {
    const { content } = await req.json();
    const { userId, blogId, commentId } = params;
    const userById = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!userById)
      return NextResponse.json({ msg: "Invalid userId" }, { status: 401 });
    const blogById = await db.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    if (!blogById)
      return NextResponse.json({ msg: "Invalid blogId" }, { status: 402 });
    const commentById = await db.comment.findFirst({
      where: {
        id: commentId,
        blogId: blogId,
      },
    });
    if (!commentById)
      return NextResponse.json({ msg: "Invalid commentId" }, { status: 402 });
    await db.comment.update({
      where: {
        id: commentId,
        blogId: blogId,
      },
      data: {
        content,
      },
    });
    return NextResponse.json({ msg: "Comment updated!" }, { status: 200 });
  } catch (error) {
    console.log("[COMMENT_PATCH]", error);
    return NextResponse.json({ msg: "Internal error" }, { status: 500 });
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { userId: string; blogId: string; commentId: string } }
) {
  try {
    const { userId, blogId, commentId } = params;
    const userById = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!userById)
      return NextResponse.json({ msg: "Invalid userId" }, { status: 401 });
    const blogById = await db.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    if (!blogById)
      return NextResponse.json({ msg: "Invalid blogId" }, { status: 401 });
    const commentById = await db.comment.findFirst({
      where: {
        id: commentId,
        blogId: blogId,
      },
    });
    if (!commentById)
      return NextResponse.json({ msg: "Invalid commentId" }, { status: 401 });

    await db.comment.delete({
      where: {
        id: commentId,
        blogId,
      },
    });
    return NextResponse.json({ msg: "Comment deleted !" }, { status: 200 });
  } catch (error) {
    console.log("[COMMENT_DELETE]", error);
    return NextResponse.json({ msg: "Internal error" }, { status: 500 });
  }
}
