import Heading from "@/components/heading";
import BlogCard from "@/components/blog-card";

import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import getBlogs from "@/actions/get-blogs";

export default async function BlogsByCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const blogsByCategory = await getBlogs({ categoryId: params.categoryId });

  return (
    <div>
      <div className="text-center mt-[100px] ">
        <p className="text-md">Showing posts from</p>

        <Heading title={blogsByCategory[0].category || ""} marginFix />
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
              href: "/category",
              title: <span>Categories</span>,
            },
            {
              href: `"/blogs/category/${params.categoryId}"`,
              title: `${blogsByCategory[0].category}`,
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  space-x-2">
        {blogsByCategory.map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
    </div>
  );
}
