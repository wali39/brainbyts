"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import { Button, Form, Input } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { MdTitle } from "react-icons/md";

const BlogTitle = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  type formDatatype = {
    title: string;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `/api/blogs/${session?.user.id}`,
        formData
      );
      router.push(`/blogs/${session?.user.id}/${response.data.id}`);
      router.refresh();
      toast.success("Blog created!");
    } catch (error) {
      console.log("BLOG_TITLE", error);
      toast.error("something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = () => {
    router.refresh();
    router.push("/");
  };
  const items = [
    {
      href: "/",
      title: (
        <span className="gap-x-1 flex items-center">
          <HomeOutlined />
          Home
        </span>
      ),
    },
    {
      href: "/blogs/create",
      title: <>Blog create</>,
    },
  ];
  return (
    <div className="col-span-6 col-start-4 ">
      <HeadingBreadcrump title="Create blog" items={items} />
      <div className="border-2 border-stone-200/40 shadow-md shadow-stone-200/30 p-5 rounded-md  py-[70px] px-[50px] bg-stone-50/50 backdrop-blur-sm ">
        <div className="flex flex-col justify-between mb-2">
          <h4 className=" md:text-lg md:font-medium flex gap-x-2 items-center">
            <MdTitle className="border-2 border-black rounded-sm" /> Blog title
          </h4>
          <p className="text-gray-500 font-medium text-sm">
            Choose a title for your blog Don't worry you can change it later
          </p>
        </div>

        <Form
          name="title"
          // initialValues={{ title }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="title"
            rules={[{ required: true, message: "Please input blog title!" }]}
          >
            <Input
              size="large"
              placeholder="ex. Advanced machine learning..."
            />
          </Form.Item>

          <div className="flex justify-start items-center space-x-4 text-base mt-5 ">
            <Form.Item className="mb-0">
              <Button
                type="text"
                size="middle"
                className={`${
                  !isSubmitting ? "bg-primary text-white" : "text-slate-400"
                }`}
                disabled={isSubmitting}
                htmlType="button"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                type="text"
                size="middle"
                className={`${
                  !isSubmitting ? "bg-accent text-white" : "text-slate-400"
                }`}
                disabled={isSubmitting}
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BlogTitle;
