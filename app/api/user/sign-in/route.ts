import { db } from "@/lib/db";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const IsUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (IsUser) {
      const IsPassMatch = await bcrypt
        .compare(password, IsUser.password)
        .then((result: any) => {
          return result;
        });

      if (IsPassMatch) {
        return NextResponse.json({ user: IsUser }, { status: 200 });
      }

      return NextResponse.json({ error: "Wrong password!" }, { status: 200 });
    }
    return NextResponse.json({ error: "User not exist!" }, { status: 200 });
  } catch (error) {
    console.log("[SIGN_IN]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
