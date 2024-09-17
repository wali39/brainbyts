import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
export async function POST(req: Request) {
  try {
    // const { title, description, imageUrl, authorId, categoryId } =
    //   await req.json();
    const { public_id } = await req.json();
    console.log("publicid", public_id);
    cloudinary.uploader
      .destroy(public_id)
      .then((result: any) => console.log("resultscu", result));

    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
