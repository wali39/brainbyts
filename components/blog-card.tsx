import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import Image, { StaticImageData } from "next/image";
import blogImage from "/public/blogimage.jpg";
interface BlogCardProps {
  blogImg: StaticImageData;
  category: string;
  title: string;
  description: string;
}
const BlogCard = ({ blogImg, category, title, description }: BlogCardProps) => {
  return (
    <div className="bg-[#f8f5f57c] p-4 rounded-lg cursor-pointer group relative shadow-md">
      <div className="relative">
        <span className="absolute inline-block right-0 top-0 rounded-bl-md rounded-tr-md pl-[0.5rem] pb-[0.5rem] bg-background ">
          <p className="px-[1rem] py-[0.5rem] inline-block rounded-[0.5rem] border-[2px] uppercase hover:bg-accent hover:text-white">
            {category}
          </p>

          <div className="text-background  top-0 -left-[0.75rem]  rotate-90 md:left-[0.05rem] absolute">
            <svg
              className="absolute h-[0.75rem] w-[0.75rem] block align-middle"
              width="101"
              height="101"
              viewBox="0 0 101 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="text-background  bottom-0   rotate-90 md:-right-[0.05rem] absolute">
            <svg
              className="absolute h-[0.75rem] w-[0.75rem] block align-middle"
              width="101"
              height="101"
              viewBox="0 0 101 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M101 0H0V101H1C1 45.7715 45.7715 1 101 1V0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </span>

        <Image
          className="rounded-xl md:rounded-2xl  bg-white/40 w-full object-cover h-60 "
          src={blogImg}
          alt=""
        />
      </div>
      <div className="">
        <div className="px-2 mt-3">
          <p className="text-2xl font-normal hover:text-primary  ">{title}</p>
          <p className="py-3 space-x-2 font-medium text-md">
            <CalendarOutlined className="text-[16px] " />
            <span>01 Jan, 2024</span>
          </p>
          <p className="line-clamp-2 font-normal text-lg ">{description}</p>
        </div>
        <div className="flex space-x-3 items-center font-medium text-md mt-5 px-2 text-slate-800">
          <Image className="rounded-md w-8 h-8" src={blogImage} alt="" />
          <p>Wali Ullah</p>
          <span className="w-2 h-2 bg-accent rounded-full" />
          <span>01 minute read</span>
        </div>
        <ArrowRightOutlined className=" font-bold text-xl bg-accent -rotate-45 text-white rounded-full p-2 absolute right-5 bottom-5 hover:rotate-45 " />
      </div>
    </div>
  );
};

export default BlogCard;
