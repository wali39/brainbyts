import Image, { StaticImageData } from "next/image";

import AuthorCard from "./author-card";

import { UserOutlined } from "@ant-design/icons";
import { BsImage } from "react-icons/bs";
import Preview from "./preview";
import readingTime from "reading-time";

interface BlogDetailsProps {
  blogData: {
    id: string;
    author: {
      id: string;
      name: string | null;
      bio?: string | null;
      imageUrl: string | null | undefined;
    };
    title: string;
    description: string | null;
    categoryId: string | null;
    category?: string;
    imageUrl?: string;
    publicId?: string;
    createdAt: Date;
  };
}
const BlogDetails = ({ blogData }: BlogDetailsProps) => {
  const { id, title, description, imageUrl, category, createdAt } = blogData;
  const { id: authorId, name, bio, imageUrl: authorImage } = blogData.author;
  return (
    <div className="px-4 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg  py-5">
      <div className="text-xs md:text-base flex items-center space-x-2 font-medium mb-2 md:mb-5 ">
        <p className=" uppercase px-3 py-1 items-center  rounded-md border-2  bg-card backdrop-blur-md  border-stone-200/60   ">
          {category}
        </p>
        <span className="w-5 h-[2px] bg-accent" />
        <span>{createdAt.toDateString()}</span>
      </div>
      <div>
        <div className="py-2 mb-2 md:mb-4">
          <p className="text-xl sm:text-3xl  md:text-4xl lg:text-6xl font-serif ">
            {title}
          </p>
          <div className="text-xs md:text-base flex space-x-3 items-center font-medium  mt-5 px-2 text-slate-800 dark:text-stone-200">
            {authorImage ? (
              <Image
                className="rounded-md w-8 h-8 dark:bg-white"
                height={200}
                width={200}
                src={authorImage}
                alt=""
              />
            ) : (
              <div className="w-8 h-8 rounded dark:bg-white">
                <UserOutlined />
              </div>
            )}
            <p>{name}</p>
            <span className="w-2 h-2 bg-accent rounded-full" />
            <span>{readingTime(description || "").text}</span>
          </div>
        </div>
        {imageUrl ? (
          <Image
            className="w-full object-cover aspect-video  rounded-lg  "
            height={200}
            width={200}
            src={imageUrl}
            alt=""
          />
        ) : (
          <div className=" aspect-video  rounded-lg bg-accent flex items-center justify-center text-white">
            <BsImage size={50} />
          </div>
        )}
        <div className="mt-5 mb-[5rem]">
          <p className="text-sm md:text-lg  text-justify backdrop-blur-sm">
            <Preview value={description || ""} />
          </p>
        </div>
        <AuthorCard
          id={authorId}
          imageUrl={authorImage}
          name={name}
          description={bio || ""}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
