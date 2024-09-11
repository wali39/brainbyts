import Navbar from "@/components/navbar";
import Image from "next/image";
import Hero from "./components/hero";
import Heading from "@/components/heading";
import BlogCard from "@/components/blog-card";
import Blog from "@/components/blog";
import blogImage from "/public/blogimage.jpg";
import blogImage2 from "/public/blog2.jpg";
import { blogs } from "@/components/blog-seeds";
export default function App() {
  return (
    <>
      <Hero />
      <div className="text-center">
        <Heading title="Blogs" />
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
    </>
  );
}
