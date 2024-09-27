import getBlog from "@/actions/get-blog";
import BlogDetails from "@/components/blog-details";
import CommentCard from "@/components/comment-card";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import {
  HomeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { redirect } from "next/navigation";
import CommentComponent from "./comment-component";

export default async function BlogDetailsPage({
  params,
}: {
  params: { blogId: string };
}) {
  const items = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />,<span>Home</span>
        </>
      ),
    },
    { href: "/", title: <span>Blog details</span> },
  ];

  const blog = await getBlog({ blogId: params.blogId });
  const dummyBlog = {
    id: "",
    author: { id: "", name: "", bio: "", imageUrl: "" },
    title: "",
    description: "",
    categoryId: "",
    category: "",
    imageUrl: "",
    publicId: "",
    comments: [],
    createdAt: new Date(Date.now()),
  };

  if (Object.keys(blog).length == 0) {
    redirect("/");
  }
  return (
    <div>
      <HeadingBreadcrump title="Blog details" items={items} />
      <BlogDetails blogData={blog.id ? blog : dummyBlog} />
      <CommentComponent {...blog} />
    </div>
  );
}
