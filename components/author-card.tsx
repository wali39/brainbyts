"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaArrowUp, FaUserAstronaut } from "react-icons/fa";

interface AuthorCardProps {
  id: string;
  imageUrl?: string | null;
  name: string | null;
  description: string;
  IsauthorPage?: boolean;
  publishedPosts?: number;
}
const AuthorCard = ({
  id,
  imageUrl,
  name,
  description,
  IsauthorPage = false,
  publishedPosts,
}: AuthorCardProps) => {
  return (
    <div
      className={`px-2 text-center md:text-start w-full  max-w-screen-sm   md:flex   overflow-hidden rounded-xl items-center space-x-2  ${
        IsauthorPage ? "mx-auto border-2 border-primary p-3" : "shadow-md"
      }`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          height={200}
          width={200}
          alt=""
          className={`object-cover w-24 h-24 md:w-28 md:h-28 aspect-square p-2    ${
            IsauthorPage ? "rounded-3xl" : "rounded-2xl"
          }`}
        />
      ) : (
        <div
          className={` w-24 h-24 md:w-36 md:h-36 aspect-square p-2  mx-auto  flex items-center justify-center  text-[#8b1a1aab]  `}
        >
          <FaUserAstronaut size={70} />
        </div>
      )}
      <div>
        {publishedPosts && (
          <p className="text-base font-normal md:text-md ">
            <span className="font-bold ">
              {publishedPosts < 10 ? `0${publishedPosts}` : publishedPosts}
            </span>{" "}
            Published Posts
          </p>
        )}
        <p className="text-lg md:text-2xl font-medium">{name}</p>
        <p
          className={` text-sm md:text-base ${!IsauthorPage && "line-clamp-1"}`}
        >
          {description}
        </p>
        <Link
          className={`underline flex items-center text-sm  md:text-base hover:text-primary justify-center md:justify-start ${
            IsauthorPage && "hidden"
          }`}
          href={`/blogs/author/${id}`}
        >
          See all post by this author
          <FaArrowUp className="rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
