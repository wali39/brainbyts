"use client";
import BlogCard from "@/components/blog-card";
import React, { useEffect, useState } from "react";
import { Author, Blog, BlogImage } from "@/lib/types";
import { Pagination, Spin } from "antd";
import axios from "axios";

type blogType = Blog &
  BlogImage & {
    author: Author & {
      bio?: string | null;
    };
  };

const Blogs = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(2);

  const [spinning, setSpinning] = useState(false);

  const getblogs = async (page: number) => {
    try {
      setSpinning(true);
      const response = await axios.get(
        `/api/blogs?page=${page}&pageSize=${blogsPerPage}`
      );
      setBlogs(response.data?.blogsByPage);
      setTotalBlogs(response.data?.totalBlogs);
    } catch (error) {
    } finally {
      setSpinning(false);
    }
  };
  useEffect(() => {
    getblogs(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage, blogsPerPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setBlogsPerPage(pageSize);
  };

  return (
    <>
      {blogs.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  gap-x-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blogData={blog} />
          ))}
        </div>
      ) : (
        <Spin spinning={spinning} size="large">
          <div className="text-center italic text-lg text-stone-300 mt-32">
            No blogs found
          </div>
        </Spin>
      )}
      <div className="mt-32  flex justify-center ">
        <Pagination
          className={`text-base font-normal bg-stone-50 py-2 px-3 rounded-md backdrop-blur-md ${
            spinning && "hidden"
          }`}
          current={currentPage}
          pageSize={blogsPerPage}
          total={totalBlogs}
          onChange={handlePageChange}
          showTotal={(totalBlogs, range) =>
            `${range[0]} - ${range[1]} of ${totalBlogs} blogs`
          }
          pageSizeOptions={[2, 4, 6, 8, 10, 20]}
          showSizeChanger
        />
      </div>
    </>
  );
};

export default Blogs;
