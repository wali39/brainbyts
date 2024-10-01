import React from "react";

import getCategories from "@/actions/get-categories";
import getBlog from "@/actions/get-blog";

import BlogForm from "./_components/blog-form";
import ActionList from "./_components/action-list";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import { HomeOutlined } from "@ant-design/icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

export default async function BlogEditPage({
  params,
}: {
  params: { userId: string; blogId: string };
}) {
  const { userId, blogId } = params;
  const categoryList = await getCategories();
  const blog = await getBlog({ userId, blogId });
  const requiredFields = [
    blog.title,
    blog.description,
    blog.category,
    blog.imageUrl,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);
  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/blogs", title: <span>Edit blog</span> },
  ];
  return (
    <div className="mt-[100px]">
      <HeadingBreadcrump title="Blog creation" items={items} />
      <div className="p-3">
        {blog.isPublished ? (
          <div className="bg-accent text-white flex gap-x-2 items-center p-4  rounded-md text-base">
            <IoMdCheckmarkCircleOutline size={20} /> This blog is published. It
            is visible in blogs page
          </div>
        ) : (
          <div className="bg-amber-400 text-white flex gap-x-2 items-center p-4  rounded-md text-base">
            <IoWarningOutline size={20} /> This blog is not published. It is not
            visible in blogs page
          </div>
        )}
      </div>
      <div className="flex justify-between px-3 mb-10">
        <div>
          <h1 className="text-xl font-medium">Blog creation page</h1>
          <p className="text-base font-medium text-slate-500">
            Complete all fields <span>{completionText}</span>
          </p>
        </div>
        <ActionList blog={blog} isComplete={isComplete} />
      </div>

      <BlogForm categoryList={categoryList} blog={blog} />
    </div>
  );
}
