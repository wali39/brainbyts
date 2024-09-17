import { BiCategory } from "react-icons/bi";

interface CategoryCardProps {
  name: string;
  blogs: number;
}
const CategoryCard = ({ name, blogs }: CategoryCardProps) => {
  return (
    <div className="bg-[#EBEEE3] text-[#200a0a]  p-5 rounded-md flex flex-col items-center gap-2 cursor-pointer hover:bg-[#e9e9e2]">
      <BiCategory size={20} />
      <div className="flex flex-col items-center">
        <p className="text-xl">{name}</p>
        <p className="font-light text-base ">
          <span className="font-bold">{blogs}</span> Blogs
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
