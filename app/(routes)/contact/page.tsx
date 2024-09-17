import Heading from "@/components/heading";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import BlogCard from "@/components/blog-card";
import { blogs } from "@/components/blog-seeds";

export default function Contact() {
  return (
    <div>
      <div className="text-center mt-[100px] ">
        <p className="text-md">Showing posts from</p>

        <Heading title="StartUp" marginFix />
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
              title: "Startup",
            },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  space-x-2">
        {blogs.map((blog) => (
          <BlogCard
            key=""
            blogImg={blog.blogImg}
            title={blog.title}
            description={blog.description}
            category={blog.category}
          />
        ))}
      </div>
    </div>
  );
}
