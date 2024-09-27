"use client";
import TitleForm from "./title-form";
import BlogImageForm from "./blog-Image-form";
import DescriptionForm from "./description-form";
import CategoryForm from "./category-form";
import toast from "react-hot-toast";
import { Button } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

interface BlogFormProps {
  categoryList: { id: string; name: string }[];
  blog: {
    id: string;
    author: { id: string };
    title: string;
    description: string | null;
    categoryId: string | null;
    imageUrl?: string;
  };
}
const BlogForm = async ({ categoryList, blog }: BlogFormProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 p-3  gap-4">
        <div className="space-y-8">
          <div className="grid grid-cols-12  gap-5   mb-5">
            <div className="col-span-12 md:col-span-6 space-y-5   ">
              <TitleForm
                title={blog.title}
                authorId={blog.author.id}
                blogId={blog.id}
              />
              <CategoryForm
                categoryId={blog.categoryId}
                categories={categoryList}
                authorId={blog.author.id}
                blogId={blog.id}
              />
            </div>
            <div className="col-span-12  md:col-span-6">
              <BlogImageForm
                imageUrl={blog.imageUrl}
                authorId={blog.author.id}
                blogId={blog.id}
              />
            </div>
          </div>

          <DescriptionForm
            description={blog.description}
            authorId={blog.author.id}
            blogId={blog.id}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogForm;
