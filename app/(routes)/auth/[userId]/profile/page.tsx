import Profile from "./_components/profile";

import { User, Profile as UserProfile } from "@/lib/types";

import { getUser } from "@/actions/get-user";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import { HomeOutlined } from "@ant-design/icons";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user: User & UserProfile = await getUser(params.userId);

  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/auth/profile", title: <span>Profile</span> },
  ];
  return (
    <>
      <HeadingBreadcrump title="Profile" items={items} />
      <Profile user={user} />
    </>
  );
}
