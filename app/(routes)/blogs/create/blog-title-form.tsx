"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const BlogTitle = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type formDatatype = {
    name: String;
  };

  const onFinish = async (formData: formDatatype) => {
    try {
      const response = await axios.post("/api/blogs", formData);
      router.push(`/blogs/${response.data.id}`);
      toast.success("Blog created!");
    } catch (error) {
      console.log("BLOG_TITLE", error);
      toast.error("something went wrong");
    }
    console.log("Success:", formData);
    router.push("/");
  };
  return (
    <div className="col-span-6 col-start-4">
      <div className="border-2 shadow-sm p-5 rounded-md bg-[#EBEEE3]">
        <div className="flex justify-between mb-2">
          <h4 className="text-lg font-medium">Title</h4>
        </div>

        <Form
          name="title"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className="mb-3"
            name="Title"
            rules={[
              { required: true, message: "Please input your blog title!" },
            ]}
          >
            <Input placeholder="add blog title..." />
          </Form.Item>
          <div className="flex justify-start items-center space-x-2">
            <Form.Item className="mb-0">
              <Button
                type="text"
                className="bg-primary text-white  "
                htmlType="button"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                type="text"
                className="bg-accent text-white  "
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
