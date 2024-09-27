import Heading from "@/components/heading";
import CategoryCard from "./_components/category-card";
import getBlogs from "@/actions/get-blogs";

export default async function CategoryPage() {
  const blogs = await getBlogs({});
  const categoryries: { id: string; name: string; blogs: number }[] =
    Object.values(
      blogs.reduce(
        (acc: any, blog: any) => (
          (acc[blog.category] = acc[blog.category] || {
            id: blog.categoryId,
            name: blog.category,
            blogs: 0,
          }),
          acc[blog.category].blogs++,
          acc
        ),
        {}
      )
    );

  return (
    <div>
      <div className="text-center">
        <Heading title="Category" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categoryries.map((category) => (
          <CategoryCard {...category} />
        ))}
      </div>
    </div>
  );
}
