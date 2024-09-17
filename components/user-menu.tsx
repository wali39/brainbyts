"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { MdOutlineEmail } from "react-icons/md";
import { RiLoginCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { HiOutlineUserAdd } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  name?: string | null;
  email?: string | null;
  id?: string | null;
  imageUrl?: string;
  arrowLeft?: boolean;
}
const UserMenu = ({
  name,
  email,
  imageUrl,
  id,
  arrowLeft = false,
}: UserMenuProps) => {
  const router = useRouter();
  const handleUser = async () => {
    const res = await signOut({
      redirect: false,
      callbackUrl: "/auth/sign-in",
    });
    console.log("user-menu logout", res);
    router.push(res.url);
    router.refresh();
  };
  const handleSignIn = () => {
    router.push("/auth/sign-in");
    router.refresh();
  };
  const handleSignUp = () => {
    router.push("/auth/sign-up");
    router.refresh();
  };
  const items: MenuProps["items"] = [
    {
      label: !name ? (
        <div className=" text-base font-medium  space-y-1">
          <p
            className="flex gap-x-2 items-center cursor-pointer hover:text-accent"
            onClick={() => handleSignIn()}
          >
            <RiLoginCircleLine size={18} /> LogIn
          </p>
          <p
            className="flex gap-x-2 items-center cursor-pointer hover:text-accent"
            onClick={() => handleSignUp()}
          >
            <HiOutlineUserAdd size={16} />
            Register
          </p>
        </div>
      ) : (
        <div className="text-base font-medium space-y-1">
          <p className="flex gap-x-2 items-center">
            <UserOutlined size={18} /> <span>{name}</span>
          </p>
          <p className="flex gap-x-2 items-center">
            <MdOutlineEmail size={16} />
            <span>{email}</span>
          </p>

          <div className="flex gap-x-2">
            <Link
              className="flex gap-x-2 items-center text-accent"
              href={`/auth/${id}/profile`}
            >
              <EditOutlined size={18} /> Update profile
            </Link>
            <span onClick={() => handleUser()}>
              <Link
                className="flex gap-x-2 items-center text-primary"
                href="/auth/sign-in"
              >
                <RiLogoutCircleRLine size={18} /> Logout
              </Link>
            </span>
          </div>
        </div>
      ),
      key: "0",
    },
  ];
  return (
    <Dropdown
      trigger={["click"]}
      menu={{ items }}
      placement={arrowLeft ? "bottomLeft" : "bottomLeft"}
      arrow={{ pointAtCenter: true }}
    >
      <span className="border-2    text-stone-700 p-[1px]  rounded-full">
        {imageUrl ? (
          <div className="w-8 h-8  ">
            <Image
              src={imageUrl}
              width={24}
              height={24}
              alt=""
              className="rounded-full w-full h-full object-cover "
            />
          </div>
        ) : (
          <div className="w-8 h-8 flex justify-center items-center">
            <FaRegUser size={20} />
          </div>
        )}
      </span>
    </Dropdown>
  );
};

export default UserMenu;
