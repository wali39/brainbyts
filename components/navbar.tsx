"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Input, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SunOutlined,
  SearchOutlined,
  MoonOutlined,
} from "@ant-design/icons";

import MobileMenu from "./mobile-menu";
import UserMenu from "./user-menu";

import { useSession } from "next-auth/react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  const [displayMode, setDisplayMode] = useState("light");

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  const toggleMode = () => {
    displayMode === "light" ? setDisplayMode("dark") : setDisplayMode("light");
  };
  const { data: session } = useSession();
  console.log("session", session);

  return (
    <div className="p-5 pb-0 mb-0 text-black ">
      <div className=" flex justify-between  items-center ">
        <Image src="/logo.png" height="30" width="150" alt="" />

        <Button
          className="bg-primary text-white text-[18px] md:hidden  "
          onClick={toggleMobileMenu}
        >
          {mobileMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <div className="hidden  md:flex md:space-x-5 lg:space-x-8  items-center font-medium">
          <Link href="/" className="hover:text-red-300">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-red-300">
            Blog
          </Link>
          <Link href="/about" className="hover:text-red-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-red-300">
            Contact
          </Link>
          <div className=" flex items-center md:space-x-2 lg:space-x-10">
            <Input placeholder="search..." prefix={<SearchOutlined />} />
            <UserMenu {...session?.user} />
            <Button shape="circle" className="icon_button" onClick={toggleMode}>
              {displayMode == "light" ? <MoonOutlined /> : <SunOutlined />}
            </Button>
          </div>
        </div>
      </div>
      <MobileMenu mobileMenu={mobileMenu} />
    </div>
  );
};
export default Navbar;
