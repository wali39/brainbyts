import Heading from "@/components/heading";
import CategoryCard from "./_components/category-card";

const categorySeed = [
  {
    name: "AI",
    posts: 4,
  },
  {
    name: "Fashion",
    posts: 2,
  },
  {
    name: "Tech",
    posts: 5,
  },
  {
    name: "Nature",
    posts: 8,
  },
];
export default function CategoryPage() {
  return (
    <div>
      <div className="text-center">
        <Heading title="Category" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categorySeed.map((category) => (
          <CategoryCard name={category.name} blogs={category.posts} />
        ))}
      </div>
    </div>
  );
}
