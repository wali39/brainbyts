import AuthorCard from "@/components/author-card";
import author from "@/public/author.jpeg";
import Heading from "@/components/heading";
import BlogCard from "@/components/blog-card";
import { blogs } from "@/components/blog-seeds";

export default function AuthorPage() {
  return (
    <div className=" mt-[150px]">
      <AuthorCard
        IsauthorPage={true}
        publishedPosts={4}
        id="b"
        imgsrc={author}
        name="Author Alpha"
        description="thtis is the descritpion for this tauthor usr in the blog appplication using this resources thtis is the descritpion."
      />
      <div className="text-center">
        <Heading title="All posts by author" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-10">
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
