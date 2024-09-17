import Image, { StaticImageData } from "next/image";
import { FaArrowUp } from "react-icons/fa";
interface AuthorCardProps {
  id: string;
  imgsrc: StaticImageData;
  name: string;
  description: string;
  IsauthorPage?: boolean;
  publishedPosts?: number;
}
const AuthorCard = ({
  id,
  imgsrc,
  name,
  description,
  IsauthorPage = false,
  publishedPosts,
}: AuthorCardProps) => {
  return (
    <div
      className={`px-2 text-center md:text-start  max-w-screen-md    w-full md:flex  overflow-hidden rounded-xl items-center space-x-2  ${
        IsauthorPage ? "mx-auto" : "border-2"
      }`}
    >
      <Image
        src={imgsrc}
        alt=""
        className={`object-cover w-24 h-24 md:w-36 md:h-36 aspect-square p-2  mx-auto ${
          IsauthorPage ? "rounded-3xl" : "rounded-full"
        }`}
      />
      <div>
        {publishedPosts && (
          <p className="text-base font-normal md:text-md ">
            <span className="font-bold ">05</span> Published Posts
          </p>
        )}
        <p className="text-lg md:text-2xl font-medium">{name}</p>
        <p
          className={` text-sm md:text-base ${!IsauthorPage && "line-clamp-2"}`}
        >
          {description}
        </p>
        <a
          className={`underline flex items-center text-sm  md:text-base hover:text-primary justify-center md:justify-start ${
            IsauthorPage && "hidden"
          }`}
          href=""
        >
          See all post by this author
          <FaArrowUp className="rotate-45" />
        </a>
      </div>
    </div>
  );
};

export default AuthorCard;
