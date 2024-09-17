"use client";

import { BiExit } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import TitleForm from "./title-form";
import BlogImageForm from "./blog-Image-form";
import DescriptionForm from "./description-form";
import blogImage from "@/public/blog2.jpg";
import CategoryForm from "./category-form";
const blogData = {
  blogImg: blogImage,
  title: "The AGI hype train is running out of steam ",
  description: `<p>hellow world</p><h2>heading 2 d</h2><h1>Description</h1>`,
  category: "Artificial Intelligence",
};
const BlogForm = () => {
  return (
    <div>
      <div className="flex justify-between mb-[50px] p-2">
        <p className="text-xl font-medium flex gap-x-3 items-center ">
          <RiProfileLine
            size={40}
            className="bg-accent rounded-full p-2 text-white z-10"
          />
          Blog page
        </p>
        <p className=" text-white bg-accent px-3 py-2  flex  items-center gap-x-2 rounded-md">
          Exit <BiExit size={20} />
        </p>
      </div>
      <div className="grid grid-cols-1 p-3  gap-4">
        <div className="space-y-8">
          <div className="grid grid-cols-12  gap-5   mb-5">
            <div className="col-span-12 md:col-span-6 space-y-5   ">
              <TitleForm title={blogData.title} />
              <CategoryForm categoryId="Fashion" />
            </div>
            <div className="col-span-12  md:col-span-6">
              <BlogImageForm imageUrl={""} />
            </div>
          </div>

          <DescriptionForm description={blogData.description} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogForm;
