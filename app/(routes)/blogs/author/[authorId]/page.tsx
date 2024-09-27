import AuthorCard from "@/components/author-card";
// import author from "@/public/author.jpeg";
import Heading from "@/components/heading";
import BlogCard from "@/components/blog-card";
// import { blogs } from "@/components/blog-seeds";
import getBlogs from "@/actions/get-blogs";

export default async function AuthorBlogsPage({
  params,
}: {
  params: { authorId: string };
}) {
  const blogs = await getBlogs({ authorId: params.authorId });

  return (
    <div className=" mt-[150px]">
      <AuthorCard
        IsauthorPage={true}
        publishedPosts={blogs.length}
        id={params.authorId}
        imageUrl={blogs[0].author.imageUrl}
        name={blogs[0].author.name}
        description={blogs[0]?.author.bio || ""}
      />
      <div className="text-center">
        <Heading title="All posts by author" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blogData={blog} />
        ))}
      </div>
    </div>
  );
}
