import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: params.userId,
      },
      include: {
        profile: true,
      },
    });
    if (user) {
      return NextResponse.json({
        name: user.name || "",
        email: user.email,
        role: user.role,
        bio: user.profile?.bio || "",
        imageUrl: user.profile?.imageUrl || "",
        publicId: user.profile?.publicId || "",
      });
    }
    return NextResponse.json({
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
      publicId: "",
    });
  } catch (error) {
    console.log("GET_USER", error);
    return NextResponse.json({
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
      publicId: "",
    });
  }
}
