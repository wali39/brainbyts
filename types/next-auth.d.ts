import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      imageUrl: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    imageUrl: string;
    role: string;
  }

  interface JWT extends DefaultJWT {
    id: string;
    imageUrl: string;
    role: string;
  }
}
