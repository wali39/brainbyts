import React from "react";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";
import Blogs from "./_components/blogs";

import { HomeOutlined } from "@ant-design/icons";

export default async function BlogsPage() {
  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/blogs", title: <span>Blogs</span> },
  ];
  return (
    <div>
      <HeadingBreadcrump title="All posts" items={items} />
      <Blogs />
    </div>
  );
}
