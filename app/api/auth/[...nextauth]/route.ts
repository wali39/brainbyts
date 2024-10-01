import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
const cloudinary = require("cloudinary").v2;

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any, req): Promise<any> {
        const { email, password } = credentials as Record<
          "email" | "password",
          string
        >;

        const user = await db.user.findFirst({
          where: {
            email,
          },
          include: {
            profile: true,
          },
        });
        if (user) {
          const IsPassMatch = await compare(password, user.password);
          if (IsPassMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              imageUrl: user.profile?.imageUrl,
            };
            // return NextResponse.json({ user: IsUser }, { status: 200 });
          }

          // return NextResponse.json({ error: "Wrong password!" }, { status: 200 });
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === "update") {
        try {
          const { bio, imageUrl, publicId, name } = session;

          const userById = await db.user.findFirst({
            where: {
              id: token.sub,
            },
          });
          if (imageUrl && publicId) {
            token.imageUrl = imageUrl;
            token.publicId = publicId;
          }
          if (userById) {
            if (name) {
              await db.user.update({
                where: { id: token.sub },
                data: {
                  name,
                },
              });
              token.name = session.name;
              console.log([{ success: "Username updated!" }, { status: 200 }]);
            }

            if (bio || imageUrl) {
              const profileByUser = await db.profile.findFirst({
                where: {
                  userId: token.sub,
                },
              });

              if (profileByUser) {
                if (bio) {
                  await db.profile.update({
                    where: {
                      userId: token.sub,
                    },
                    data: {
                      bio,
                    },
                  });
                  token.bio = session.bio;
                }

                if (imageUrl && publicId) {
                  if (profileByUser.imageUrl && profileByUser.publicId) {
                    cloudinary.uploader
                      .destroy(profileByUser.publicId)
                      .then((result: any) =>
                        console.log("Image delete from cloudinary", result)
                      );
                  }

                  await db.profile.update({
                    where: {
                      userId: token.sub,
                    },

                    data: {
                      imageUrl,
                      publicId,
                    },
                  });
                  console.log([
                    { success: "bio or image updated" },
                    { status: 200 },
                  ]);
                }
              } else {
                bio &&
                  (await db.profile.create({
                    data: {
                      userId: token.sub || "",
                      bio,
                    },
                  }));
                imageUrl &&
                  publicId &&
                  (await db.profile.create({
                    data: {
                      userId: token.sub || "",
                      imageUrl,
                      publicId,
                    },
                  }));
              }
              console.log([
                { success: "bio or image updated" },
                { status: 200 },
              ]);
            }
          }
          if (!userById) {
            console.log([{ error: "User not exist!" }, { status: 402 }]);
          }
        } catch (error) {
          console.log("PROFILE", error);
          console.log([{ error: "Internal error" }, { status: 500 }]);
        }
      }
      // console.log("jwt session: ", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          imageUrl: user.imageUrl,
        };
      }
      return token;
    },
    session: async ({ token, user, session }) => {
      // console.log("session direct", { session, token, user });
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            imageUrl: token.imageUrl,
          },
        };
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
