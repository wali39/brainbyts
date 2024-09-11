"use client";
import { Input, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

import MobileMenu from "./mobile-munu";
import { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SunOutlined,
  SearchOutlined,
  MoonOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(true);
  const [displayMode, setDisplayMode] = useState("light");
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  const toggleMode = () => {
    displayMode === "light" ? setDisplayMode("dark") : setDisplayMode("light");
  };
  return (
    <div className="p-5 text-black ">
      <div className=" flex justify-between  items-center ">
        <Image src="/logo.png" height="30" width="150" alt="" />

        <Button
          className="bg-primary text-white text-[18px] lg:hidden  "
          onClick={toggleMobileMenu}
        >
          {mobileMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <div className="hidden  lg:flex space-x-8  items-center font-medium">
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
          <div className=" flex items-center space-x-10">
            <Input placeholder="search..." prefix={<SearchOutlined />} />
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
