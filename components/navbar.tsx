"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import logoDark from "@/public/logo_dark.png";
import logoLight from "@/public/logo.png";

import MobileMenu from "./mobile-menu";
import UserMenu from "./user-menu";

import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SunOutlined,
  SearchOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import Search from "./search";
import DarkModeToggle from "./dark-mode-toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { data: session } = useSession();
  let navbarLinks = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/blogs",
      name: "Blogs",
    },

    {
      href: "/contact",
      name: "Contact",
    },
  ];
  {
    session &&
      session?.user.role &&
      session.user.role == "admin" &&
      navbarLinks.push({
        href: `/blogs/category/create/${session.user.id}`,
        name: "category",
      });
  }
  {
    session &&
      session?.user.role &&
      session.user.role == "admin" &&
      navbarLinks.push({
        href: `/blogs/${session.user.id}/create/`,
        name: "blog",
      });
  }
  const pathName = usePathname();
  const [mobileMenu, setMobileMenu] = useState(true);
  const { theme } = useTheme();
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className="p-5 pb-0 mb-0 text-black dark:text-white">
      <div className=" flex justify-between  items-center ">
        <Image
          src={theme == "light" ? logoLight : logoDark}
          height="30"
          width="150"
          alt="Brainbyts"
          priority
        />

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
              prefetch={true}
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
            <Search />
            <UserMenu {...session?.user} />
            <DarkModeToggle />
          </div>
        </div>
      </div>
      <MobileMenu mobileMenu={mobileMenu} />
    </div>
  );
};
export default Navbar;
