import { useSession } from "next-auth/react";
import Link from "next/link";

import UserMenu from "./user-menu";

import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const MobileMenu = ({ mobileMenu }: { mobileMenu: boolean }) => {
  const { data: session } = useSession();
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: (
        <Link href="/" className="hover:text-red-400">
          Home
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/blogs" className="hover:text-red-400">
          Blog
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href="/about" className="hover:text-red-400">
          About
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/contact" className="hover:text-red-400">
          Contact
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <div className="flex items-center space-x-1">
          <UserMenu arrowLeft />
          <span className="text-black"> {session?.user?.name}</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Menu
        className="rounded-lg  w-100 mt-5 font-medium"
        hidden={mobileMenu}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={mobileMenu}
        items={items}
      />
    </div>
  );
};

export default MobileMenu;
