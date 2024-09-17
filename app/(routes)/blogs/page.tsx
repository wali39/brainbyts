import BlogCard from "@/components/blog-card";
import Heading from "@/components/heading";
import { blogs } from "@/components/blog-seeds";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function Blogs() {
  return (
    <div>
      <div className="text-center mb-[40px] mt-[100px]">
        <Heading title="All posts" marginFix />
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
            { href: "/blogs", title: <span>Blogs</span> },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-x-10">
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
