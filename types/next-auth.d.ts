import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      imageUrl: string;
      publicId: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    imageUrl: string;
    publicId: string;
  }

  interface JWT extends DefaultJWT {
    id: string;
    imageUrl: string;
    publicId: string;
  }
}
