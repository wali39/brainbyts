"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import HeadingBreadcrump from "@/components/heading-n-breadcrum";

import { Button, Form, Input } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { MdCategory } from "react-icons/md";
import { BiCategory, BiCategoryAlt } from "react-icons/bi";

const CreateCategoryForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  type formDatatype = {
    title: string;
  };

  const onFinish = async (formData: formDatatype) => {
    // try {
    //   setIsSubmitting(true);
    //   const response = await axios.post(
    //     `/api/blogs/${session?.user.id}`,
    //     formData
    //   );
    //   router.push(`/blogs/${session?.user.id}/${response.data.id}`);
    //   router.refresh();
    //   toast.success("Blog created!");
    // } catch (error) {
    //   console.log("BLOG_TITLE", error);
    //   toast.error("something went wrong");
    // } finally {
    //   setIsSubmitting(false);
    // }
    console.log("Success:", formData);
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
      href: "/blogs/category/create/{userId}",
      title: <>Create category</>,
    },
  ];
  return (
    <div className="md:col-span-6 md:col-start-4 cols-span-8 col-start-2  col-end-12 ">
      <HeadingBreadcrump title="Create Category" items={items} />
      <div className="border-2 shadow p-5 rounded-md px-[20px] py-[20px] lg:px-[50px] lg:py-[70px]  ">
        <div className="flex flex-col justify-between mb-2">
          <h4 className=" md:text-lg md:font-medium flex gap-x-2 items-center">
            <BiCategory /> Category
          </h4>
          <p className="text-gray-500 font-medium text-sm">
            Blogs of different categories arrived add new catgory to more
            appropiate blog categorization
          </p>
        </div>

        <Form
          name="categoryform"
          // initialValues={{ title }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="category"
            rules={[{ required: true, message: "Please input category!" }]}
          >
            <Input size="large" placeholder="ex. Artificial intelligence..." />
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

export default CreateCategoryForm;
