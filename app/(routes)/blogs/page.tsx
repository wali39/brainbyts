import BlogCard from "@/components/blog-card";
import { blogs } from "@/components/blog-seeds";
import HeadingBreadcrump from "@/components/heading-n-breadcrum";
import getBlogs from "@/actions/get-blogs";

import { HomeOutlined } from "@ant-design/icons";

export default async function Blogs() {
  const blogs = await getBlogs({});
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
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-x-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
    </div>
  );
}
