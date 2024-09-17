import { db } from "@/lib/db";
import Profile from "./_components/profile";
import { getUser } from "@/actions/get-user";
import { User, Profile as UserProfile } from "@/lib/types";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user: User & UserProfile = await getUser(params.userId);
  // console.log("profile user", user);

  return (
    <>
      <Profile user={user} />
    </>
  );
}
