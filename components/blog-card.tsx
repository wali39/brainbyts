"use client";
import Link from "next/link";
import Image from "next/image";
import readingTime from "reading-time";
import { useSession } from "next-auth/react";

import {
  ArrowRightOutlined,
  CalendarOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaRegImage } from "react-icons/fa";
import { motion } from "framer-motion";

interface BlogCardProps {
  blogData: {
    id: string;
    author: {
      id: string;
      name: string | null;
      imageUrl?: string | null;
    };
    title: string;
    description: string | null;
    imageUrl: string | undefined;
    categoryId?: string;
    category?: string;
    createdAt: Date;
  };
}
const BlogCard = ({ blogData }: BlogCardProps) => {
  const {
    id,
    title,
    description,
    imageUrl: blogImage,
    category,
    categoryId,
    createdAt,
  } = blogData;

  const {
    id: authorId,
    name: authorName,
    imageUrl: authorImage,
  } = blogData.author;
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ ease: "easeInOut", delay: 0.1, duration: 0.5 }}
    >
      <Link href={`/blogs/details/${id}`}>
        <div className="bg-card p-4 rounded-lg cursor-pointer group relative  z-10 backdrop-blur-md shadow-md shadow-stone-100 border-[2.5px] border-stone-100 dark:drop-shadow-sm dark:border-none  ">
          <div className="relative">
            <span className="absolute inline-block right-0 top-0 rounded-bl-md rounded-tr-md pl-[0.5rem] pb-[0.5rem] bg-card ">
              <Link href={`/blogs/category/${categoryId}`}>
                <p className="px-[1rem] py-[0.5rem] inline-block rounded-[0.5rem] border-[2px] uppercase hover:bg-accent hover:text-white">
                  {category}
                </p>
              </Link>

              <div className="text-background border-0  top-0 -left-[0.005rem] sm:-left-[0.75rem]  rotate-90 md:left-[0.05rem] absolute">
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
              <div className="text-background  bottom-0 -right-[0.005rem]  rotate-90 md:-right-[0.005rem] absolute">
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

            {blogImage ? (
              <Image
                className="rounded-xl md:rounded-2xl  bg-white/40 w-full object-cover h-60 bg-blend-multiply "
                src={blogImage}
                height={200}
                width={200}
                alt=""
              />
            ) : (
              <div className="max-w-xl h-60 object-cover bg-stone-200 rounded-xl flex items-center justify-center text-accent">
                <FaRegImage size={30} />
              </div>
            )}
          </div>
          <div>
            <div className="px-2 mt-3">
              <p className="text-2xl font-normal hover:text-primary  ">
                {title}
              </p>
              <p className="py-3 space-x-2 font-medium text-md">
                <CalendarOutlined className="text-[16px] " />
                <span>{new Date(createdAt).toDateString()}</span>
              </p>

              <div className="ql-snow">
                <div
                  className=" line-clamp-3 text-lg "
                  dangerouslySetInnerHTML={{ __html: description || "" }}
                />
              </div>
            </div>
            <div className="flex space-x-3 items-center font-medium text-md mt-5 px-2 text-slate-800 dark:text-white">
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
              <Link
                href={`/blogs/author/${authorId}`}
                className=" hover:text-accent"
              >
                <p>{authorName}</p>
              </Link>
              <span className="w-2 h-2 bg-accent rounded-full dark:bg-white" />
              <span>{readingTime(description || "").text}</span>
              {(session?.user?.id === authorId ||
                session?.user?.role == "admin") && (
                <Link href={`/blogs/${authorId}/${id}`}>
                  <EditOutlined /> Edit
                </Link>
              )}
            </div>
            <ArrowRightOutlined className=" font-bold text-xl bg-accent  text-white rounded-full p-2 absolute right-5 bottom-5 -rotate-45 dark:bg-white dark:text-black " />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
