import Heading from "@/components/heading";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import BlogCard from "@/components/blog-card";
import getBlogs from "@/actions/get-blogs";

export default async function CategoryIdPage({
  params,
}: {
  params: { userId: string; categoryId: string };
}) {
  const blogs = await getBlogs({
    authorId: params.userId,
    categoryId: params.categoryId,
  });
  return (
    <div>
      <div className="text-center mt-[100px] ">
        <p className="text-md">Showing posts from</p>

        <Heading title="Fashion" marginFix />
        <Breadcrumb
          className="flex justify-center font-bold"
          separator="-"
          items={[
            {
              href: "/",
              title: (
                <>
                  <HomeOutlined />,<span>Home</span>
                </>
              ),
            },
            {
              href: "/",
              title: <span>Categories</span>,
            },
            {
              href: "/",
              title: "Fashion",
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-10 mt-[50px]">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
    </div>
  );
}
