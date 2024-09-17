import { db } from "@/lib/db";
import Password from "antd/es/input/Password";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    // console.log("user data", body);
    const saltRounds = 15;

    const hashedPass = await bcrypt
      .hash(password, saltRounds)
      .then((hash: any) => {
        return hash;
      });
    const IsUserExist = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!IsUserExist) {
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPass,
        },
      });

      return NextResponse.json(
        { success: "Account created successfully!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("[SIGN_UP]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
