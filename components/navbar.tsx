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
import { motion } from "framer-motion";
import UserMenu from "./user-menu";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const navbarLinks = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/blogs",
    name: "Blogs",
  },
  {
    href: "/about",
    name: "About",
  },
  {
    href: "/contact",
    name: "Contact",
  },
];

const Navbar = () => {
  const pathName = usePathname();
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
          {navbarLinks.map((navLink, key) => (
            <Link
              key={key}
              href={navLink.href}
              className={`relative${
                pathName === navLink.href ? "  text-primary" : ""
              }`}
            >
              {/* <span
                className={`${
                  pathName === navLink.href &&
                  "bg-primary w-[95%] h-[3px] rounded-full absolute -bottom-[2px]"
                }`}
              /> */}
              <div>
                {navLink.name}

                {pathName === navLink.href ? (
                  <motion.div
                    className="bg-primary w-[95%] h-[3px] rounded-full absolute -bottom-[2px] "
                    layoutId="underline"
                  />
                ) : null}
              </div>
            </Link>
          ))}

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
