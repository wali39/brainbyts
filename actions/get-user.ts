import { db } from "@/lib/db";
export const getUser = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
    if (user) {
      // console.log("getUser", user);
      return {
        name: user.name || "",
        email: user.email,
        role: user.role,
        bio: user.profile?.bio || "",
        imageUrl: user.profile?.imageUrl || "",
        publicId: user.profile?.publicId || "",
      };
    }
    return {
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
      publicId: "",
    };
  } catch (error) {
    console.log("GET_USER", error);
    return {
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
      publicId: "",
    };
  }
};
