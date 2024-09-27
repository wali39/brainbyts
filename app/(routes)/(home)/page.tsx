import Hero from "./_components/hero";
import Heading from "@/components/heading";
import BlogCard from "@/components/blog-card";
// import { blogs } from "@/components/blog-seeds";
import LoadingTest from "./_components/loading-test";
import getBlogs from "@/actions/get-blogs";

export default async function HomePage() {
  const blogs = await getBlogs({});
  return (
    <div>
      <Hero />
      {/* <LoadingTest /> */}
      <div className="text-center">
        <Heading title="Recent posts" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-x-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
    </div>
  );
}
