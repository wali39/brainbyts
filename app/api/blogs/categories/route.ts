import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log("GET_CATEGORIES", error);
    return NextResponse.json({ msg: "Internal error" }, { status: 500 });
  }
}
