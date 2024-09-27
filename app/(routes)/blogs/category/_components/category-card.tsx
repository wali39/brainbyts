import Link from "next/link";
import { BiCategory } from "react-icons/bi";

interface CategoryCardProps {
  id: string;
  name: string;
  blogs: number;
}
const CategoryCard = (category: CategoryCardProps) => {
  return (
    <Link href={`/blogs/category/${category.id}`}>
      <div className="bg-[#EBEEE3] text-[#200a0a]  p-5 rounded-md flex flex-col items-center gap-2 cursor-pointer hover:bg-[#e9e9e2]">
        <BiCategory size={20} />
        <div className="flex flex-col items-center">
          <p className="text-xl">{category.name}</p>
          <p className="font-light text-base ">
            <span className="font-bold">{category.blogs}</span> Blogs
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
