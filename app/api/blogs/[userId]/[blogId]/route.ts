import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  const { userId, blogId } = params;
  try {
    const userById = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userById) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    const blogByUser = await db.blog.findUnique({
      where: {
        id: blogId,
        authorId: userId,
      },
      include: {
        author: true,
        Image: true,
        category: true,
      },
    });

    if (!blogByUser)
      return NextResponse.json({ error: "Invalid blogId" }, { status: 401 });

    return NextResponse.json(blogByUser, { status: 200 });
  } catch (error) {
    console.log("GET_BLOG", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  const { userId, blogId } = params;
  try {
    const userById = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userById) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    const blogByUser = await db.blog.findFirst({
      where: {
        id: blogId,
        authorId: userId,
      },
    });

    if (!blogByUser)
      return NextResponse.json({ error: "Invalid blogId" }, { status: 401 });
    await db.blog.delete({
      where: {
        id: blogId,
        authorId: userId,
      },
    });
    return NextResponse.json({ success: "Blog deleted!" }, { status: 200 });
  } catch (error) {
    console.log("DELETE_BLOG", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const { imageUrl, publicId, ...values } = await req.json();

    console.log("params", params);
    console.log("blog patch", values.title);
    return NextResponse.json(values);

    // const blogByUser = await db.blog.findFirst({
    //   where: {
    //     id: params.blogId,
    //     authorId: params.userId,
    //   },
    // });
    // if (!blogByUser)
    //   return NextResponse.json(
    //     { error: "No blog found by user!" },
    //     { status: 401 }
    //   );

    // await db.blog.update({
    //   where: {
    //     id: params.blogId,
    //     authorId: params.userId,
    //   },
    //   data: {
    //     ...values,
    //   },
    // });
    // if (imageUrl && publicId) {
    //   const imageByBlogId = await db.image.findFirst({
    //     where: {
    //       blogId: params.blogId,
    //     },
    //   });

    //   imageByBlogId &&
    //     (await db.blog.update({
    //       where: {
    //         id: params.blogId,
    //         authorId: params.userId,
    //       },
    //       data: {
    //         Image: {
    //           update: {
    //             data: {
    //               publicId,
    //               imageUrl,
    //             },
    //           },
    //         },
    //       },
    //     }));
    //   !imageByBlogId &&
    //     (await db.blog.update({
    //       where: {
    //         authorId: params.userId,
    //         id: params.blogId,
    //       },
    //       data: {
    //         Image: {
    //           create: {
    //             publicId,
    //             imageUrl,
    //           },
    //         },
    //       },
    //     }));
    // }
  } catch (error) {
    console.log("[CREATE_BLOG]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
