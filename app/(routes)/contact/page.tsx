import React from "react";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import { HomeOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";

export default function ContactPage() {
  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/contact", title: <span>Contact</span> },
  ];
  return (
    <div className="p-2">
      <HeadingBreadcrump title="Contact" items={items} />

      <div className="md:max-w-96 bg-card px-3 py-5 rounded-md border-2 border-stone-200/60 flex flex-col justify-center items-center mx-auto dark:border-none ">
        <h1 className="font-thin text-3xl mb-3">Contact with us </h1>
        <p className=" flex items-center gap-x-2 text-base">
          <MdOutlineEmail /> wali190939@gmail.com
        </p>
      </div>
    </div>
  );
}
