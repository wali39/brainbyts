// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const { bio, imageId, ...values } = await req.json();

//     const userById = await db.user.findFirst({
//       where: {
//         id: params.userId,
//       },
//     });
//     if (userById) {
//       await db.user.update({
//         where: { id: params.userId },
//         data: {
//           ...values,
//         },
//       });
//       return NextResponse.json(
//         { success: "Username updated!" },
//         { status: 200 }
//       );
//     }
//     if (bio || imageId) {
//       const profileByUser = await db.profile.findFirst({
//         where: {
//           userId: params.userId,
//         },
//       });

//       if (profileByUser) {
//         bio &&
//           (await db.profile.update({
//             where: {
//               userId: params.userId,
//             },
//             data: {
//               bio,
//             },
//           }));
//         imageId &&
//           (await db.profile.update({
//             where: {
//               userId: params.userId,
//             },
//             data: {
//               imageId,
//             },
//           }));
//         return NextResponse.json(
//           { success: "bio or image updated" },
//           { status: 200 }
//         );
//       } else {
//         bio &&
//           (await db.profile.create({
//             data: {
//               userId: params.userId,
//               bio,
//             },
//           }));
//         imageId &&
//           (await db.profile.create({
//             data: {
//               userId: params.userId,
//               imageId,
//             },
//           }));
//       }
//       return NextResponse.json(
//         { success: "bio or image updated" },
//         { status: 200 }
//       );
//     }
//     return NextResponse.json({ error: "User not exist!" }, { status: 402 });
//   } catch (error) {
//     console.log("PROFILE", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
